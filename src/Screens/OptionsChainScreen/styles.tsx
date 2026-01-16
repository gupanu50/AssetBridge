import { StyleSheet } from 'react-native';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';

const PAD_H = scaler(14);

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: mainColors.black },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PAD_H,
    paddingTop: scaler(6),
    paddingBottom: scaler(10),
  },
  backBtn: {
    width: scaler(38),
    height: scaler(38),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaler(10),
  },
  title: {
    flex: 1,
    color: mainColors.white,
    fontSize: scaler(16),
    fontFamily: fontFamily.poppinsMedium,
    textAlign: 'left',
    marginLeft: scaler(4),
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: scaler(12),
    height: scaler(32),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
  },
  dateText: {
    color: mainColors.white,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
  },
  caret: { color: mainColors.white, fontSize: scaler(12) },

  headerRow: {
    flexDirection: 'row',
    backgroundColor: mainColors.inputBorder,
    alignItems: 'center',
    paddingHorizontal: PAD_H,
    height: scaler(30),
  },
  headerText: {
    color: mainColors.descText,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
  },
  headerLeft: { flex: 1, textAlign: 'left' },
  headerMid: { width: scaler(90), textAlign: 'center' },
  headerRight: { flex: 1, textAlign: 'right' },

  listContent: { paddingHorizontal: PAD_H, paddingBottom: scaler(16) },
  sep: { height: scaler(14) },

  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scaler(44),
  },

  cellLeft: { flex: 1 },
  cellMid: {
    width: scaler(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellRight: { flex: 1, alignItems: 'flex-end' },

  moneyText: {
    color: mainColors.white,
    fontSize: scaler(13),
    fontFamily: fontFamily.poppinsRegular,
  },
  pctText: {
    marginTop: scaler(2),
    fontSize: scaler(11),
    fontFamily: fontFamily.poppinsRegular,
  },

  strikeText: {
    color: mainColors.white,
    fontSize: scaler(13),
    fontFamily: fontFamily.poppinsRegular,
  },

  midTick: {
    marginTop: scaler(8),
    height: scaler(2),
    width: scaler(38),
    borderRadius: 999,
  },
  tickGreen: { backgroundColor: mainColors.green },
  tickRed: { backgroundColor: mainColors.red },
  tickNone: { backgroundColor: mainColors.white },

  green: { color: mainColors.green },
  red: { color: mainColors.red },

  bottomArea: {
    paddingVertical: scaler(10),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: mainColors.white,
    backgroundColor: mainColors.inputBorder,
  },
  bottomLabel: {
    color: mainColors.headingTextColor,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
  },
  bottomValue: {
    color: mainColors.white,
    fontSize: scaler(12),
    marginTop: scaler(2),
  },
});
