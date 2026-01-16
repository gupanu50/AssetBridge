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

  // -------------------- SECTION HEADER --------------------
  sectionHeaderRow: {
    marginTop: scaler(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(12),
    opacity: 0.9,
  },
  // -------------------- GAINERS/LOSERS SEGMENT --------------------
  moverTabsRow: {
    marginTop: scaler(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  moverSegmentBtn: {
    paddingVertical: scaler(5),
    paddingHorizontal: scaler(12),
    borderRadius: 999,
    marginRight: scaler(10),
  },
  moverSegmentBtnActive: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    backgroundColor: mainColors.mainButton,
  },
  moverSegmentBtnInActive: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    borderRadius: 20,
  },
  moverSegmentText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(10),
    opacity: 0.7,
  },
  moverSegmentTextActive: {
    opacity: 1,
  },
  indexDrop: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    borderRadius: 999,
    paddingHorizontal: scaler(12),
    paddingVertical: scaler(5),
  },
  indexDropText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(10),
    marginRight: scaler(8),
    opacity: 0.9,
  },
  indexDropArrow: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(10),
    opacity: 0.7,
  },

  // -------------------- MOVERS GRID (KEPT) --------------------
  moversGridWrap: {
    marginTop: scaler(12),
  },
  moverCard: {
    width: '48.5%',
    borderRadius: scaler(12),
    borderWidth: 1,
    backgroundColor: mainColors.moversCards,
    borderColor: mainColors.inputBorder,
    padding: scaler(12),
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: scaler(12),
  },
  moverName: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(10),
    opacity: 0.85,
  },
  moverPrice: {
    marginTop: scaler(8),
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(12),
    opacity: 0.95,
  },
  moverChg: {
    marginTop: scaler(4),
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(10),
  },
  viewAllCard: {
    justifyContent: 'space-between',
    minHeight: scaler(110),
  },
  viewAllText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(12),
    opacity: 0.85,
  },
  viewAllCircle: {
    alignSelf: 'flex-start',
    width: scaler(36),
    height: scaler(36),
    borderRadius: scaler(18),
    backgroundColor: mainColors.mainButton,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: mainColors.mainButton,
  },
  viewAllArrow: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(14),
    opacity: 0.9,
  },

  // -------------------- NEWS --------------------
  newsCard: {
    marginTop: scaler(10),
    borderRadius: scaler(12),
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: mainColors.inputBorder,
  },
  newsSeparator: {
    height: 1,
    color: mainColors.inputBorder,
  },

  // -------------------- FOOTER --------------------
  footer: {
    marginTop: scaler(16),
    alignItems: 'center',
    paddingBottom: scaler(10),
  },
  footerText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(9),
    opacity: 0.55,
    textAlign: 'center',
  },
  tMimg: {
    height: scaler(20),
    width: scaler(20),
    marginRight: scaler(5),
  },
  logoImg: {
    height: scaler(20),
    width: scaler(20),
    marginRight: scaler(5),
  },
});
