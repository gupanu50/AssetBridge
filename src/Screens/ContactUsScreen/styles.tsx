import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: mainColors.black
    },
    main: {
        marginHorizontal: scaler(10)
    },
    assitText: {
        color: mainColors.white,
        marginTop: scaler(20),
        fontSize: scaler(14),
        fontFamily: fontFamily.poppinsSemiBold
    },
    anyText: {
        color: mainColors.contactAny,
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        marginTop: scaler(10)
    },
    mailText: {
        color: mainColors.mainButton,
        textDecorationLine: 'underline',
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        marginTop: scaler(10)
    },
    lineView: {
        borderBottomWidth: 1,
        borderBottomColor: mainColors.inputBorder,
        marginTop: scaler(15),
        marginBottom: scaler(8)
    },
    subjectText: {
        color: mainColors.inputLabel,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        marginTop: scaler(10),
        marginBottom: scaler(10)
    },
    messageText: {
        color: mainColors.inputLabel,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        marginTop: scaler(20),
        marginBottom: scaler(5)
    },
    messageContainerStyle: {
        height: scaler(150),
        marginBottom: scaler(130)
    }
})