import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import scaler from '../Utils/scaler'; // adjust path
import { fontFamily, mainColors } from '../Utils/helper'; // adjust path

type Props = {
    title: string;
    message: string;
    iconColor?: string;
    iconSize?: number;
};

const InfoTooltip = ({
    title,
    message,
    iconColor = mainColors.blue,
    iconSize = 16,
}: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.infoTouch}>
                <Icon
                    name="information-outline"
                    size={scaler(iconSize)}
                    color={iconColor}
                />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}>
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}>
                    <View style={styles.tooltipWrapper}>
                        <Pressable style={styles.tooltipBox}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.message}>{message}</Text>

                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={() => setVisible(false)}>
                                <Text style={styles.closeText}>Got it</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

export default InfoTooltip;

const styles = StyleSheet.create({
    infoTouch: {
        alignSelf: 'center'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.20)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaler(20),
    },
    tooltipWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    tooltipBox: {
        width: '88%',
        backgroundColor: '#1C1C1E',
        borderRadius: scaler(14),
        paddingHorizontal: scaler(14),
        paddingVertical: scaler(14),
        position: 'relative',
    },
    arrow: {
        position: 'absolute',
        top: -scaler(8),
        alignSelf: 'center',
        width: scaler(16),
        height: scaler(16),
        backgroundColor: '#1C1C1E',
        transform: [{ rotate: '45deg' }],
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderColor: mainColors.inputBorder,
    },
    title: {
        color: mainColors.white,
        fontSize: scaler(14),
        fontFamily: fontFamily.poppinsSemiBold,
        marginBottom: scaler(8),
        marginTop: scaler(4),
    },
    message: {
        color: mainColors.white,
        fontSize: scaler(12),
        lineHeight: scaler(18),
        fontFamily: fontFamily.poppinsRegular,
    },
    closeBtn: {
        alignSelf: 'flex-end',
        marginTop: scaler(12),
        backgroundColor: mainColors.mainButton,
        paddingHorizontal: scaler(12),
        paddingVertical: scaler(6),
        borderRadius: scaler(8),
    },
    closeText: {
        color: mainColors.white,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsMedium,
    },
});