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
    marginHorizontal: scaler(10),
    height: scaler(160),
    width: scaler(200),
    paddingLeft: scaler(20),
  },
  headingText: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.headingTextColor,
    fontSize: scaler(20),
    marginVertical: scaler(8),
    paddingLeft: scaler(20),
  },
  mainView: {
    marginHorizontal: scaler(10),
  },
  descText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(14),
    color: mainColors.descText,
    paddingLeft: scaler(20),
  },
  renderBoxView: {
    marginRight: scaler(5),
    height: scaler(250),
    paddingTop: scaler(20),
    paddingHorizontal: scaler(20),
    paddingRight: scaler(15),
    paddingLeft: scaler(25),
    width: scaler(340),
  },
  shadowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black shadow color with some opacity
    borderRadius: scaler(10), // Optional, to round the corners of the shadow
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scaler(200)
  },
  innerFlexView: {},
  img: {
    marginTop: scaler(50),
    height: scaler(110),
    width: scaler(110),
  },
  swiperCardFirstText: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.white,
    fontSize: scaler(25),
  },
  swiperCardFirstText1: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.inputLabel,
    marginTop: scaler(10),
    fontSize: scaler(16),
  },
  swiperCardFirstText2: {
    fontFamily: fontFamily.poppinsMedium,
    marginTop: scaler(5),
    color: mainColors.onboardFromYeserdayPositive,
    fontSize: scaler(12),
  },
  dotPagination: {
    left: 0,
    top: scaler(475),
    justifyContent: 'flex-start',
  },
  dotPaginationStyle: {
    height: scaler(8),
    width: scaler(25),
  },
  headingText1: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.headingTextColor,
    fontSize: scaler(16),
    marginVertical: scaler(5),
    paddingLeft: scaler(20),
  },
  heightView: {
    height: scaler(35),
  },
  skipLogin: {
    position: 'absolute',
    marginRight: scaler(15),
    top: scaler(625),
    alignSelf: 'flex-end',
  },
  loginBtn: {
    width: scaler(115),
    height: scaler(45),
    borderRadius: scaler(10),
  },
});