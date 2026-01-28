import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.black
    },
    main: {
        marginHorizontal: scaler(10)
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scaler(10)
    },
    headerTitle: {
        color: mainColors.white,
        fontSize: scaler(12),
        marginRight: scaler(90),
        fontFamily: fontFamily.poppinsRegular
    },
    actionPill: {
        paddingRight: scaler(15),
        paddingVertical: scaler(5),
        flexDirection: 'row',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        alignItems: 'center',
    },
    inInsRunImg: {
        height: scaler(20),
        width: scaler(20),
        marginLeft: scaler(2),
    },
    actionPillGreen: {
        marginRight: 0,
        backgroundColor: mainColors.swiperPnl,
        borderColor: 'transparent',
    },
    actionText: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(10),
        marginLeft: scaler(4),
    },
    boxView: {
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: mainColors.googleButton,
        marginTop: scaler(15),
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(10),
    },
    innerBoxView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerBoxView1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(15),
        justifyContent: 'space-between',
    },
    innerBoxView2: {
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: mainColors.googleButton,
        marginTop: scaler(15),
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgView: {
        height: scaler(30),
        width: scaler(30),
    },
    companyNameText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(12),
        color: mainColors.white,
    },
    deployedText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        color: mainColors.inputLabel,
    },
    headingView: {
        marginLeft: scaler(5),
        width: scaler(260),
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
    unrealText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
    },
    unrealValueText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.greenText,
    },
    topTabsWrap: {
        marginTop: scaler(15),
        paddingTop: scaler(5),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: mainColors.inputBorder,
    },
    topTabsContent: {
        paddingRight: scaler(10),
    },
})