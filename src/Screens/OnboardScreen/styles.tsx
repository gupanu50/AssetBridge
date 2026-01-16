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
  },
  headingText: {
    fontFamily: fontFamily.poppinsExtraBold,
    color: mainColors.headingTextColor,
    fontSize: scaler(22),
    marginVertical: scaler(10),
  },
  mainView: {
    marginHorizontal: scaler(10),
  },
  descText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(14),
    color: mainColors.descText,
  },
  headingText1: {
    fontFamily: fontFamily.poppinsBold,
    color: mainColors.headingTextColor,
    fontSize: scaler(14),
    marginVertical: scaler(10),
  },
  renderBoxView: {
    marginRight: scaler(5),
    height: scaler(250),
    paddingHorizontal: scaler(15),
    width: scaler(340),
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerFlexView: {},
  img: {
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
    fontSize: scaler(14),
  },
  swiperCardFirstText2: {
    fontFamily: fontFamily.poppinsMedium,
    marginTop: scaler(5),
    color: mainColors.onboardFromYeserdayPositive,
    fontSize: scaler(12),
  },
  dotPagination: {
    left: 0,
    justifyContent: 'flex-start',
  },
  dotPaginationStyle: {
    height: scaler(8),
    width: scaler(25),
  },
  heightView: {
    height: scaler(50),
  },
  skipLogin: {
    position: 'absolute',
    marginRight: scaler(15),
    top: scaler(605),
    alignSelf: 'flex-end',
  },
  loginBtn: { width: scaler(100) },
});
