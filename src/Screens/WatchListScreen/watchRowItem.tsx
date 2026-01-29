import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import IconButton from '../../ReusableComponents/iconButton';
import { Images } from '../../Assets';
import { mainColors } from '../../Utils/helper';
import { styles } from './styles';
import { WatchRow } from './type';

type AnchorRect = { x: number; y: number; width: number; height: number };

type RowProps = {
    item: WatchRow;
    onOpenMenu: (rect: AnchorRect) => void;
    onPressRow: () => void;
};

const WatchRowItem = ({ item, onOpenMenu, onPressRow }: RowProps) => {
    const dotsRef = useRef<View>(null);

    const openMenu = () => {
        dotsRef.current?.measureInWindow((x, y, width, height) => {
            onOpenMenu({ x, y, width, height });
        });
    };

    const arrowImg = item.isUp ? Images.profitUp : Images.lossDown;
    const priceColor = item.isUp ? mainColors.green : mainColors.red;

    return (
        <TouchableOpacity activeOpacity={0.85} style={styles.watchRow} onPress={onPressRow}>
            <View style={styles.watchLeft}>
                <Text style={styles.watchName} numberOfLines={1}>
                    {item.name}
                </Text>
                <Text style={styles.watchExch} numberOfLines={1}>
                    {item.exch}
                </Text>
            </View>

            <View style={styles.watchRight}>
                <Text style={[styles.watchPrice, { color: priceColor }]} numberOfLines={1}>
                    {item.price}
                </Text>

                <View style={styles.watchChangeRow}>
                    <Text style={[styles.watchChange, { color: mainColors.white }]} numberOfLines={1}>
                        {item.change}
                    </Text>
                    <Image source={arrowImg} style={styles.watchArrowImg} resizeMode="contain" />
                </View>
            </View>

            {/* measure wrapper */}
            <View ref={dotsRef} collapsable={false} style={{}}>
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
