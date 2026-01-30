import { StyleSheet } from 'react-native';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';

export const styles = StyleSheet.create({
  kebabTouch: {
    paddingLeft: scaler(6),
    paddingVertical: scaler(4),
    alignSelf: 'center',
  },
  searchLogo: {
    height: scaler(15),
    width: scaler(15),
    alignSelf: 'flex-start',
    paddingHorizontal: scaler(14),
    tintColor: mainColors.white
  },
  container: {
    flex: 1,
    backgroundColor: mainColors.black,
  },
  mainView: {
    marginHorizontal: scaler(10),
  },
  flexMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(10),
  },
  innerBoxView: {
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(10),
    borderRadius: 10,
    borderColor: mainColors.inputBorder,
    borderWidth: 1,
    width: '48%',
  },
  textNifty: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  textNiftyValue: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(10),
  },
  topTabsWrap: {
    marginTop: scaler(15),
    paddingTop: scaler(5),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: mainColors.lineColor,
  },
  topTabsContent: {
    paddingRight: scaler(10),
  },
  searchView: {
    justifyContent: 'center'
  },
  flexView: {
    flexDirection: 'row',
  },
  settingsImg: {
    height: scaler(20),
    width: scaler(20),
    marginTop: scaler(15),
    alignSelf: 'center',
    marginLeft: scaler(10),
  },
  settingsTouch: {
    justifyContent: 'center'
  },
  watchListWrap: {
    height: '75%',
    marginTop: scaler(10),
    borderTopWidth: 1,
  },
  watchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaler(12),
  },
  watchLeft: {
    flex: 1,
    paddingRight: scaler(10),
  },
  watchName: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  watchExch: {
    marginTop: scaler(2),
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.headingTextColor,
    fontSize: scaler(10),
  },
  watchRight: {
    alignItems: 'flex-end',
  },
  watchPrice: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(12),
  },
  watchChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(2),
  },
  watchChange: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(10),
  },
  watchArrow: {
    marginLeft: scaler(6),
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(10),
  },
  watchSeparator: {
    height: 0.5,
    backgroundColor: mainColors.lineColor,
  },
  watchArrowImg: {
    height: scaler(7),
    width: scaler(7),
    marginLeft: scaler(6),
  },
});
