import React, { useEffect } from "react";
import { AppState } from "react-native";
import { connectSocketOnce } from "./marketSocket";

/**
 * Mount this only in authenticated area (after login).
 * It will connect once and keep reconnecting if network drops.
 */
export default function SocketBootstrap() {
    useEffect(() => {
        connectSocketOnce();

        const sub = AppState.addEventListener("change", (state) => {
            if (state === "active") {
                // re-ensure connection after coming back
                connectSocketOnce();
            }
        });

        return () => {
            sub.remove();
            // IMPORTANT:
            // Do NOT close here if you want it alive while HomeTab exists.
            // It will close automatically when app is killed.
        };
    }, []);

    return null;
}
