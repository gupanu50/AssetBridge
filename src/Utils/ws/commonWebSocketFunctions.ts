export function toNum(v: any): number | undefined {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
}

export function computeChange(payload: any): { ltp?: number; abs?: number; pct?: number } {
    if (!payload) return {};

    const ltp = toNum(payload.ltp ?? payload.current_price ?? payload.price);
    const close = toNum(payload.close);

    // If server already sends change / pct use it, else compute from close
    const abs =
        toNum(payload.absolute_change ?? payload.change ?? payload.chg) ??
        (ltp != null && close != null ? ltp - close : undefined);

    const pct =
        toNum(payload.percentage_change ?? payload.changePct ?? payload.pct ?? payload.pc) ??
        (abs != null && close != null && close !== 0 ? (abs / close) * 100 : undefined);

    return { ltp, abs, pct };
}

export function formatNumber(n?: number, decimals = 2) {
    if (n == null) return '--';
    return n.toFixed(decimals);
}

export function formatChange(abs?: number, pct?: number) {
    if (abs == null && pct == null) return '--';
    const absText = abs == null ? '' : `${abs >= 0 ? '+' : ''}${abs.toFixed(2)}`;
    const pctText = pct == null ? '' : `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
    if (absText && pctText) return `${absText} (${pctText})`;
    return absText || pctText;
}
export const lastPart = (k: string) => {
    // "INDICES:NIFTY50" -> "NIFTY50"
    const parts = String(k || "").split(":");
    return (parts[parts.length - 1] || "").trim();
};

export function makeKey(segment: string, symbol: string) {
    return `${segment}:${symbol}`;
}