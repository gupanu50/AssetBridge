import { WsClient, WsState } from "./wsClient";

const WS_URL = "ws://13.201.49.145:8001/price/ws";

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
const stateListeners = new Set<StateListener>();

export const marketWs = new WsClient({
    url: WS_URL,
    onStateChange: (s) => {
        stateListeners.forEach((fn) => fn(s));
        if (s === "open") {
            const syms = Array.from(activeSymbols);
            if (syms.length) marketWs.sendJson({ type: "subscribe", symbols: syms });
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

export function onWsState(fn: StateListener) {
    stateListeners.add(fn);
    return () => stateListeners.delete(fn);
}
