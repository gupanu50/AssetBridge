import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColors.black,
        height: scaler(570),
    },
    transactionContainer: {
        marginTop: scaler(10),
        padding: scaler(15),
        borderRadius: 10,
        marginBottom: scaler(10),
    },
    timeText: {
        color: mainColors.transactionTime,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
    },
    flexView: {
        flexDirection: 'row',
        marginTop: scaler(10),
    },
    bankLogo: {
        height: scaler(45),
        width: scaler(45),
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
        width: scaler(190),
    },
    valueText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(14),
        color: mainColors.white
    },
    successView: {
        backgroundColor: mainColors.historyCheck,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaler(5),
        paddingVertical: scaler(3),
        borderRadius: 5
    },
    failedView: {
        backgroundColor: mainColors.redBg,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaler(5),
        paddingVertical: scaler(3),
        borderRadius: 5
    },
    successText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
        justifyContent: 'center',
        marginLeft: scaler(5),
        color: mainColors.greenText
    },
    failedText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
        marginLeft: scaler(5),
        color: mainColors.redText
    },
    transactionMessageView: {
        marginTop: scaler(10),
        paddingVertical: scaler(10),
        paddingHorizontal: scaler(20),
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: mainColors.redBg,
        borderRadius: 15
    },
    transactionMessage: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        marginLeft: scaler(5),
        color: mainColors.white
    },
    listContentContainer: {
        paddingBottom: scaler(20),
    },
    lineView: {
        height: scaler(2),
        borderBottomWidth: 0.6,
        borderColor: mainColors.inputBorder
    }
})