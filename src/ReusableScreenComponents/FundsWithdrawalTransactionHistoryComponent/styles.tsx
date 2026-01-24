import { StyleSheet } from "react-native";
import scaler from "../../Utils/scaler";
import { fontFamily, mainColors } from "../../Utils/helper";

export const styles = StyleSheet.create({
    timeText: {
        color: mainColors.transactionTime,
        fontSize: scaler(10),
        fontFamily: fontFamily.poppinsRegular,
        marginTop: scaler(20)
    },
    flexView: {
        flexDirection: 'row',
    },
    bankLogo: {
        height: scaler(40),
        width: scaler(40),
        marginTop: scaler(10),
    },
    nameText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(14),
        color: mainColors.white
    },
    accountText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.inputLabel
    },
    nameView: {
        justifyContent: 'center',
        marginLeft: scaler(10),
        width: scaler(190)
    },
    valueText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(14),
        color: mainColors.white
    },
    approvedView: {
        backgroundColor: mainColors.historyCheck,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaler(5),
        paddingVertical: scaler(3),
        borderRadius: 10
    },
    approvedText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
        marginLeft: scaler(5),
        color: mainColors.greenText
    },
    unusedView: {
        flexDirection: 'row',
        paddingVertical: scaler(10),
        marginTop: scaler(30),
        borderRadius: 15,
        backgroundColor: mainColors.greenBg
    },
    unUsedText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        marginLeft: scaler(5),
        color: mainColors.white
    },
    knowText: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.mainButton,
        fontSize: scaler(12)
    },
    knowView: {
        marginLeft: scaler(5),
        marginTop: scaler(5)
    },
    checkImg: {
        height: scaler(25),
        width: scaler(25),
        marginLeft: scaler(10),
    },
})