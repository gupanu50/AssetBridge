import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import {
    connectSocketOnce,
    pauseMarketFeed,
    resumeMarketFeed,
    subscribe,
    onWsMessage,
} from "./marketSocket";
import { isMarketOpenIST } from "../helper";

/**
 * ✅ Your required symbols
 */
const REQUIRED_KEYS = ["NIFTY50", "SENSEX", "NIFTYBANK"] as const;

const DEFAULT_SUBSCRIBE_PAYLOAD = {
    type: "subscribe" as const,
    data: [
        { segment: "INDICES", symbols: ["NIFTY50"], subscription_type: "contract" },
        { segment: "INDICES", symbols: ["SENSEX"], subscription_type: "contract" },
        { segment: "INDICES", symbols: ["NIFTYBANK"], subscription_type: "contract" },
    ],
};

export default function SocketBootstrap() {
    // ✅ Closed-market snapshot should run once per app session
    const closedMarketSnapshotDoneRef = useRef(false);

    useEffect(() => {
        connectSocketOnce();

        const runClosedMarketOneShotSnapshot = () => {
            // Already done once => keep paused
            if (closedMarketSnapshotDoneRef.current) {
                pauseMarketFeed();
                return;
            }

            closedMarketSnapshotDoneRef.current = true;

            // Temporarily resume and subscribe to get last values
            resumeMarketFeed();
            subscribe(DEFAULT_SUBSCRIBE_PAYLOAD);

            const got = new Set<string>();
            let timeoutId: any = null;

            const off = onWsMessage((msg) => {
                // We accept both snapshot + update (some servers send update)
                if (msg?.type !== "snapshot" && msg?.type !== "update") return;
                if (!msg?.data) return;

                Object.keys(msg.data).forEach((k) => got.add(k));
                const allReceived = REQUIRED_KEYS.every((k) => got.has(k));

                if (allReceived) {
                    // Got all 3 once -> pause (unsubscribe) but keep socket connected
                    pauseMarketFeed();
                    off();
                    if (timeoutId) clearTimeout(timeoutId);
                }
            });

            // Safety timeout: pause anyway
            timeoutId = setTimeout(() => {
                pauseMarketFeed();
                off();
            }, 8000);
        };

        const applyMarketRule = () => {
            const open = isMarketOpenIST();

            if (open) {
                // ✅ MARKET OPEN => Continuous feed ON
                closedMarketSnapshotDoneRef.current = false; // reset so next closed session can snapshot again
                resumeMarketFeed();
                subscribe(DEFAULT_SUBSCRIBE_PAYLOAD);
            } else {
                // ✅ MARKET CLOSED => Snapshot once then pause/unsubscribe
                runClosedMarketOneShotSnapshot();
            }
        };

        applyMarketRule();

        // Check every 1 minute (if market opens while app is open)
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
        };
    }, []);

    return null;
}
