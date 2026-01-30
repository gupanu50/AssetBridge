import { StyleSheet } from 'react-native';
import scaler from '../../Utils/scaler';
import { fontFamily, mainColors } from '../../Utils/helper';

export const styles = StyleSheet.create({
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
  mainView: {
    marginHorizontal: scaler(10),
  },
  sectionTitle: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.headingTextColor,
    fontSize: scaler(14),
  },
  // -------------------- GAINERS/LOSERS SEGMENT --------------------
  moverTabsRow: {
    marginTop: scaler(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  moverSegmentBtn: {
    paddingVertical: scaler(3),
    paddingHorizontal: scaler(12),
    borderRadius: 999,
    marginRight: scaler(10),
  },
  moverSegmentBtnActive: {
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
    backgroundColor: mainColors.googleButton,
    padding: scaler(12),
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: scaler(12),
  },
  moverName: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(12),
    paddingTop: scaler(5),
  },
  moverPrice: {
    marginTop: scaler(15),
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  moverChg: {
    marginTop: scaler(4),
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(10),
  },
  viewAllCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scaler(130),
  },
  viewAllText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(12),
    opacity: 0.85,
  },
  viewAllCircle: {
    width: scaler(36),
    height: scaler(36),
    marginTop: scaler(10),
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
    fontSize: scaler(22),
  },

  // -------------------- NEWS --------------------
  newsCard: {
    marginTop: scaler(10),
    borderRadius: scaler(12),
    borderWidth: 1,
    overflow: 'hidden',
  },
  newsSeparator: {
    height: 1,
    color: mainColors.inputBorder,
  },

  // -------------------- FOOTER --------------------
  footer: {
    alignItems: 'center',
    paddingBottom: scaler(10),
  },
  footerText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.descText,
    fontSize: scaler(12),
    textAlign: 'center',
  },
  tMimg: {
    height: scaler(22),
    width: scaler(22),
    marginRight: scaler(5),
  },
  logoImg: {
    height: scaler(25),
    width: scaler(25),
    marginRight: scaler(5),
  },
  line: { alignSelf: 'center', height: scaler(30), width: scaler(80) }
});
