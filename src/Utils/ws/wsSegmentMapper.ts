// src/Utils/ws/wsSegmentMapper.ts

/**
 * API sends segment like "EQUITY"
 * WS expects "NSE" (cash equity) or other fixed segments.
 */
export function mapApiToWsSegment(apiSegment?: string, exchange?: string): string {
    const seg = String(apiSegment || "").trim().toUpperCase();
    const ex = String(exchange || "").trim().toUpperCase();

    // ✅ MAIN FIX: EQUITY -> NSE/BSE based on exchange
    if (seg === "EQUITY") {
        if (ex === "BSE") return "BSE";
        return "NSE"; // default NSE
    }

    // already valid websocket segments
    if (seg === "INDICES") return "INDICES";
    if (seg === "NFO-FUT") return "NFO-FUT";
    if (seg === "NFO-OPT") return "NFO-OPT";
    if (seg === "NSE") return "NSE";
    if (seg === "BSE") return "BSE";

    // fallback
    return seg || "NSE";
}

/**
 * Build cache key in same format as marketSocket.ts stores: "SEGMENT:SYMBOL"
 */
export function buildWsKey(wsSegment: string, symbol: string) {
    return `${String(wsSegment || "").trim().toUpperCase()}:${String(symbol || "")
        .trim()
        .toUpperCase()}`;
}

/**
 * ✅ This is what you should use everywhere in UI:
 * Pass API segment + exchange and it will output the correct WS cache key.
 */
export function makeKey(apiSegment?: string, symbol?: string, exchange?: string) {
    const wsSeg = mapApiToWsSegment(apiSegment, exchange);
    return buildWsKey(wsSeg, String(symbol || ""));
}
