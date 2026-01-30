import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        marginTop: scaler(10)
    },
    flexView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    innerFlexView: {
        flexDirection: 'row'
    },
    mtfText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white,
        marginRight: scaler(10)
    },
    lineView: {
        borderBottomWidth: 0.6,
        borderBlockColor: mainColors.inputBorder,
        height: scaler(5)
    },
    autuText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
        marginRight: scaler(10)
    },
    noText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.descText,
        paddingHorizontal: scaler(15),
        paddingVertical: scaler(15),
        textAlign: 'center'
    }
})