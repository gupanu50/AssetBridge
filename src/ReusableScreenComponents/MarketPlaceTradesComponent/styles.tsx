import { StyleSheet } from "react-native";
import scaler from "../../Utils/scaler";
import { fontFamily, mainColors } from "../../Utils/helper";

export const s = StyleSheet.create({
    wrap: { marginTop: scaler(8) },
    footerWrap: {
        marginTop: scaler(8),
        paddingTop: scaler(8),
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: scaler(10),
        paddingTop: scaler(10),
        paddingBottom: scaler(4),
    },
    totalLabel: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(14),
    },
    divider: {
        height: 1,
        backgroundColor: "#333232",
        marginVertical: scaler(20),
    },
    totalValue: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.greenText,
        fontSize: scaler(14),
    },
    empty: { paddingVertical: scaler(25), alignItems: "center" },
    emptyText: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.descText,
        fontSize: scaler(12),
    },
})