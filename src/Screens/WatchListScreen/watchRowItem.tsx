import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import IconButton from '../../ReusableComponents/iconButton';
import { Images } from '../../Assets';
import { mainColors } from '../../Utils/helper';
import { styles } from './styles';
import { WatchRow } from './type';

// ✅ ADD THESE IMPORTS
import { onWsMessage, getLastByKey } from '../../Utils/ws/marketSocket';
import { computeChange } from '../../Utils/ws/commonWebSocketFunctions';

type AnchorRect = { x: number; y: number; width: number; height: number };

type RowProps = {
    item: WatchRow;
    onOpenMenu: (rect: AnchorRect, item: WatchRow) => void;
    onPressRow: () => void;
};

const WatchRowItem = ({ item, onOpenMenu, onPressRow }: RowProps) => {
    const dotsRef = useRef<View>(null);

    // ✅ LOCAL STATE (per row)
    const [wsPayload, setWsPayload] = useState<any>(null);

    const [isUpdating, setIsUpdating] = useState(false);

    const timerRef = useRef<any>(null);
    const openMenu = () => {
        dotsRef.current?.measureInWindow((x, y, width, height) => {
            onOpenMenu({ x, y, width, height }, item);
        });
    };

    // ✅ LISTEN ONLY FOR THIS ROW
    useEffect(() => {
        if (!item?.wsKey) return;

        const initial = getLastByKey(item.wsKey);
        if (initial) setWsPayload(initial);

        const off = onWsMessage((msg) => {
            if (!msg?.data) return;

            const data = msg.data[item.wsKey];
            if (!data) return;

            // 🔥 trigger flash
            setIsUpdating(true);
            setWsPayload(data);

            // remove flash after 300ms
            setTimeout(() => {
                setIsUpdating(false);
            }, 300);
        });

        return () => {
            off();
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [item?.wsKey]);

    // ✅ COMPUTE FROM WS OR FALLBACK
    const { ltp, abs, pct } = computeChange(wsPayload);

    const finalPrice = ltp ?? null;

    const isLoading = finalPrice == null;
    const finalChange =
        abs != null && pct != null
            ? `${abs >= 0 ? '+' : ''}${abs.toFixed(2)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)`
            : item.change;

    const isUp = (abs ?? item.absolute_change ?? 0) >= 0;

    const arrowImg = isUp ? Images.profitUp : Images.lossDown;
    const priceColor = isUp ? mainColors.green : mainColors.red;

    return (
        <TouchableOpacity activeOpacity={0.85} style={styles.watchRow} onPress={onPressRow}>
            <View style={styles.watchLeft}>
                <Text style={styles.watchName} numberOfLines={1}>
                    {item.symbol}
                </Text>
                <Text style={styles.watchExch} numberOfLines={1}>
                    {item.exchange}
                </Text>
            </View>

            <View style={styles.watchRight}>
                {isLoading ? (
                    // 🔥 SHIMMER SKELETON
                    <View style={{
                        height: 16,
                        width: 60,
                        borderRadius: 4,
                        backgroundColor: '#2a2a2a',
                        overflow: 'hidden'
                    }}>
                        <View style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#3a3a3a',
                            opacity: 0.6
                        }} />
                    </View>
                ) : (
                    // ✅ REAL VALUE
                    <Text
                        style={[
                            styles.watchPrice,
                            { color: priceColor }
                        ]}
                        numberOfLines={1}
                    >
                        {finalPrice}
                    </Text>
                )}

                <View style={styles.watchChangeRow}>
                    <Text style={[styles.watchChange, { color: mainColors.white }]} numberOfLines={1}>
                        {finalChange}
                    </Text>
                </View>
            </View>

            <View ref={dotsRef} collapsable={false}>
                <IconButton
                    vectorType="MaterialCommunityIcons"
                    name="dots-vertical"
                    onPress={openMenu}
                    color={mainColors.inputBorder}
                />
            </View>
        </TouchableOpacity>
    );
};

export default WatchRowItem;