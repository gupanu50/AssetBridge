import { Dimensions, StyleSheet } from 'react-native';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
const { height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  logoCircle: {
    height: scaler(30),
    width: scaler(30),
    borderRadius: scaler(15),
    backgroundColor: mainColors.pnlCard, // choose any existing color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInitials: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  conatiner: {
    flex: 1,
    backgroundColor: mainColors.black,
  },
  flexView: {
    flexDirection: 'row',
  },
  main: {
    marginHorizontal: scaler(15),
    marginVertical: scaler(10),
  },
  onlyFontSize: {
    fontSize: scaler(8),
  },
  logoImg: {
    height: scaler(50),
    width: scaler(50),
  },
  headingText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(12),
    color: mainColors.white,
  },
  subHeadingText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(12),
    color: mainColors.descText,
  },
  innerFlexView: {
    marginHorizontal: scaler(10),
    fontSize: scaler(8),
    alignSelf: 'center'
  },
  innerFlexView1: {
    alignSelf: 'center',
  },
  onlyWidth: {
    width: scaler(240),
  },
  amountHeading: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: scaler(18),
    color: mainColors.white,
  },
  amountPosLosHeading: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(12),
  },
  innerText: {
    color: mainColors.descText,
  },
  onlyMarginVertical: {
    marginVertical: scaler(10),
    justifyContent: 'space-between',
  },
  eCommerceView: {
    borderWidth: 1,
    borderRadius: 30,
    height: scaler(25),
    paddingHorizontal: scaler(10),
    borderColor: mainColors.inputBorder,
    justifyContent: 'center',
  },
  chartContainer: {
    height: screenHeight * 0.4,
    marginTop: scaler(20),
  },
  candle: {
    height: '100%',
    width: '100%',
  },
  chartView: {
    height: scaler(200),
  },
  barChartView: {
    height: scaler(50),
  },
  chartExpandView: {
    height: scaler(30),
  },
  touchView: {
    marginLeft: scaler(300),
    marginTop: scaler(5),
  },
  item: {
    marginRight: scaler(18),
    marginVertical: scaler(10),
  },
  text: {
    color: mainColors.white,
    fontSize: scaler(10),
    fontFamily: fontFamily.poppinsMedium,
  },
  flatExchangeText: {
    color: mainColors.white,
    fontSize: scaler(11),
    fontFamily: fontFamily.poppinsMedium,
    paddingHorizontal: scaler(10),
  },
  flatNameText: {
    color: mainColors.white,
    fontSize: scaler(14),
    fontFamily: fontFamily.poppinsRegular,
  },
  flatBSText: {
    fontSize: scaler(14),
    fontFamily: fontFamily.poppinsRegular,
  },
  selectedItem: {

    borderWidth: 1,
    borderColor: mainColors.descText,
    paddingTop: scaler(2),
    paddingHorizontal: scaler(10),
    borderRadius: 20,
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
  topTabBtn: {
    marginRight: scaler(18),
    alignItems: 'center',
    paddingTop: scaler(3),
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
  lineView: {
    borderBottomWidth: 1,
    paddingBottom: scaler(10),
    borderBlockColor: mainColors.inputBorder,
  },
  itemSeperator: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
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
  },

  exchangeBadgeText: {
    color: mainColors.white,
    fontSize: scaler(11),
    fontFamily: fontFamily.poppinsMedium,
  },

  cardSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(6),
    marginLeft: scaler(30),
  },

  bsText: {
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsMedium,
    marginRight: scaler(10),
  },

  dateText: {
    color: mainColors.descText,
    fontSize: scaler(12),
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

  pillText: {
    color: mainColors.white,
    fontSize: scaler(12),
    fontFamily: fontFamily.poppinsMedium,
  },
  buttonFlexView: {
    justifyContent: 'space-between',
    marginTop: scaler(10),
    flexDirection: 'row',
    marginHorizontal: scaler(15)
  },
  searchInput: {
    flex: 1,
    color: mainColors.white,
    fontSize: scaler(13),
    fontFamily: fontFamily.poppinsRegular,
    paddingLeft: scaler(10),
    paddingVertical: 0,
  },
  buttonWidth: {
    width: '48%',
    borderRadius: 30,
    borderWidth: 1,
    marginVertical: scaler(10)
  },
  chartSkeletonContainer: {
    width: '100%',
  },

  chartSkeletonGraph: {
    height: scaler(230),
    borderRadius: scaler(12),
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    backgroundColor: mainColors.black,
    paddingHorizontal: scaler(14),
    paddingVertical: scaler(16),
    justifyContent: 'flex-end',
  },

  chartSkeletonBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },

  chartSkeletonBottomLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(12),
    paddingHorizontal: scaler(8),
  },
  chartSkeletonWrap: {
    width: '100%',
  },
});
