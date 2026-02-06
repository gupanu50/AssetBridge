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

let paused = false;

// last sent subscription (for re-subscribe on reconnect / resume)
let lastSubscribePayload: SubscribePayload | null = null;

// Cache last data per key (key can be "NIFTY50" or "NSE:FORTIS" etc.)
const lastByKey: Record<string, any> = {};

export function getWsState() {
    return currentState;
}

export function getLastByKey(key: string) {
    return lastByKey[key];
}

export function getAllLast() {
    return lastByKey;
}

export const marketWs = new WsClient({
    url: NEW_WEB_SOCKET_URL,
    heartbeatMs: 0, // ✅ IMPORTANT: disable ping (your server errors on empty data)
    onStateChange: (s) => {
        currentState = s;
        stateListeners.forEach((fn) => fn(s));

        if (s === "open") {
            console.log("🟢 WebSocket CONNECTED");

            // If market open (not paused) and we had subscription -> resubscribe after reconnect
            if (!paused && lastSubscribePayload?.data?.length) {
                marketWs.sendJson(lastSubscribePayload);
            }
        } else if (s === "connecting") {
            console.log("🟡 WebSocket CONNECTING...");
        } else {
            console.log("🔴 WebSocket CLOSED");
        }
    },
    onMessage: (msg) => {
        if (!msg) return;

        // ✅ Cache BOTH snapshot + update (Postman shows update)
        if ((msg?.type === "snapshot" || msg?.type === "update") && msg?.data && typeof msg.data === "object") {
            Object.entries(msg.data as Record<string, any>).forEach(([k, payload]) => {
                lastByKey[k] = payload;
            });
        }

        // paused => do not push to UI listeners
        if (paused) return;

        messageListeners.forEach((fn) => fn(msg));
    },
});

export function connectSocketOnce() {
    marketWs.connect();
}

export function disconnectSocket() {
    marketWs.close();
}

export function subscribe(payload: SubscribePayload) {
    if (!payload?.data?.length) return;

    // save subscription for reconnect/resume
    lastSubscribePayload = payload;

    if (paused) return;

    marketWs.sendJson(payload);
}

export function unsubscribe(payload: UnsubscribePayload) {
    if (!payload?.data?.length) return;
    marketWs.sendJson(payload);
}

export function pauseMarketFeed() {
    paused = true;
    console.log('PausedMarketFeed', paused)
    // unsubscribe from server stream (socket stays connected)
    if (lastSubscribePayload?.data?.length) {
        marketWs.sendJson({ type: "unsubscribe", data: lastSubscribePayload.data });
    }
}

export function resumeMarketFeed() {
    paused = false;
    console.log('ResumeMarketFeed', paused)
    // re-subscribe
    if (lastSubscribePayload?.data?.length) {
        marketWs.sendJson(lastSubscribePayload);
    }
}

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
