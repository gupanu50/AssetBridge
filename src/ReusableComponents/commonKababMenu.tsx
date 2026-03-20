import React, { useMemo } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import { KababProps } from './commonTypes';
import useDeleteItemWatchlistMutation from '../Screens/WatchListScreen/Hooks/useDeleteWatchlistItemMutation';

const CommonKababMenu = (props: KababProps) => {
    const MENU_W = scaler(90);
    // console.log('KababMenuProps', props);
    const MENU_H = scaler(190); // approx height of menu
    const GAP = scaler(2);
    const { mutate } = useDeleteItemWatchlistMutation();
    const close = () => props?.setVisible(false);
    const { left, top } = useMemo(() => {
        const { height: SH } = Dimensions.get('screen');

        if (!props.anchor) return { left: scaler(20), top: scaler(100) };

        // ✅ always below
        const l = props.anchor.x - scaler(65); // keep your simple left shift
        let t = props.anchor.y + props.anchor.height + GAP;

        // ✅ simple: if near bottom, shift a little up
        // (not above, just up enough so it fits)
        if (t + MENU_H > SH) {
            t = SH - MENU_H - scaler(70);
        }

        return { left: l, top: t };
    }, [props.anchor]);

    const onPressItemBuySell = (label: string) => {
        const routeParamsData = {
            paramItem: props.item,
            nav: '',
            buynav: label
        }
        props?.navigation.navigate('BuySellOrder', { buySelldata: routeParamsData })
        close();
    };
    const onDelete = () => {
        const id = props?.item?.id;
        if (!id) return;

        mutate(id, {
            onSuccess: () => {
                props?.refetch(); // ✅ only after success response
                close();
            },
            onError: (err) => {
                // console.log('DeleteWatchlistItemError', err);
                props?.refetch(); // ✅ only after failure response
                close();
                // you can show a toast or alert here if you want
            }
        });
    };
    return (
        <Modal visible={props.visible} transparent animationType="fade" onRequestClose={close}>
            <TouchableWithoutFeedback onPress={close}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.menuCard, { left, top, width: MENU_W }]}>
                            <TouchableOpacity style={styles.itemRow} activeOpacity={0.8} onPress={() => onPressItemBuySell('buy')}>
                                <Text style={[styles.itemText, styles.buyText]}>Buy</Text>
                            </TouchableOpacity>

                            <View style={styles.line} />

                            <TouchableOpacity style={styles.itemRow} activeOpacity={0.8} onPress={() => onPressItemBuySell('sell')}>
                                <Text style={[styles.itemText, styles.redText]}>Sell</Text>
                            </TouchableOpacity>

                            <View style={styles.line} />

                            <TouchableOpacity style={styles.itemRow} activeOpacity={0.8} onPress={() => { close(), props?.navigation.navigate('TradingView', { symbol: props?.item?.symbol || '' }) }}>
                                <Text style={styles.itemText}>Chart</Text>
                            </TouchableOpacity>

                            <View style={styles.line} />

                            <TouchableOpacity style={styles.itemRow} activeOpacity={0.8} onPress={() => onDelete()}>
                                <Text style={styles.itemText}>Delete</Text>
                            </TouchableOpacity>
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
    },
    menuCard: {
        position: 'absolute',
        // width: scaler(50),
        borderRadius: scaler(10),
        backgroundColor: '#1F2329',
        paddingVertical: scaler(8),
        paddingHorizontal: scaler(10),
    },
    itemRow: {
        paddingVertical: scaler(10),
    },
    itemText: {
        color: mainColors.inputLabel,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
    },
    buyText: {
        color: mainColors.greenText,
    },
    redText: {
        color: mainColors.redText,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: mainColors.inputBorder,
    },
});
