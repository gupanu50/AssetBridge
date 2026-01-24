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
    topTabsWrap: {
        marginTop: scaler(15),
        paddingTop: scaler(5),
        borderBottomWidth: 1,
        borderColor: mainColors.inputBorder,
    },
    topTabsContent: {
        paddingRight: scaler(10),
    },
    sliderView: {
        width: scaler(185),
        marginRight: 0,
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaler(15),
        alignItems: 'center'
    },
    viewText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.inputLabel,
        marginRight: scaler(10)
    },
    lineView: {
        height: scaler(10),
        borderBottomWidth: 1,
        borderColor: mainColors.inputBorder
    }
})