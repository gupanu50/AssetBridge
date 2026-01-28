import React, { useMemo } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions,
} from 'react-native';
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import { KababProps } from './commonTypes';



const CommonKababMenu = (props: KababProps) => {
    const MENU_W = scaler(110);
    const MENU_H = scaler(210); // approx (header + 4 items)
    const GAP = scaler(8);
    const close = () => props?.setVisible(false);

    const { left, top } = useMemo(() => {
        const { width: SW, height: SH } = Dimensions.get('window');

        // fallback center if anchor missing
        if (!props.anchor) {
            return { left: (SW - MENU_W) / 2, top: (SH - MENU_H) / 2 };
        }

        const a = props.anchor;

        // open below the 3 dots
        let t = a.y + a.height + GAP;

        // align menu right edge with dots (like typical kebab)
        let l = a.x + (a.width / 2) - (MENU_W / 2);

        // prevent going off-screen right/left
        l = Math.max(GAP, Math.min(l, SW - MENU_W - GAP));

        // if near bottom, open above the dots
        if (t + MENU_H > SH - GAP) {
            t = a.y - MENU_H - GAP;
            t = Math.max(GAP, t);
        }

        return { left: l, top: t };
    }, [props.anchor]);

    const onPressItem = (key: 'buy' | 'sell' | 'chart' | 'delete') => {
        // TODO: handle action
        close();
    };

    return (
        <Modal
            visible={props.visible}
            transparent
            animationType="slide"
            onRequestClose={close}
        >
            <TouchableWithoutFeedback onPress={close}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.menuCard, { left, top }]}>
                            <View style={styles.itemsWrap}>
                                <TouchableOpacity style={styles.itemRow} activeOpacity={0.8} onPress={() => onPressItem('buy')}>
                                    <Text style={[styles.itemText, styles.buyText]}>Buy</Text>
                                </TouchableOpacity>
                                <View style={styles.line} />
                                <TouchableOpacity style={styles.itemRow} activeOpacity={0.8} onPress={() => onPressItem('sell')}>
                                    <Text style={[styles.itemText, styles.redText]}>Sell</Text>
                                </TouchableOpacity>
                                <View style={styles.line} />
                                <TouchableOpacity style={styles.itemRow} activeOpacity={0.8} onPress={() => onPressItem('chart')}>
                                    <Text style={styles.itemText}>Chart</Text>
                                </TouchableOpacity>
                                <View style={styles.line} />
                                <TouchableOpacity style={[styles.itemRow, styles.lastItem]} activeOpacity={0.8} onPress={() => onPressItem('delete')}>
                                    <Text style={styles.itemText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CommonKababMenu;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
    },

    // ABSOLUTE popover
    menuCard: {
        position: 'absolute',
        width: scaler(110),
        borderRadius: scaler(10),
        backgroundColor: '#1F2329',
        paddingTop: scaler(10),
        paddingBottom: scaler(8),
        paddingHorizontal: scaler(12),
    },

    headerRow: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: scaler(8),
    },

    title: {
        color: mainColors.white,
        fontSize: scaler(14),
        fontWeight: '600',
    },

    closeBtn: {
        position: 'absolute',
        right: scaler(-4),
        top: scaler(-6),
    },

    itemsWrap: {
        marginTop: scaler(6),
    },

    itemRow: {
        paddingVertical: scaler(10),
    },

    lastItem: {
        paddingBottom: scaler(6),
    },

    itemText: {
        color: mainColors.inputLabel,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular
    },

    buyText: {
        color: mainColors.greenText,
    },
    redText: {
        color: mainColors.redText
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: mainColors.inputBorder
    }
});
