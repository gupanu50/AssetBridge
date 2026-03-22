import React from "react";
import { View, Text, StyleSheet } from "react-native";
import scaler from "../Utils/scaler";
import { fontFamily, mainColors } from "../Utils/helper";
import { OtherItem } from "../ReusableScreenComponents/MarketPlaceTradesComponent/types";
import moment from "moment";

export type TradeItem = {
    id: string | number;
    instrument: string;        // "NIFTY 20000 CE"
    status: string;            // "CLOSED" / "OPEN" / etc
    Quantity: number;
    source: string;            // "Manual" / "Automated"
    entry_time: string;         // "10:30:12" or ISO
    exit_time: string;          // "04:23:00" or ISO
    entry_price: number;
    exit_price: number;
    Direction: "LONG" | "SHORT";
    pnl: number;
};
type Props = {
    item: TradeItem;
    otherData?: OtherItem; // ✅ receive it
};

const fmtMoney = (n: number) => {
    if (n == null || Number.isNaN(n)) return "-";
    // you can change to INR formatting if you want
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const dirPillStyle = (direction: "LONG" | "SHORT") => {
    if (direction === "LONG") return { bg: "rgba(22,199,132,0.20)", text: mainColors.green };
    return { bg: "rgba(255,77,79,0.20)", text: mainColors.errorRed };
};

const statusPillStyle = (status: string) => {
    // screenshot shows grey pill
    return { bg: "#2A2A2A", text: mainColors.white };
};

const Row = ({ l1, l2, v1, v2 }: { l1: string; l2: string; v1: string; v2: string }) => {
    return (
        <View style={s.row}>
            <View style={s.col}>
                <Text style={s.label}>{l1}</Text>
                <Text style={s.value}>{v1}</Text>
            </View>

            <View style={s.colRight}>
                <Text style={[s.label, { textAlign: "right" }]}>{l2}</Text>
                <Text style={[s.value, { textAlign: "right", color: l2 === 'PnL' ? mainColors?.greenText : mainColors.white }]}>{v2}</Text>
            </View>
        </View>
    );
};

export default function TradeLogCard({ item, otherData }: Props) {
    const dir = dirPillStyle(item.Direction);
    const st = statusPillStyle(item.status);

    return (
        <View style={s.card}>
            <View style={s.header}>
                <View style={{ flex: 1 }}>
                    <Text style={s.hLabel}>Instrument</Text>
                    <Text style={s.hValue}>{otherData?.name}</Text>
                </View>

                <View style={[s.statusPill, { backgroundColor: mainColors.dateBg }]}>
                    <Text style={[s.statusText, { color: mainColors.white }]}>{moment(item.exit_time).format('DDMMMYY')}</Text>
                </View>
            </View>

            <View style={s.divider} />

            <Row
                l1="Quantity"
                v1={`${item.Quantity}`}
                l2="Entry Price"
                v2={fmtMoney(item.entry_price)}
            />

            <Row
                l1="Entry Time"
                v1={moment(item.entry_time).format('hh:mm:ss')}
                l2="Exit Price"
                v2={fmtMoney(item.exit_price)}
            />

            <Row
                l1="Exit Time"
                v1={moment(item.exit_time).format('hh:mm:ss')}
                l2="PnL"
                v2={fmtMoney(item.pnl)}
            />

            <View style={s.row}>
                <View style={s.col}>
                    <Text style={s.label}>Direction</Text>
                    <View style={[s.dirPill, { backgroundColor: dir.bg }]}>
                        <Text style={[s.dirText, { color: dir.text }]}>{item.Direction}</Text>
                    </View>
                </View>

                {/* <View style={s.colRight}>
                    <Text style={[s.label, { textAlign: "right" }]}>PnL</Text>
                    <Text style={[s.pnl, { textAlign: "right" }]}>{fmtMoney(item.pnl)}</Text>
                </View> */}
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    card: {
        backgroundColor: "#151515",
        borderRadius: scaler(14),
        padding: scaler(12),
        marginTop: scaler(12),
        borderWidth: 1,
        borderColor: "#202020",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    hLabel: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.inputLabel,
        fontSize: scaler(12),
    },
    hValue: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.white,
        fontSize: scaler(12),
        marginTop: scaler(2),
    },
    statusPill: {
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(4),
        borderRadius: scaler(20),
        marginLeft: scaler(10),
    },
    statusText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
    },
    divider: {
        height: 1,
        backgroundColor: "#333232",
        marginVertical: scaler(10),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: scaler(10),
    },
    col: {
        width: "55%",
    },
    colRight: {
        width: "45%",
        alignItems: "flex-end",
    },
    label: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.inputLabel,
        fontSize: scaler(12),
    },
    value: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(12),
        marginTop: scaler(2),
    },
    dirPill: {
        alignSelf: "flex-start",
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(4),
        borderRadius: scaler(20),
        marginTop: scaler(6),
    },
    dirText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(10),
    },
    pnl: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.greenText,
        marginTop: scaler(2),
    },
});
