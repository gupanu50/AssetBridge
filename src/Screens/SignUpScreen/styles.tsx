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
  },
  headingText: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.headingTextColor,
    fontSize: scaler(20),
  },
  main: {
    marginHorizontal: scaler(12),
    paddingHorizontal: scaler(15),
    paddingVertical: scaler(10),
    borderRadius: 25,
    elevation: 15,
    shadowColor: mainColors.black,
    shadowOpacity: 0.7,
    backgroundColor: mainColors.black,
  },
  inputLable: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(14),
    color: mainColors.inputLabel,
  },
  inputContainer: {
    marginVertical: scaler(10),
  },
  eyeIcon: {
    alignSelf: 'center',
  },
  forgetBtn: {
    alignContent: 'center',
    height: scaler(30),
  },
  buttonStyle: {
    marginVertical: scaler(10),
  },
  orText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(16),
    marginVertical: scaler(15),
    color: mainColors.inputLabel,
    alignSelf: 'center',
  },
  googleIcon: {
    height: '50%',
    width: '10%',
  },
  signUpText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(15),
    marginVertical: scaler(15),
    color: mainColors.inputLabel,
    alignSelf: 'center',
  },
  flexView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subHeadingText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.headingTextColor,
    fontSize: scaler(14),
    marginTop: scaler(5),
  },
  modalContainer: {
    height: scaler(605),
    marginLeft: scaler(25),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: scaler(300),
    padding: scaler(20),
    backgroundColor: mainColors.mainButton,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  modalText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(14),
    color: mainColors.white,
    lineHeight: scaler(22),
  },
  modalCloseBtn: {
    marginTop: scaler(15),
    backgroundColor: mainColors.white,
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(20),
    borderRadius: 5,
  },
  modalCloseText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(14),
    color: 'black',
    textAlign: 'center',
  },
  upArrowContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: scaler(318),
    right: scaler(10)
  },
});
