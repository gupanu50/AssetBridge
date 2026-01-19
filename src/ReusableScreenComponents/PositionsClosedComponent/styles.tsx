import { StyleSheet } from 'react-native';
import scaler from '../../Utils/scaler';
import { fontFamily, mainColors } from '../../Utils/helper';

export const styles = StyleSheet.create({
  main: {
    marginHorizontal: scaler(15),
    marginVertical: scaler(10),
  },
  flexView: {
    flexDirection: 'row',
  },
  lineView: {
    borderBottomWidth: 1,
    paddingBottom: scaler(10),
    justifyContent: 'flex-end',
    width: '100%',
    borderBlockColor: mainColors.inputBorder,
  },
  selectText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(15),
    alignSelf: 'center',
    width: scaler(180),
    paddingLeft: scaler(10),
  },
  searchBox: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    height: scaler(30),
    paddingVertical: scaler(3),
    paddingHorizontal: scaler(10),
    alignItems: 'center',
    marginRight: scaler(10),
    borderColor: mainColors.inputBorder,
  },
  searchText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.descText,
    fontSize: scaler(13),
    alignSelf: 'center',
    paddingRight: scaler(10),
  },
  buttonFlexView: {
    justifyContent: 'space-between',
    marginTop: scaler(10),
    flexDirection: 'row',
  },
  buttonWidth: {
    width: '48%',
    borderRadius: 30,
    borderWidth: 1,
  },
  orderCard: {
    marginVertical: scaler(10),
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxHit: {
    marginRight: scaler(8),
  },

  cardTitle: {
    color: mainColors.white,
    fontSize: scaler(16),
    fontFamily: fontFamily.poppinsMedium,
  },
  exchangeBadge: {
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(3),
    width: scaler(140),
  },

  exchangeBadgeText: {
    color: mainColors.white,
    fontSize: scaler(11),
    fontFamily: fontFamily.poppinsMedium,
  },

  cardSubRow: {
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: mainColors.inputBorder,
    width: scaler(75),
  },

  bsText: {
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsMedium,
    marginRight: scaler(10),
  },

  dateText: {
    color: mainColors.white,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
  },
  cardGrid: {
    flexDirection: 'row',
    marginTop: scaler(12),
    justifyContent: 'space-between',
  },

  cardCol: {},

  kvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaler(10),
  },

  kLabel: {
    color: mainColors.descText,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
  },

  kValue: {
    color: mainColors.white,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsMedium,
  },

  pill: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    borderRadius: scaler(8),
    backgroundColor: mainColors.inputBorder,
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(4),
    marginLeft: scaler(5),
  },
  pillManAut: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    borderRadius: scaler(8),
    backgroundColor: mainColors.inputBorder,
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(4),
  },
  pillDirection: {
    borderRadius: scaler(10),
    borderWidth: 1,

    paddingHorizontal: scaler(10),
    paddingVertical: scaler(4),
    marginLeft: scaler(5),
  },
  pillText: {
    color: mainColors.white,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsMedium,
  },
  pillDirectionText: {
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsMedium,
  },
  itemSeperator: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
  },
  exitView: {
    borderWidth: 1,
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(5),
    borderRadius: 15,
    backgroundColor: mainColors.mainButton,
  },
  exitText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(13),
  },
  totalText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    marginLeft: scaler(55),
    fontSize: scaler(14),
  },
  totalValueText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.green,
    fontSize: scaler(14),
    paddingLeft: scaler(10),
  },
});
