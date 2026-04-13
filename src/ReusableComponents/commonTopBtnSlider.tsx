import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { fontFamily, isMarketOpenIST, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import { getLastByKey, onWsMessage } from '../Utils/ws/marketSocket';
import { CommonTopBtnSliderProps, IndexKey, IndexRow } from './commonTypes';
import { computeChange, formatChange, formatNumber, lastPart } from '../Utils/ws/commonWebSocketFunctions';
import useGetLtpQuery from '../Screens/HomeScreen/Hooks/useGetLtpQuery';
import CommonTopBtnSliderSkeleton from '../Screens/HomeScreen/Skeleton/CommonTabBtnSkeleton/CommonTopBtnSliderSkeleton';

const CommonTopBtnSlider = ({ navigation }: CommonTopBtnSliderProps) => {
    const { data, isLoading } = useGetLtpQuery();
    // console.log('DataLtp', data?.data);
    const isMarketOpen = isMarketOpenIST();
    const offlineLtp = data?.data?.data?.results;
    // console.log('OfflineLtp',offlineLtp)
    const [indexRows, setIndexRows] = useState<Record<IndexKey, IndexRow>>(() => {
        // ✅ initial from cache (works even if market closed and ws paused)
        const keys: IndexKey[] = ['NIFTY50', 'SENSEX', 'NIFTYBANK'];
        const initial: Record<IndexKey, IndexRow> = {} as any;

        keys.forEach((k) => {
            const payload = getLastByKey(k); // cache stores key like "NIFTY50"
            // const previousClose = previousCloseMap[k];
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

        const off = onWsMessage((msg) => {
            if (msg?.type !== "snapshot" && msg?.type !== "update") return;
            if (!msg?.data || typeof msg.data !== "object") return;
            // console.log('WS Message CommonTabBTNSlider', msg);
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
                    // const previousClose = previousCloseMap[key];
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
    // Create a consistent format for both horidata and offlineLtp
    const mapOfflineLtpToHoridata = (data: any) => {
        return data?.map((item: any) => {
            return {
                symbol: item.symbol,  // Replace this with the correct field in offlineLtp
                current_price: formatNumber(item.ltp, 2), // Use the correct field
                percentage_change: formatChange(item.absolute_change || 0, item.percentage_change || 0), // Assuming absChange and pctChange are present
                color: item?.absolute_change >= 0 ? mainColors.greenText : mainColors.redText,  // Change color based on absolute change
                exchange: 'INDICES',
                index: 'index'
            };
        });
    };
    const horidata = useMemo(() => {
        const keys: IndexKey[] = ['NIFTY50', 'SENSEX', 'NIFTYBANK'];
        return keys.map((k) => {
            const row = indexRows[k];
            const abs = row?.absChange;
            const pct = row?.pctChange;

            const isUp = (abs ?? 0) >= 0;
            const color = isUp ? mainColors.green : mainColors.red;

            return {
                symbol: row?.label ?? k,
                current_price: formatNumber(row?.ltp, 2),
                percentage_change: formatChange(abs, pct),
                color,
                exchange: 'INDICES',
                index: 'index'
            };
        });
    }, [indexRows]);
    // Render Item when Market is Open
    const renderItemWhenMarketOpen = ({ item }: any) => (
        <TouchableOpacity style={styles.innerBoxView} onPress={() => navigation?.navigate('Instrument', { item: item })}>
            <Text style={styles.textNifty}>{item.symbol}</Text>
            <Text style={styles.textNiftyValue}>
                {item.current_price}{'  '}
                <Text style={{ color: item.color }}>
                    {item.percentage_change}
                </Text>
            </Text>
        </TouchableOpacity>
    );

    const renderItemWhenMarketClosed = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.innerBoxView} onPress={() => navigation?.navigate('Instrument', { item: item })}>
                <Text style={styles.textNifty}>{item.symbol}</Text>
                <Text style={styles.textNiftyValue}>
                    <View style={styles.flexView}>
                        {/* LTP */}
                        <Text style={{ color: mainColors.white }}>
                            {item?.current_price}{'  '}
                        </Text>
                        <Text style={{
                            color: item?.percentage_change.includes('+') ? mainColors.greenText : mainColors.redText
                        }}>
                            {`${item?.percentage_change}`}
                        </Text>
                    </View>
                </Text>
            </TouchableOpacity>
        )
    };
    const showSkeleton =
        isLoading ||
        (!isMarketOpen && !offlineLtp?.length) ||
        (isMarketOpen && horidata?.length <= 0);

    if (showSkeleton) {
        return <CommonTopBtnSliderSkeleton />;
    }

    return (
        <View style={styles.mainView}>
            <FlatList
                horizontal
                data={isMarketOpen ? horidata : mapOfflineLtpToHoridata(offlineLtp)}
                keyExtractor={(item, index) => item.symbol + index}
                renderItem={isMarketOpen ? renderItemWhenMarketOpen : renderItemWhenMarketClosed}
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
    flexView: {
        flexDirection: 'row', alignItems: 'center'
    }
})