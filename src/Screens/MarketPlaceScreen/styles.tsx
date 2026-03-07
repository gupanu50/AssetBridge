import { StyleSheet } from 'react-native';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';

export const styles = StyleSheet.create({
  logoCircle: {
    height: scaler(30),
    width: scaler(30),
    marginLeft: scaler(10),
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
  boxNameView: {
    height: scaler(40),
    flexDirection: 'row',
    marginTop: scaler(14),
    paddingVertical: scaler(10),
    borderTopWidth: 1,
    borderTopColor: mainColors.lineColor,
  },
  logoImg: {
    height: '100%',
    width: '100%',
  },
  headingText: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.white,
    fontSize: scaler(12),
    marginLeft: scaler(10),
  },
  subHeadingText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.inputLabel,
    fontSize: scaler(10),
    marginLeft: scaler(10),
  },
  imgView: {
    height: scaler(30),
    width: scaler(30),
    marginLeft: scaler(15),
  },
  lineView: {
    borderBottomWidth: 1,
    borderBlockColor: mainColors.commonCardLine,
    paddingBottom: scaler(20),
  },
  publishedView: {
    flexDirection: 'row',
  },
  headingPubText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.descText,
    fontSize: scaler(12),
  },
  subHeadingPubText: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  activatedValueView: {
    flexDirection: 'row',
  },
  activatedValueView1: {
    borderRadius: 100 / 2,
    width: scaler(18),
    height: scaler(16),
    marginHorizontal: scaler(5),
    backgroundColor: mainColors.descText,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: mainColors.inputBorder,
  },
  activatedValueText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(10),
    color: mainColors.white,
  },
  threeOptionsView: {
    flexDirection: 'row',
  },
  featureActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(12),
  },
  actionPill: {
    paddingRight: scaler(15),
    paddingVertical: scaler(5),
    flexDirection: 'row',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    alignItems: 'center',
  },
  inInsRunImg: {
    height: scaler(20),
    width: scaler(20),
    marginLeft: scaler(2),
  },
  actionPillGreen: {
    marginRight: 0,
    backgroundColor: mainColors.swiperPnl,
    borderColor: 'transparent',
  },
  actionText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.descText,
    fontSize: scaler(12),
    marginLeft: scaler(4),
  },
  flexView: {
    flexDirection: 'row',
    height: scaler(30),
    alignSelf: 'flex-end',
  },
  onlyHeight: {
    height: scaler(220),
  },
  recomText: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.white,
    fontSize: scaler(12),
    marginTop: scaler(10),
  },
  recomDateText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.headingTextColor,
    fontSize: scaler(10),
  },
  radioBox: {
    borderWidth: 1,
    borderRadius: 20,
    padding: scaler(10),
    marginTop: scaler(15),
    borderColor: mainColors.inputBorder,
  },
  brokerageText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  whatsView: {
    flexDirection: 'row',
    marginTop: scaler(10),
  },
  whatsText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.mainButton,
    fontSize: scaler(12),
    marginRight: scaler(5),
    alignSelf: 'center',
  },
  addView: {
    backgroundColor: mainColors.inputBorder,
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    borderRadius: 15,
    marginLeft: scaler(240),
    alignItems: 'center',
    paddingHorizontal: scaler(5),
    flexDirection: 'row',
  },
  addText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(10),
    color: mainColors.white,
  },
  featureStatsRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: scaler(12),
    paddingLeft: scaler(12),
    borderRadius: 10,
    paddingVertical: scaler(5),
    backgroundColor: mainColors.pnlCard,
  },
  statBox: {
    flex: 1,
    marginRight: scaler(20),
    borderRightWidth: 1,
    borderRightColor: mainColors.inputBorder,
  },
  statLabel: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.headingTextColor,
    fontSize: scaler(8),
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(4),
    height: scaler(28)
  },
  statValue: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.white,
    fontSize: scaler(12),
    marginRight: scaler(6),
  },
  statChange: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(9),
  },
  swiperPnlView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swiperUpImg: {
    height: scaler(15),
    width: scaler(15),
    marginRight: scaler(2),
  },
  resultsBasedView: {
    borderWidth: 1,
    borderRadius: 20,
    padding: scaler(10),
    marginTop: scaler(15),
    borderColor: mainColors.red,
    flexDirection: 'row',
  },
  redIconView: {
    height: scaler(30),
    width: scaler(30),
  },
  redIconText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(12),
    color: mainColors.errorRed,
  },
  btnKnow: {
    height: scaler(26),
    justifyContent: 'flex-start',
  },
  subs: {
    height: scaler(50),
    marginVertical: scaler(15),
    marginTop: scaler(25),
    overflow: 'scroll',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabsWrap: {
    marginTop: scaler(15),
    paddingTop: scaler(5),
    borderBottomWidth: 1,
    borderColor: mainColors.dateBg,
  },
  topTabsContent: {
    paddingRight: scaler(10),
  },
  summaryCard: {
    marginTop: scaler(14),
    padding: scaler(12),
    backgroundColor: mainColors.black,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCol: {
    width: '66%',
  },
  summaryWinLossCol: {
    flexDirection: 'row',
    width: '68%',
  },
  summaryLabel: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  summaryWinLossLabel: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    alignSelf: 'center',
    marginRight: scaler(15),
    paddingTop: scaler(5),
    fontSize: scaler(12),
  },
  summaryValue: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: scaler(16),
    marginTop: scaler(4),
  },
  summaryValuePlain: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.descText,
    fontSize: scaler(14),
    marginTop: scaler(4),
  },
  summarySmallValue: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.descText,
    fontSize: scaler(14),
    marginTop: scaler(4),
  },
  winLossRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(10),
  },
  progressTrack: {
    height: scaler(3),
    backgroundColor: mainColors.red,
    borderRadius: 99,
    overflow: 'hidden',
    marginTop: scaler(10),
  },
  progressFill: {
    width: '65%',
    height: '100%',
    backgroundColor: mainColors.green,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: mainColors.dateBg,
    marginVertical: scaler(12),
    opacity: 0.7,
  },

  sectionCard: {
    marginTop: scaler(14),
    borderTopWidth: 1,
    borderTopColor: mainColors.dateBg,
    paddingTop: scaler(14),
  },
  sectionTitle: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.white,
    fontSize: scaler(14),
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: scaler(10),
    paddingRight: scaler(5),
  },
  bulletDot: {
    color: mainColors.white,
    marginRight: scaler(10),
    fontSize: scaler(12),
    lineHeight: scaler(18),
  },
  bulletText: {
    flex: 1,
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.descText,
    fontSize: scaler(12),
    lineHeight: scaler(18),
  },
  viewMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(10),
  },
  viewMoreText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.mainButton,
    fontSize: scaler(11),
  },
  flexView1: { flexDirection: 'row' },
  viewMoreIconWrap: {
    marginLeft: scaler(6),
  },
  pnlDemoImg: { height: scaler(390), width: scaler(390), alignSelf: 'center' },
  tradesDemoImg: { marginTop: scaler(15), height: scaler(280), width: scaler(330), borderRadius: 15, overflow: 'hidden', alignSelf: 'center' },
  subsText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(14),
    color: mainColors.white
  },
  lineChartView: { height: scaler(200), marginTop: scaler(10) },
  lineChartView1: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  buttonsView: {
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(2),
    borderRadius: 25,
    marginRight: scaler(20),
  },
  unSubs: {
    marginTop: scaler(20)
  }
});
