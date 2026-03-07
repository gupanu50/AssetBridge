import { Dimensions, StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
export const s = StyleSheet.create({
    backdrop: {
        flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.45)',
    },

    // wrapper so we can position arrow + popover relative to screen
    popoverWrapper: {
        // flex: 1,
    },

    popover: {
        position: 'absolute',
        // right: scaler(12),
        // If you want it centered instead of right aligned, use:
        left: scaler(12), right: scaler(12),
        width: Math.min(SCREEN_W - scaler(24), scaler(380)),
        maxHeight: SCREEN_H - scaler(140),
        // maxHeight: SCREEN_H * 4,
        height: scaler(650),
        backgroundColor: mainColors.moversCards,
        borderRadius: 16,
        padding: scaler(12),
    },

    // Triangle arrow using borders
    arrow: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeftWidth: scaler(10),
        borderRightWidth: scaler(10),
        borderBottomWidth: scaler(10),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: mainColors.moversCards,
    },

    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headingText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
    },

    timeText: {
        marginLeft: scaler(10),
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.headingTextColor,
    },

    descText: {
        marginTop: scaler(6),
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(11),
        color: mainColors.white,
    },

    lineSeperator: {
        borderBottomWidth: 0.5,
        marginVertical: scaler(10),
        borderBottomColor: mainColors.descText, // your bug: you used borderBlockColor
    },
});