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
    borderBottomWidth: 0.7,
    paddingBottom: scaler(10),
    borderBlockColor: mainColors.inputBorder,
  },
  searchLogo: {
    height: scaler(15),
    width: scaler(15),
    tintColor: mainColors.white
  },
  selectText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(14),
    alignSelf: 'center',
    width: scaler(165),
    paddingLeft: scaler(10),
  },
  searchBox: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    height: scaler(30),
    width: scaler(100),
    paddingVertical: scaler(3),
    paddingHorizontal: scaler(10),
    alignItems: 'center',
    marginRight: scaler(10),
    borderColor: mainColors.inputBorder,
  },
  searchText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.descText,
    fontSize: scaler(12),
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
    fontSize: scaler(14),
    fontFamily: fontFamily.poppinsRegular,
  },
  exchangeBadge: {
    paddingHorizontal: scaler(8),
    paddingVertical: scaler(3),
    width: scaler(125),
  },

  exchangeBadgeText: {
    color: mainColors.white,
    fontSize: scaler(10),
    fontFamily: fontFamily.poppinsRegular,
  },

  cardSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(6),
    marginLeft: scaler(30),
  },

  bsText: {
    fontSize: scaler(10),
    fontFamily: fontFamily.poppinsRegular,
    marginRight: scaler(10),
  },

  dateText: {
    color: mainColors.white,
    fontSize: scaler(10),
    fontFamily: fontFamily.poppinsRegular,
  },
  cardGrid: {
    flexDirection: 'row',
    marginTop: scaler(12),
    marginLeft: scaler(30),
  },

  cardCol: {
    flex: 1,
  },

  kvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaler(10),
  },

  kLabel: {
    color: mainColors.descText,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
    width: scaler(50),
  },

  kValue: {
    color: mainColors.white,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
  },

  pill: {
    borderRadius: scaler(8),
    backgroundColor: mainColors.manualBg,
    paddingHorizontal: scaler(6),
    paddingVertical: scaler(2),
    marginLeft: scaler(5),
  },

  pillText: {
    color: mainColors.white,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
  },
  itemSeperator: {
    borderBottomWidth: 0.5,
    borderColor: mainColors.inputBorder,
  },
  searchView: {
    justifyContent: 'center'
  },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaler(15)
  },
  emptyText: {
    color: mainColors.white,
    fontSize: scaler(15),
    fontFamily: fontFamily.poppinsRegular
  }
});
