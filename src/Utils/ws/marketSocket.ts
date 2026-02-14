import { NEW_WEB_SOCKET_URL } from "../helper";
import { WsClient, WsState } from "./wsClient";

export type SubscriptionType = "contract" | "option_chain";

export type SubscribeItem = {
    segment: string; // "INDICES" | "NSE" | "NFO-FUT" | "NFO-OPT" etc.
    symbols: string[];
    subscription_type: SubscriptionType | string;
};

export type SubscribePayload = {
    type: "subscribe";
    data: SubscribeItem[];
};

export type UnsubscribePayload = {
    type: "unsubscribe";
    data: SubscribeItem[];
};

type StateListener = (s: WsState) => void;
type MessageListener = (msg: any) => void;

let currentState: WsState = "idle";
const stateListeners = new Set<StateListener>();
const messageListeners = new Set<MessageListener>();

// ✅ Pause means: keep socket connected, but do not stream prices continuously to UI
let paused = false;

// ✅ Cache latest data by key "SEGMENT:SYMBOL"
const lastByKey: Record<string, any> = {};

// ✅ Registry of subscriptions from multiple screens/components
// key = ownerId ("top", "watchlist", "instrument", etc.)
const registry = new Map<string, SubscribePayload>();

// ✅ Track what union is currently active on server, so we can unsubscribe it safely
let activeUnionOnServer: SubscribePayload | null = null;

/** Helpers */
const uniq = (arr: string[]) => Array.from(new Set(arr));
const normKey = (k: string, seg?: string) => {
    const key = String(k || "").trim();
    if (!key) return "";
    // already "SEGMENT:SYMBOL"
    if (key.includes(":")) return key;
    // snapshot gives only "NIFTY50" -> make "INDICES:NIFTY50"
    return seg ? `${seg}:${key}` : key;
};
const lastPart = (k: string) => {
    const parts = String(k || "").split(":");
    return (parts[parts.length - 1] || "").trim();
};

function buildUnionPayload(): SubscribePayload | null {
    if (!registry.size) return null;

    // merge: segment + subscription_type => symbols union
    const bucket = new Map<
        string,
        { segment: string; subscription_type: string; symbols: Set<string> }
    >();

    for (const p of registry.values()) {
        for (const it of p.data || []) {
            const seg = String(it.segment || "").trim();
            const typ = String(it.subscription_type || "").trim();
            if (!seg || !typ) continue;

            const key = `${seg}__${typ}`;
            if (!bucket.has(key)) {
                bucket.set(key, {
                    segment: seg,
                    subscription_type: typ,
                    symbols: new Set(),
                });
            }
            const b = bucket.get(key)!;
            (it.symbols || []).forEach((s) => {
                const sym = String(s || "").trim();
                if (sym) b.symbols.add(sym);
            });
        }
    }

    const data: SubscribeItem[] = [];
    bucket.forEach((b) => {
        data.push({
            segment: b.segment,
            subscription_type: b.subscription_type,
            symbols: Array.from(b.symbols),
        });
    });

    if (!data.length) return null;
    return { type: "subscribe", data };
}

function sendUnionToServer() {
    // if paused, don't re-subscribe (we keep socket open + cache can still update)
    if (paused) return;
    if (currentState !== "open") return;

    const union = buildUnionPayload();

    // If nothing to subscribe, unsubscribe previous union if any
    if (!union) {
        if (activeUnionOnServer?.data?.length) {
            marketWs.sendJson({ type: "unsubscribe", data: activeUnionOnServer.data });
        }
        activeUnionOnServer = null;
        return;
    }

    // Unsubscribe previous union to avoid server keeping old streams
    if (activeUnionOnServer?.data?.length) {
        marketWs.sendJson({ type: "unsubscribe", data: activeUnionOnServer.data });
    }

    // Subscribe new union
    marketWs.sendJson(union);
    activeUnionOnServer = union;
}

/** Public: state + cache */
export function getWsState() {
    return currentState;
}

export function getLastByKey(key: string) {
    // allow both "NIFTY50" or "INDICES:NIFTY50"
    const direct = lastByKey[key];
    if (direct != null) return direct;

    const wanted = lastPart(key);
    if (!wanted) return undefined;

    for (const k of Object.keys(lastByKey)) {
        if (lastPart(k) === wanted) return lastByKey[k];
    }
    return undefined;
}

export function getAllLast() {
    return lastByKey;
}

/** Public: registry API (GLOBAL) */
export function registerSubscription(ownerId: string, payload: SubscribePayload) {
    if (!ownerId) return;
    if (!payload?.data?.length) return;

    registry.set(ownerId, payload);
    sendUnionToServer();
}

export function unregisterSubscription(ownerId: string) {
    if (!ownerId) return;
    registry.delete(ownerId);
    sendUnionToServer();
}

export function updateSubscription(ownerId: string, payload: SubscribePayload) {
    registerSubscription(ownerId, payload);
}

/** Public: pause/resume */
export function pauseMarketFeed() {
    paused = true;

    // stop server streaming (but keep socket connected)
    if (activeUnionOnServer?.data?.length) {
        marketWs.sendJson({ type: "unsubscribe", data: activeUnionOnServer.data });
    }
}

export function resumeMarketFeed() {
    paused = false;
    sendUnionToServer(); // re-subscribe union
}

/** Public: socket controls */
export function connectSocketOnce() {
    marketWs.connect();
}

export function disconnectSocket() {
    marketWs.close();
}

/** Public: listeners */
export function onWsMessage(fn: (msg: any) => void) {
    messageListeners.add(fn);
    return () => {
        messageListeners.delete(fn);
    };
}

export function onWsState(fn: (s: WsState) => void) {
    stateListeners.add(fn);
    return () => {
        stateListeners.delete(fn);
    };
}

/** WS instance */
export const marketWs = new WsClient({
    url: NEW_WEB_SOCKET_URL,
    heartbeatMs: 0, // ✅ IMPORTANT: disable ping (server "data cannot be empty")
    onStateChange: (s) => {
        currentState = s;
        stateListeners.forEach((fn) => fn(s));

        if (s === "open") {
            console.log("🟢 WebSocket CONNECTED");
            sendUnionToServer();
        } else if (s === "connecting") {
            console.log("🟡 WebSocket CONNECTING...");
        } else {
            console.log("🔴 WebSocket CLOSED");
        }
    },

    onMessage: (msg) => {
        if (!msg) return;

        // ✅ Cache snapshot + update using normalized keys
        if (
            (msg?.type === "snapshot" || msg?.type === "update") &&
            msg?.data &&
            typeof msg.data === "object"
        ) {
            const seg = msg?.segment ? String(msg.segment).trim() : undefined;

            Object.entries(msg.data as Record<string, any>).forEach(([k, payload]) => {
                const nk = normKey(k, seg);
                if (!nk) return;
                lastByKey[nk] = payload;
            });
        }

        /**
         * ✅ FIX:
         * When paused, we still allow snapshot/update messages to reach UI listeners.
         * Otherwise WatchList never calls setTick(), so it won't re-render to show cached lastByKey.
         */
        if (paused) {
            if (msg?.type === "snapshot" || msg?.type === "update") {
                messageListeners.forEach((fn) => fn(msg));
            }
            return;
        }

        messageListeners.forEach((fn) => fn(msg));
    },
});
