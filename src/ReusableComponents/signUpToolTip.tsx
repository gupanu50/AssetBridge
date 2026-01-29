import React, { useMemo, useRef, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions,
} from 'react-native';
import IconButton from './iconButton';
import scaler from '../Utils/scaler';
import { fontFamily, mainColors } from '../Utils/helper';

type AnchorRect = { x: number; y: number; width: number; height: number };

const TOOLTIP_WIDTH = scaler(328);
const TOOLTIP_GAP = scaler(6);

const PasswordInfoTooltip = () => {
    const infoRef = useRef<View>(null);
    const [visible, setVisible] = useState(false);
    const [anchor, setAnchor] = useState<AnchorRect | null>(null);

    const openTooltip = () => {
        if (!infoRef.current) return;

        infoRef.current.measureInWindow((x, y, width, height) => {
            setAnchor({ x, y, width, height });
            setVisible(true);
        });
    };

    const close = () => {
        setVisible(false);
    }


    const position = useMemo(() => {
        const { width: SW, height: SH } = Dimensions.get('window');

        if (!anchor) {
            return { left: 0, top: 0 };
        }

        let left = anchor.x + anchor.width / 2 - TOOLTIP_WIDTH / 2;
        let top = anchor.y + anchor.height + TOOLTIP_GAP;

        // prevent overflow
        left = Math.max(scaler(10), Math.min(left, SW - TOOLTIP_WIDTH - scaler(10)));

        // if bottom overflow → open above
        if (top + scaler(170) > SH) {
            top = anchor.y - scaler(170);
        }

        return { left, top };
    }, [anchor]);

    return (
        <>
            {/* Info icon */}
            <View ref={infoRef} collapsable={false}>
                <TouchableOpacity onPress={() => openTooltip()}>
                    <IconButton
                        name="information-outline"
                        onPress={() => openTooltip()}
                        vectorType="MaterialCommunityIcons"
                        size={scaler(15)}
                        color={mainColors.blue}
                    />
                </TouchableOpacity>
            </View>

            {/* Tooltip */}
            <Modal transparent visible={visible} animationType="slide">
                <TouchableWithoutFeedback onPress={() => close()}>
                    <View style={styles.backdrop}>
                        <TouchableWithoutFeedback onPress={() => close()}>
                            <View style={[styles.tooltipBox, position]}>
                                {/* Arrow */}
                                <View style={styles.arrow} />

                                {/* Content */}
                                <Text style={styles.text}>• Between 8–15 characters</Text>
                                <Text style={styles.text}>
                                    • At least one upper and one lower{'\n'}  case letter
                                </Text>
                                <Text style={styles.text}>• At least one number</Text>
                                <Text style={styles.text}>
                                    • At least one special character:{'\n'}  !@#$%^&*()
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

export default PasswordInfoTooltip;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
    },

    tooltipBox: {
        position: 'absolute',
        width: TOOLTIP_WIDTH,
        backgroundColor: mainColors.mainButton, // exact figma blue
        borderRadius: scaler(10),
        padding: scaler(14),
    },

    text: {
        color: mainColors.white,
        fontSize: scaler(14),
        fontFamily: fontFamily.poppinsRegular,
        lineHeight: scaler(18),
        marginBottom: scaler(4),
    },

    // triangle arrow
    arrow: {
        position: 'absolute',
        top: scaler(-8),
        left: TOOLTIP_WIDTH / 1.07 - scaler(8),
        width: 0,
        height: 0,
        borderLeftWidth: scaler(8),
        borderRightWidth: scaler(8),
        borderBottomWidth: scaler(8),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: mainColors.mainButton,
    },
});
