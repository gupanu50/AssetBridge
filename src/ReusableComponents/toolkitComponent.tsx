import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import IconButton from './iconButton';
import scaler from '../Utils/scaler';
import { fontFamily, mainColors } from '../Utils/helper';

const { width } = Dimensions.get('window');

const PasswordInfoTooltip = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            {/* Info icon */}
            <TouchableOpacity
                onPress={() => setVisible(!visible)}
            >
                <IconButton
                    name="information-outline"
                    vectorType="MaterialCommunityIcons"
                    size={scaler(15)}
                    color={mainColors.blue}
                />
            </TouchableOpacity>

            {visible && (
                <View style={styles.tooltipWrapper}>
                    <View style={styles.arrow} />

                    <View style={styles.tooltip}>
                        <Text style={styles.text}>• Between 8–15 characters</Text>
                        <Text style={styles.text}>
                            • At least one upper and one lower case letter
                        </Text>
                        <Text style={styles.text}>• At least one number</Text>
                        <Text style={styles.text}>
                            • At least one special character: !@#$%^&*
                        </Text>

                        {/* Close tap area */}
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.closeArea}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

export default PasswordInfoTooltip;
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 999,
    },

    tooltipWrapper: {
        position: 'absolute',
        top: scaler(22),
        right: (0),
        zIndex: 999,
        elevation: 20,
    },

    tooltip: {
        maxWidth: width * 0.78,
        backgroundColor: mainColors.mainButton,
        padding: scaler(14),
        borderRadius: scaler(10),
    },

    arrow: {
        position: 'absolute',
        top: scaler(-8),
        right: scaler(10),
        width: 0,
        height: 0,
        borderLeftWidth: scaler(8),
        borderRightWidth: scaler(8),
        borderBottomWidth: scaler(8),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: mainColors.mainButton,
    },

    text: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(13),
        color: mainColors.white,
        lineHeight: scaler(18),
        marginBottom: scaler(4),
    },

    closeArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
