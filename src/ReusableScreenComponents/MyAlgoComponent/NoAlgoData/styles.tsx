import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../../Utils/helper";
import scaler from "../../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColors.googleButton,
        marginTop: scaler(35),
        borderRadius: 15,
        marginHorizontal: scaler(15)
    },
    img: {
        height: scaler(160),
        width: scaler(130),
        alignSelf: 'center'
    },
    head: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(20),
        color: mainColors.white,
        textAlign: 'center',
    },
    descText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(14),
        color: mainColors.headingTextColor,
        alignSelf: 'center',
        marginTop: scaler(10),
        marginBottom: scaler(30)
    },
    btnView: {
        marginHorizontal: scaler(15), marginBottom: scaler(20)
    }
})