import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import useCompressQuery from '../Screens/HomeScreen/Hooks/useCompressQuery';
import { getLastByKey, onWsMessage } from '../Utils/ws/marketSocket';
import { CommonTopBtnSliderProps, IndexKey, IndexRow } from './commonTypes';

const CommonTopBtnSlider = ({ navigation }: CommonTopBtnSliderProps) => {
    function toNum(v: any): number | undefined {
        const n = Number(v);
        return Number.isFinite(n) ? n : undefined;
    }

    function computeChange(payload: any): { ltp?: number; abs?: number; pct?: number } {
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

    function formatNumber(n?: number, decimals = 2) {
        if (n == null) return '--';
        return n.toFixed(decimals);
    }

    function formatChange(abs?: number, pct?: number) {
        if (abs == null && pct == null) return '--';
        const absText = abs == null ? '' : `${abs >= 0 ? '+' : ''}${abs.toFixed(2)}`;
        const pctText = pct == null ? '' : `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
        if (absText && pctText) return `${absText} (${pctText})`;
        return absText || pctText;
    }
    const { data } = useCompressQuery();
    const [indexRows, setIndexRows] = useState<Record<IndexKey, IndexRow>>(() => {
        // ✅ initial from cache (works even if market closed and ws paused)
        const keys: IndexKey[] = ['NIFTY50', 'SENSEX', 'NIFTYBANK'];
        const initial: Record<IndexKey, IndexRow> = {} as any;

        keys.forEach((k) => {
            const payload = getLastByKey(k); // cache stores key like "NIFTY50"
            const { ltp, abs, pct } = computeChange(payload);
            initial[k] = {
                key: k,
                label: k === 'NIFTY50' ? 'NIFTY 50' : k === 'NIFTYBANK' ? 'NIFTY Bank' : 'SENSEX',
                ltp,
                absChange: abs,
                pctChange: pct,
            };
        });

        return initial;
    });

    useEffect(() => {
        const WANT: IndexKey[] = ["NIFTY50", "SENSEX", "NIFTYBANK"];

        const lastPart = (k: string) => {
            // "INDICES:NIFTY50" -> "NIFTY50"
            const parts = String(k || "").split(":");
            return (parts[parts.length - 1] || "").trim();
        };

        const off = onWsMessage((msg) => {
            if (msg?.type !== "snapshot" && msg?.type !== "update") return;
            if (!msg?.data || typeof msg.data !== "object") return;
            console.log("WS MESSAGE:", msg);
            setIndexRows((prev) => {
                let changed = false;
                const next = { ...prev };

                for (const key of WANT) {
                    let payload: any = undefined;

                    if (msg.type === "snapshot") {
                        // snapshot usually comes as { data: { NIFTY50: {...} } }
                        payload = msg.data?.[key];
                    } else {
                        // update comes as { data: { "INDICES:NIFTY50": {...} } }
                        for (const [k, v] of Object.entries(msg.data)) {
                            if (lastPart(k) === key) {
                                payload = v;
                                break;
                            }
                        }
                    }

                    if (!payload) continue;

                    const { ltp, abs, pct } = computeChange(payload);

                    next[key] = {
                        ...next[key],
                        ltp: ltp ?? next[key]?.ltp,
                        absChange: abs ?? next[key]?.absChange,
                        pctChange: pct ?? next[key]?.pctChange,
                    };

                    changed = true;
                }

                return changed ? next : prev;
            });
        });

        return () => off();
    }, []);

    const horidata = useMemo(() => {
        const keys: IndexKey[] = ['NIFTY50', 'SENSEX', 'NIFTYBANK'];
        return keys.map((k) => {
            const row = indexRows[k];
            const abs = row?.absChange;
            const pct = row?.pctChange;

            const isUp = (abs ?? 0) >= 0;
            const color = isUp ? mainColors.green : mainColors.red;

            return {
                label: row?.label ?? k,
                value: formatNumber(row?.ltp, 2),
                percent: formatChange(abs, pct),
                color,
            };
        });
    }, [indexRows]);
    return (
        <View style={styles.mainView}>
            <FlatList
                horizontal
                data={horidata}
                keyExtractor={(item, index) => item.label + index}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.innerBoxView} onPress={() => navigation?.navigate('Instrument')}>
                        <Text style={styles.textNifty}>{item.label}</Text>
                        <Text style={styles.textNiftyValue}>
                            {item.value}{'  '}
                            <Text style={{ color: item.color }}>{item.percent}</Text>
                        </Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default CommonTopBtnSlider

const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: scaler(10),
    },
    innerBoxView: {
        paddingHorizontal: scaler(20),
        paddingVertical: scaler(10),
        borderRadius: 10,
        borderColor: mainColors.niftyBorder,
        borderWidth: 1,
        marginRight: scaler(10)
    },
    textNifty: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(12),
    },
    textNiftyValue: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(10),
    },
})