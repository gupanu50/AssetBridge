import React, { useEffect, useMemo, useRef } from "react";
import { AppState } from "react-native";
import {
    connectSocketOnce,
    pauseMarketFeed,
    resumeMarketFeed,
    registerSubscription,
    unregisterSubscription,
    onWsMessage,
} from "./marketSocket";
import { isMarketOpenIST } from "../helper";
import type { SubscribePayload } from "./marketSocket";

type Props = {
    payload: SubscribePayload; // ✅ ONLY dynamic thing
    ownerId?: string;          // optional; default "bootstrap"
};

function extractRequiredSymbols(payload: SubscribePayload): string[] {
    const out: string[] = [];
    (payload?.data || []).forEach((it) => {
        (it.symbols || []).forEach((s) => {
            const sym = String(s || "").trim();
            if (sym) out.push(sym);
        });
    });
    return Array.from(new Set(out));
}

export default function SocketBootstrap({ payload, ownerId = "bootstrap" }: Props) {
    const closedMarketSnapshotDoneRef = useRef(false);
    const REQUIRED = useMemo(() => extractRequiredSymbols(payload), [payload]);

    useEffect(() => {
        connectSocketOnce();

        // ✅ register this payload globally (union with other screens)
        registerSubscription(ownerId, payload);

        const runClosedMarketOneShotSnapshot = () => {
            if (closedMarketSnapshotDoneRef.current) {
                pauseMarketFeed();
                return;
            }

            closedMarketSnapshotDoneRef.current = true;

            // resume + subscribe union
            resumeMarketFeed();

            const got = new Set<string>();
            let timeoutId: any = null;

            const off = onWsMessage((msg) => {
                if (msg?.type !== "snapshot" && msg?.type !== "update") return;
                if (!msg?.data || typeof msg.data !== "object") return;

                Object.keys(msg.data).forEach((k) => {
                    // k can be "NIFTY50" or "INDICES:NIFTY50" or "NSE:INFY"
                    const parts = String(k).split(":");
                    const last = (parts[parts.length - 1] || "").trim();
                    if (last) got.add(last);
                });

                const allReceived = REQUIRED.every((s) => got.has(s));
                if (allReceived) {
                    pauseMarketFeed();
                    off();
                    if (timeoutId) clearTimeout(timeoutId);
                }
            });

            timeoutId = setTimeout(() => {
                pauseMarketFeed();
                off();
            }, 8000);
        };

        const applyMarketRule = () => {
            const open = isMarketOpenIST();

            if (open) {
                // market open => stream continuously
                closedMarketSnapshotDoneRef.current = false;
                resumeMarketFeed();
            } else {
                // market closed => snapshot once then pause
                runClosedMarketOneShotSnapshot();
            }
        };

        applyMarketRule();

        const timer = setInterval(applyMarketRule, 60_000);

        const sub = AppState.addEventListener("change", (state) => {
            if (state === "active") {
                connectSocketOnce();
                applyMarketRule();
            }
        });

        return () => {
            clearInterval(timer);
            sub.remove();
            unregisterSubscription(ownerId);
        };
    }, [ownerId, payload, REQUIRED]);

    return null;
}
