import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.black
    },
    main: {
        marginHorizontal: scaler(15)
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(10)
    },
    srnTitle: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(16),
        color: mainColors.white,
        marginLeft: scaler(10)
    },
    boxView: {
        borderWidth: 1,
        backgroundColor: mainColors.googleButton,
        borderRadius: 15,
        marginTop: scaler(15)
    },
    amtText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white
    },
    innerBoxView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaler(15),
        paddingTop: scaler(10)
    },
    swiperViewImg: {
        height: scaler(26),
        marginLeft: scaler(10),
        width: scaler(26),
    },
    swiperUpImg: {
        height: scaler(7),
        width: scaler(7),
        marginRight: scaler(5),
    },
    innerBoxView1: {
        flexDirection: 'row',
        paddingHorizontal: scaler(15),
        alignItems: 'center',
    },
    overallText: {
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.inputLabel
    },
    overallText1: {
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.redText
    },
    todayText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.headingTextColor,
    },
    todayValueText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.greenText,
    },
    pnlView: {
        borderRadius: 10,
        backgroundColor: mainColors.pnlCard,
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(5),
    },
    belowBox: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scaler(10),
        paddingHorizontal: scaler(20),
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    topTabsWrap: {
        marginTop: scaler(15),
        paddingTop: scaler(5),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: mainColors.lineColor,
    },
    topTabsContent: {
        paddingRight: scaler(10),
    },
    img: {
        height: scaler(20),
        width: scaler(20)
    },
    analyzeText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        marginLeft: scaler(10),
        color: mainColors.mainButton,
    },
    actionPill: {
        paddingHorizontal: scaler(7),
        paddingVertical: scaler(4),
        flexDirection: 'row',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        alignItems: 'center',
    },
    actionPillGreen: {
        marginRight: 0,
        backgroundColor: mainColors.swiperPnl,
        borderColor: 'transparent',
    },
    inInsRunImg: {
        height: scaler(20),
        width: scaler(20),
        marginLeft: scaler(2),
    },
    actionText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.descText,
        fontSize: scaler(12),
        marginLeft: scaler(4),
    },
})