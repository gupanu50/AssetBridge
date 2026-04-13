import { StyleSheet } from 'react-native';
import scaler from '../../Utils/scaler';
import { fontFamily, mainColors } from '../../Utils/helper';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImg: {
        height: '100%',
        width: '100%',
    },
    logoImg: {
        height: '100%',
        width: '100%',
    },
    logoView: {
        alignSelf: 'flex-start',
        height: scaler(160),
        width: scaler(200),
        marginHorizontal: scaler(15),
        paddingLeft: scaler(20),
    },
    main: {
        marginHorizontal: scaler(12),
        paddingHorizontal: scaler(15),
        paddingVertical: scaler(15),
        borderRadius: 25,
        height: scaler(500),
        elevation: 15,
        shadowColor: mainColors.black,
        shadowOpacity: 0.7,
        backgroundColor: mainColors.black,
    },
    headingText: {
        fontFamily: fontFamily.poppinsSemiBold,
        color: mainColors.headingTextColor,
        fontSize: scaler(20),
    },
    subHeadingText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.headingTextColor,
        fontSize: scaler(14),
        marginTop: scaler(5),
    },
    otpContainerStyle: {
        height: scaler(50),
        width: scaler(50),
    },
    focusedContainerStyle: {
        borderColor: mainColors.mainButton,
    },
    wrongContainerStyle: {
        borderColor: mainColors.redText,
    },
    pinCodeStyle: {
        color: mainColors.white,
    },
    flexVieW: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // paddingHorizontal: scaler(5),
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.white,
        fontSize: scaler(12),
    },
    btnStyle: {
        marginLeft: scaler(30),
    },
    loginStyle: {
        marginTop: scaler(15),
    },
    errorText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.redText,
        fontSize: scaler(11),
        marginTop: scaler(10)
    },
    signUpText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(14),
        marginVertical: scaler(25),
        color: mainColors.mainButton,
        alignSelf: 'center',
    },
    loginView: {

    },
    resetView: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
