export type WsState = "idle" | "connecting" | "open" | "closed";

type WsClientOptions = {
    url: string;
    heartbeatMs?: number; // 0 = disabled
    maxBackoffMs?: number;
    onMessage?: (msg: any) => void;
    onStateChange?: (s: WsState) => void;
    onOpen?: () => void;
};

export class WsClient {
    private ws: WebSocket | null = null;
    private state: WsState = "idle";
    private heartbeatTimer: any = null;
    private backoffMs = 500;
    private manualClose = false;
    private queue: string[] = [];

    private url: string;
    private heartbeatMs: number;
    private maxBackoffMs: number;
    private onMessage?: (msg: any) => void;
    private onStateChange?: (s: WsState) => void;
    private onOpen?: () => void;

    constructor(opts: WsClientOptions) {
        this.url = opts.url;
        this.heartbeatMs = opts.heartbeatMs ?? 0; // ✅ disabled by default (your server errors on ping)
        this.maxBackoffMs = opts.maxBackoffMs ?? 15000;
        this.onMessage = opts.onMessage;
        this.onStateChange = opts.onStateChange;
        this.onOpen = opts.onOpen;
    }

    connect() {
        if (this.ws && (this.state === "connecting" || this.state === "open")) return;

        this.manualClose = false;
        this.setState("connecting");

        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            this.backoffMs = 500;
            this.setState("open");
            this.flush();
            this.startHeartbeat();
            this.onOpen?.();
        };

        this.ws.onmessage = (e) => {
            let msg: any = e.data;
            try {
                msg = JSON.parse(e.data);
            } catch { }
            this.onMessage?.(msg);
        };

        this.ws.onerror = () => {
            // Some servers fire error then close.
        };

        this.ws.onclose = () => {
            this.stopHeartbeat();
            this.setState("closed");
            this.ws = null;
            if (!this.manualClose) this.reconnect();
        };
    }

    close() {
        this.manualClose = true;
        this.stopHeartbeat();
        this.setState("closed");
        this.ws?.close();
        this.ws = null;
    }

    sendJson(obj: any) {
        const s = JSON.stringify(obj);
        if (!this.ws || this.state !== "open") {
            this.queue.push(s);
            return;
        }
        this.ws.send(s);
    }

    private flush() {
        if (!this.ws) return;
        while (this.queue.length) {
            const s = this.queue.shift();
            if (s) this.ws.send(s);
        }
    }

    private reconnect() {
        const wait = this.backoffMs;
        this.backoffMs = Math.min(this.backoffMs * 1.8, this.maxBackoffMs);
        setTimeout(() => {
            if (!this.manualClose) this.connect();
        }, wait);
    }

    private startHeartbeat() {
        this.stopHeartbeat();
        if (!this.heartbeatMs || this.heartbeatMs <= 0) return;

        this.heartbeatTimer = setInterval(() => {
            this.sendJson({ type: "ping", ts: Date.now() });
        }, this.heartbeatMs);
    }

    private stopHeartbeat() {
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = null;
    }

    private setState(s: WsState) {
        this.state = s;
        this.onStateChange?.(s);
    }
}
