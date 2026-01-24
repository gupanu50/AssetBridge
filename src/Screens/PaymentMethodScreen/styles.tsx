import { Dimensions, StyleSheet } from "react-native"
import { fontFamily, mainColors } from "../../Utils/helper"
import scaler from "../../Utils/scaler"
const { width } = Dimensions.get('window')
export const styles = StyleSheet.create({
    conatiner: {
        height: scaler(700),
        backgroundColor: mainColors.black
    },
    main: {
        marginHorizontal: scaler(10)
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(10),
        justifyContent: 'space-between'
    },
    existingText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white
    },
    moverDayMonthSegment: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        backgroundColor: mainColors.lastUpdatedBg,
        borderRadius: 999,
        padding: scaler(4),
        width: scaler(86),
    },
    moverDayMonthSegmentBtn: {
        justifyContent: 'center',
        borderRadius: 999,
        width: scaler(60),
        alignItems: 'center'
    },
    moverDayMonthSegmentText: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(14),
        opacity: 0.7,
    },
    moverDayMonthSegmentBtnActive: {
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        backgroundColor: mainColors.mainButton,
    },
    moverDayMonthSegmentTextActive: {
        opacity: 1,
    },
    moverDaySegmentBtn: {
        borderRadius: 999,
        justifyContent: 'center',
        width: scaler(60),
        alignItems: 'center'
    },
    moverDaySegmentText: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(14),
        opacity: 0.7,
    },
    img: {
        height: '100%',
        width: '100%'
    },
    imgView: {
        height: scaler(260),
        marginRight: scaler(15),
        width: width * 0.85
    },
    lineHeight: {
        borderBottomWidth: 1,
        borderBlockColor: mainColors.inputBorder,
        height: scaler(15)
    },
    addText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white,
        marginTop: scaler(25),
        marginBottom: scaler(15)
    },
    inputContainer: {
        marginVertical: scaler(10),
    },
    inputLable: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(15),
        color: mainColors.inputLabel,
        paddingBottom: scaler(5)
    },
    eyeIcon: {
        alignSelf: 'center',
    },
    btnStyle: {
        marginTop: scaler(15),
        marginBottom: scaler(20)
    }
})