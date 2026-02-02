import { NEW_WEB_SOCKET_URL } from "../helper";
import { WsClient, WsState } from "./wsClient";

type Tick = {
    symbol: string;
    current_price?: number;
    absolute_change?: number;
    percentage_change?: number;
    exchange?: string;
    ts?: number;
};

type TickListener = (t: Tick) => void;
type StateListener = (s: WsState) => void;

const activeSymbols = new Set<string>();
const tickListeners = new Set<TickListener>();

let currentState: WsState = "idle";
const stateListeners = new Set<(s: WsState) => void>();

export function getWsState() {
    return currentState;
}


export const marketWs = new WsClient({
    url: NEW_WEB_SOCKET_URL,
    onStateChange: (s) => {
        currentState = s;
        stateListeners.forEach((fn) => fn(s));
        if (s === "open") {
            console.log("🟢 WebSocket CONNECTED");
            const syms = Array.from(activeSymbols);
            if (syms.length) marketWs.sendJson({ type: "subscribe", symbols: syms });
        } else if (s === "connecting") {
            console.log("🟡 WebSocket CONNECTING...");
        } else {
            console.log("🔴 WebSocket CLOSED");
        }
    },
    onMessage: (msg) => {
        if (!msg) return;
        if (Array.isArray(msg)) msg.forEach((m) => emit(parseTick(m)));
        else emit(parseTick(msg));
    },
});

function parseTick(m: any): Tick {
    const symbol = String(m.symbol ?? m.s ?? "").trim();
    if (!symbol) return { symbol: "" };

    const price = m.current_price ?? m.ltp ?? m.price ?? m.p;
    const abs = m.absolute_change ?? m.change ?? m.chg;
    const pct = m.percentage_change ?? m.changePct ?? m.pct ?? m.pc;

    return {
        symbol,
        current_price: price != null ? Number(price) : undefined,
        absolute_change: abs != null ? Number(abs) : undefined,
        percentage_change: pct != null ? Number(pct) : undefined,
        exchange: m.exchange ?? m.ex ?? m.e,
        ts: Number(m.ts ?? Date.now()),
    };
}

function emit(t: Tick) {
    if (!t.symbol) return;
    tickListeners.forEach((fn) => fn(t));
}

export function connectSocketOnce() {
    marketWs.connect();
}

export function disconnectSocket() {
    marketWs.close();
}

export function subscribeSymbols(symbols: string[]) {
    symbols.forEach((s) => activeSymbols.add(s));
    marketWs.sendJson({ type: "subscribe", symbols });
}

export function unsubscribeSymbols(symbols: string[]) {
    symbols.forEach((s) => activeSymbols.delete(s));
    marketWs.sendJson({ type: "unsubscribe", symbols });
}

export function onTick(fn: TickListener) {
    tickListeners.add(fn);
    return () => tickListeners.delete(fn);
}

export function onWsState(listener: (s: WsState) => void) {
    stateListeners.add(listener);
    return () => stateListeners.delete(listener);
}
