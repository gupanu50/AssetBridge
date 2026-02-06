import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import {
    connectSocketOnce,
    pauseMarketFeed,
    resumeMarketFeed,
    subscribe,
    onWsMessage,
} from "./marketSocket";

/**
 * ✅ IST time safe check (no parsing issues)
 */
function getISTParts() {
    const parts = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).formatToParts(new Date());

    const obj: any = {};
    for (const p of parts) obj[p.type] = p.value;

    return {
        weekday: String(obj.weekday), // "Mon", "Tue"...
        hour: Number(obj.hour),
        minute: Number(obj.minute),
    };
}

// NSE market hours: 09:15 to 15:30 IST (Mon-Fri)
function isMarketOpenIST(): boolean {
    const { weekday, hour, minute } = getISTParts();
    if (weekday === "Sat" || weekday === "Sun") return false;

    const mins = hour * 60 + minute;
    return mins >= (9 * 60 + 15) && mins <= (15 * 60 + 30);
}

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
