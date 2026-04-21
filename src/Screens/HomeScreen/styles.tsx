import { StyleSheet } from 'react-native';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';

export const styles = StyleSheet.create({
  // -------------------- YOUR EXISTING STYLES (UNCHANGED) --------------------
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
    paddingHorizontal: scaler(20),
    paddingVertical: scaler(10),
    borderRadius: 10,
    borderColor: mainColors.inputBorder,
    borderWidth: 1,
    marginRight: scaler(10)
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
    borderColor: mainColors.lineColor,
  },
  topTabsContent: {
    paddingRight: scaler(10),
  },
  topTabBtn: {
    marginRight: scaler(18),
    alignItems: 'center',
    paddingTop: scaler(3),
    // paddingBottom: scaler(6),
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
  renderText: {
    color: mainColors.orangeChart,
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(12),
    marginLeft: scaler(10)
  },
  bannerView: {
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(10),
    marginHorizontal: scaler(10),
    marginVertical: scaler(10),
    borderRadius: 15,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: mainColors.orangeChart
  }
});
