import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.black,
    },
    headingText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(13),
        color: mainColors.white
    },
    descText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(11),
        color: mainColors.white
    },
    flexView: {
        flexDirection: 'row'
    },
    flatView: {
        marginHorizontal: scaler(15),
        backgroundColor: mainColors.moversCards,
        padding: scaler(10),
        borderRadius: 15
    },
    lineSeperator: {
        borderBottomWidth: 1,
        marginVertical: scaler(10),
        borderBlockColor: mainColors.inputBorder
    }
})