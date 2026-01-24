import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: mainColors.black
    },
    main: {
        marginHorizontal: scaler(10)
    },
    sliderView: {
        width: scaler(185),
        marginRight: 0,
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
    searchView: {
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: scaler(5),
        paddingHorizontal: scaler(10),
        borderColor: mainColors.inputBorder,
        marginTop: scaler(15),
    },
    settingsImg: {
        height: scaler(20),
        width: scaler(20),
        alignSelf: 'center',
        marginLeft: scaler(10),
    },
    settingsTouch: {
        marginTop: scaler(5),
    },
    searchImg: {
        height: scaler(20),
        width: scaler(20)
    },
    searchText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        alignSelf: 'center',
        color: mainColors.transactionTime
    }
})