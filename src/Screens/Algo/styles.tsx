import { StyleSheet } from 'react-native';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';

export const styles = StyleSheet.create({
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
  // -------------------- SLIDABLE TOP TABS --------------------
  topTabsWrap: {
    marginTop: scaler(15),
    paddingTop: scaler(5),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: mainColors.inputBorder,
  },
  topTabsContent: {
    paddingRight: scaler(10),
  },
  topTabBtn: {
    alignItems: 'center',
    paddingTop: scaler(3),
    width: scaler(170),
  },
  topTabText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
    paddingHorizontal: scaler(10),
    opacity: 0.8,
  },
  topTabTextActive: {
    opacity: 1,
    color: mainColors.blue,
  },
  topTabUnderline: {
    marginTop: scaler(6),
    height: scaler(3),
    width: '100%',
    borderRadius: 10,
    backgroundColor: mainColors.blue,
  },
  topTabUnderlineOff: {
    marginTop: scaler(6),
    height: scaler(2),
    width: '100%',
    backgroundColor: 'transparent',
  },
  sliderView: {
    width: scaler(185),
    marginRight: 0,
  },
});
