import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../../Utils/helper";
import scaler from "../../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scaler(16),
        paddingTop: scaler(8),
        backgroundColor: mainColors.black,
        paddingBottom: scaler(22),
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(6),
    },
    avatarWrap: {
        width: scaler(90),
        height: scaler(90),
        borderRadius: scaler(26),
        overflow: 'hidden',
        marginRight: scaler(12),
    },
    avatar: {
        width: scaler(90),
        height: scaler(90),
        borderRadius: scaler(26),
    },
    avatarDownBtn: {
        position: 'absolute',
        right: scaler(3),
        bottom: scaler(4),
        width: scaler(23),
        height: scaler(23),
        borderRadius: 100 / 2,
        backgroundColor: mainColors.appColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: scaler(2),
    },

    headerMid: {
        flex: 1,
    },
    headerId: {
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(16),
        lineHeight: scaler(18),
    },
    headerName: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(16),
        lineHeight: scaler(18),
        marginTop: scaler(2),
    },
    headerPhone: {
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(13),
        lineHeight: scaler(16),
        marginTop: scaler(2),
    },
    headerGearBtn: {
        width: scaler(50),
        height: scaler(50),
    },
    imgView: {
        height: '100%',
        width: '100%',
    },
    lineHeight: {
        borderBottomWidth: 0.6,
        height: scaler(20),
        borderColor: mainColors.inputBorder,
    },
    profileText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white,
        marginLeft: scaler(10)
    },
    addAddress: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white,
        marginTop: scaler(25),
        marginBottom: scaler(15)
    },
    inputLable: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(15),
        color: mainColors.inputLabel,
        paddingBottom: scaler(5)
    },
    inputContainer: {
        marginVertical: scaler(10),
    },
    eyeIcon: {
        alignSelf: 'center',
    },
    flexView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    forgetBtn: {
        alignContent: 'center',
        height: scaler(30),
    },
    input: {
        marginBottom: scaler(20)
    },
    saveBtn: {
        marginTop: scaler(30)
    }
})