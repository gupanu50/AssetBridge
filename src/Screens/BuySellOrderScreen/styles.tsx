import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.black
    },
    main: {
        marginHorizontal: scaler(10),
    },
    flexView: {
        flexDirection: 'row',
        marginTop: scaler(5)
    },
    labelFlexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: scaler(10)
    },
    innerFlexView: {
        flexDirection: 'row',
    },
    innerFlexViewInput: {
        flexDirection: 'row',
    },
    niftyText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white
    },
    dateText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        color: mainColors.headingTextColor
    },
    niftyValueText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        marginLeft: scaler(15),
        color: mainColors.redText
    },
    niftyChangeText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        color: mainColors.headingTextColor,
    },
    niftyView: {
        width: scaler(225),
        paddingLeft: scaler(15)
    },
    topTabsWrap: {
        marginTop: scaler(15),
        paddingTop: scaler(5),
        borderBottomWidth: 1,
        borderColor: mainColors.inputBorder,
    },
    topTabsContent: {
        paddingRight: scaler(10),
    },
    resultsBasedView: {
        borderRadius: 10,
        marginTop: scaler(15),
        paddingHorizontal: scaler(12),
        paddingVertical: scaler(5),
        alignItems: 'center',
        backgroundColor: mainColors.swiperMaxDDbg,
        flexDirection: 'row',
    },
    redIconView: {
        height: scaler(30),
        justifyContent: 'center',
        width: scaler(30),
    },
    redIconText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        paddingLeft: scaler(5),
        color: mainColors.white,
    },
    noSharesText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        marginVertical: scaler(10),
        color: mainColors.inputLabel,
    },
    maxQText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        color: mainColors.headingTextColor,
    },
    img: {
        height: scaler(50),
        width: scaler(60)
    },
    plusImg: {
        height: scaler(20),
        width: scaler(20)
    },
    bannerImg: {
        height: scaler(80),
        width: '100%'
    },
    imgView: {
        flexDirection: 'row'
    },
    onlyWidth: {
        width: '100%',
        color: mainColors.white
    },
    onlyWidth1: {
        width: '70%',
    },
    inputContainerStyle: {
        height: scaler(50),
        width: scaler(170),
        // marginHorizontal: scaler(5)
    },
    inputContainerStyle1: {
        height: scaler(50),
        width: scaler(220),
        marginHorizontal: scaler(5)
    },
    limitView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: scaler(20),
        backgroundColor: mainColors.pnlCard,
    },
    limitText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
    },
    marketView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: scaler(20),
        backgroundColor: '#002238'
    },
    limitMarketView: {
        width: scaler(112),
        flexDirection: 'row',
        marginLeft: scaler(20)
    },
    lineView: {
        borderBottomWidth: 1,
        borderBottomColor: mainColors.inputBorder,
        marginTop: scaler(15),
        marginBottom: scaler(8)
    },
    sliderView: {
        width: scaler(185),
        marginRight: 0,
    },
    innerFlexValidityView: {
        flexDirection: 'row',
        marginTop: scaler(10),
        justifyContent: 'space-between',
    },
    validityText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.inputLabel,
    },
    stopLossText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        marginRight: scaler(5),
        alignSelf: 'center',
        color: mainColors.white,
    },
    lotText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        alignSelf: 'center',
        marginRight: scaler(7),
        color: mainColors.headingTextColor,
    },
    flatItem: {
        justifyContent: 'center',
        backgroundColor: mainColors.googleButton,
        alignItems: 'center',
        marginTop: scaler(10),
        borderRadius: 10,
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(5),
        marginRight: scaler(16)
    },
    flatItemText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
    },
    valueText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white,
        marginRight: scaler(5)
    },
})