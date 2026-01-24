import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColors.black,
        marginTop: scaler(15),
    },
    totalBalanceText: {
        color: mainColors.white,
        fontSize: scaler(14),
        fontFamily: fontFamily.poppinsSemiBold,
    },
    notificationView: {
        flexDirection: 'row',
        marginTop: scaler(20),
        backgroundColor: mainColors.warningBg,
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(10),
        borderRadius: scaler(10),
        alignItems: 'center',
    },
    warningIcon: {
        width: scaler(20),
        height: scaler(20),
        marginRight: scaler(10),
    },
    notificationText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        paddingLeft: scaler(10),
        color: mainColors.white,
    },
    ledgerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ledgerLabel: {
        color: mainColors.inputLabel,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
    },
    bottomLine: {
        height: 1,
        backgroundColor: mainColors.inputBorder,
    },
    statementContent: {
        marginTop: scaler(15),
    },
    statementRow: {
        padding: scaler(10),
        // backgroundColor: mainColors.darkCard,
        borderRadius: scaler(10),
        marginVertical: scaler(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statementDate: {
        fontFamily: 'Poppins-Regular',
        fontSize: scaler(12),
        color: mainColors.inputLabel,
    },
    statementDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statementDescription: {
        fontFamily: 'Poppins-Regular',
        fontSize: scaler(14),
        color: mainColors.white,
        marginRight: scaler(10),
    },
    statementAmount: {
        fontFamily: 'Poppins-Medium',
        fontSize: scaler(14),
        color: mainColors.mainButton,
    },
    statementBalance: {
        fontFamily: 'Poppins-Regular',
        fontSize: scaler(14),
        color: mainColors.white,
    },
    statementList: {
        paddingBottom: scaler(50),
    },
    doneText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
    },
    doneView: {
        backgroundColor: mainColors.inputBorder,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        paddingHorizontal: scaler(15),
        paddingVertical: scaler(15),
        marginTop: scaler(40)
    },
    wrap: {
        marginTop: scaler(20),
    },
    content: {
        paddingRight: scaler(10),
    },
    tabTouch: {
        marginRight: scaler(14),
    },
    tabRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(14),
        color: mainColors.white, // inactive in screenshot is light/white
    },
    tabTextActive: {
        color: mainColors.mainButton, // active blue
    },

    countPill: {
        width: scaler(25),
        height: scaler(23),
        borderRadius: 100 / 2,
        marginLeft: scaler(6),
        alignItems: 'center',
        justifyContent: 'center',
    },
    countPillActive: {
        backgroundColor: mainColors.activeDotStatement, // blue pill for active
    },
    countPillInactive: {
        backgroundColor: mainColors.inputBorder, // dark grey pill for inactive
    },
    countText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(10),
        color: mainColors.white
    },

    underline: {
        height: scaler(2),
        borderRadius: scaler(2),
        marginTop: scaler(6),
    },
    underlineActive: {
        backgroundColor: mainColors.mainButton,
        width: scaler(45), // small underline like screenshot
    },
    underlineInactive: {
        backgroundColor: 'transparent',
        width: scaler(28),
    },
    todayText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(14),
        color: mainColors.white
    },
    lastUpdatedView: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: scaler(8),
        paddingHorizontal: scaler(8),
        backgroundColor: mainColors.lastUpdatedBg
    },
    latUpdatedText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
        color: mainColors.inputLabel
    },
    closingText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.inputLabel
    },
    closingValue: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(14),
        color: mainColors.white
    },
    lineHeight: {
        height: scaler(10),
        borderBottomWidth: 1,
        borderBottomColor: mainColors.inputBorder
    },

    // Today header
    todayHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scaler(6),
    },
    updatedPill: {
        backgroundColor: mainColors.inputBorder,
        borderRadius: scaler(12),
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(5),
    },
    updatedText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
        color: mainColors.inputLabel,
    },

    // Row UI (Pledge/Unpledge)
    rowWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scaler(25),
    },
    leftIconBox: {
        height: scaler(34),
        width: scaler(34),
        borderRadius: scaler(10),
        backgroundColor: mainColors.inputBorder, // dark rounded square like figma
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftIcon: {
        height: scaler(50),
        width: scaler(50),
    },

    midWrap: {
        flex: 1,
        marginLeft: scaler(10),
    },
    rowTitle: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
    },
    rowSubTitle: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        color: mainColors.descText,
        marginTop: scaler(3),
        lineHeight: scaler(14),
    },

    rightWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowAmount: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(14),
    },
    amountDebit: {
        color: mainColors.redText, // make sure you have this in mainColors
    },
    amountCredit: {
        color: mainColors.greenText,
    },

    itemDivider: {
        height: 1,
        backgroundColor: mainColors.inputBorder,
    },
})