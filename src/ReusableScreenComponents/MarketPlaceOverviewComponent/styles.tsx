import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    summaryCard: {
        marginTop: scaler(14),
        padding: scaler(12),
        backgroundColor: mainColors.black,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryCol: {
        width: '66%',
    },
    summaryWinLossCol: {
        flexDirection: 'row',
        width: '68%',
    },
    summaryLabel: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(12),
    },
    summaryWinLossLabel: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        alignSelf: 'center',
        marginRight: scaler(15),
        paddingTop: scaler(5),
        fontSize: scaler(12),
    },
    summaryValue: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(16),
        marginTop: scaler(4),
    },
    summaryValuePlain: {
        fontFamily: fontFamily.poppinsSemiBold,
        color: mainColors.descText,
        fontSize: scaler(14),
        marginTop: scaler(4),
    },
    summarySmallValue: {
        fontFamily: fontFamily.poppinsSemiBold,
        color: mainColors.descText,
        fontSize: scaler(14),
        marginTop: scaler(4),
    },
    winLossRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaler(10),
    },
    progressTrack: {
        height: scaler(3),
        backgroundColor: mainColors.red,
        borderRadius: 99,
        overflow: 'hidden',
        marginTop: scaler(10),
    },
    progressFill: {
        width: '65%',
        height: '100%',
        backgroundColor: mainColors.green,
    },
    summaryDivider: {
        height: 1,
        backgroundColor: mainColors.dateBg,
        marginVertical: scaler(12),
        opacity: 0.7,
    },

    sectionCard: {
        marginTop: scaler(14),
        borderTopWidth: 1,
        borderTopColor: mainColors.dateBg,
        paddingTop: scaler(14),
    },
    sectionTitle: {
        fontFamily: fontFamily.poppinsSemiBold,
        color: mainColors.white,
        fontSize: scaler(14),
    },
    bulletRow: {
        flexDirection: 'row',
        marginTop: scaler(10),
        paddingRight: scaler(5),
    },
    bulletDot: {
        color: mainColors.white,
        marginRight: scaler(10),
        fontSize: scaler(12),
        lineHeight: scaler(18),
    },
    bulletText: {
        flex: 1,
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.descText,
        fontSize: scaler(12),
        lineHeight: scaler(18),
    },
    viewMoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(10),
    },
    viewMoreText: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.mainButton,
        fontSize: scaler(11),
    },
    flexView1: { flexDirection: 'row' },
    viewMoreIconWrap: {
        marginLeft: scaler(6),
    },
})