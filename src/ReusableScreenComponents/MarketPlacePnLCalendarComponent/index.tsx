/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";
import { Dropdown } from "react-native-element-dropdown";

type DayStatus = "none" | "profit" | "loss";

type ParentDailyPnl = {
    pnl: number;
    date: string; // "YYYY-MM-DD"
    cumulative_pnl?: number;
};

type Props = {
    dailyPnl: ParentDailyPnl[]; // ✅ from parent
    initialMonth?: number;
    initialYear?: number;
};


function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function keyForDate(y: number, m0: number, d: number) {
    return `${y}-${pad2(m0 + 1)}-${pad2(d)}`; // YYYY-MM-DD
}

function getFirstDayOfMonth(y: number, m0: number) {
    return new Date(y, m0, 1).getDay(); // 0..6
}

function getDaysInMonth(y: number, m0: number) {
    return new Date(y, m0 + 1, 0).getDate(); // ✅ handles 28/29/30/31 + leap year
}

function statusFromPnl(pnl: number): DayStatus {
    if (pnl > 0) return "profit";
    if (pnl < 0) return "loss";
    return "none";
}

function statusStyle(status: DayStatus) {
    if (status === "profit") return { bg: "#116330", text: mainColors.white };
    if (status === "loss") return { bg: "#EA4335", text: mainColors.white };
    return { bg: "#636363", text: mainColors.white };
}

// function Dropdown({
//     valueLabel,
//     options,
//     onSelect,
// }: {
//     valueLabel: string;
//     options: string[];
//     onSelect: (idx: number) => void;
// }) {
//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             <TouchableOpacity onPress={() => setOpen(true)} style={s.ddBtn} activeOpacity={0.8}>
//                 <Text style={s.ddText}>{valueLabel}</Text>
//                 <Text style={s.ddArrow}>▾</Text>
//             </TouchableOpacity>

//             <Modal visible={open} transparent animationType="fade">
//                 <Pressable style={s.modalOverlay} onPress={() => setOpen(false)}>
//                     <Pressable style={s.modalCard} onPress={() => { }}>
//                         <ScrollView showsVerticalScrollIndicator={false}>
//                             {options.map((t, idx) => (
//                                 <TouchableOpacity
//                                     key={`${t}-${idx}`}
//                                     onPress={() => {
//                                         setOpen(false);
//                                         onSelect(idx);
//                                     }}
//                                     style={s.modalItem}
//                                 >
//                                     <Text style={s.modalItemText}>{t}</Text>
//                                 </TouchableOpacity>
//                             ))}
//                         </ScrollView>
//                     </Pressable>
//                 </Pressable>
//             </Modal>
//         </>
//     );
// }

export default function MarketPlacePnlCalendarComponent({
    dailyPnl,
    initialMonth,
    initialYear,
}: Props) {
    const today = new Date();
    const MONTH_OPTIONS = [
        { label: "January", value: 0 },
        { label: "February", value: 1 },
        { label: "March", value: 2 },
        { label: "April", value: 3 },
        { label: "May", value: 4 },
        { label: "June", value: 5 },
        { label: "July", value: 6 },
        { label: "August", value: 7 },
        { label: "September", value: 8 },
        { label: "October", value: 9 },
        { label: "November", value: 10 },
        { label: "December", value: 11 },
    ];

    const YEAR_OPTIONS = Array.from({ length: 30 }, (_, i) => {
        const y = 2010 + i;
        return { label: String(y), value: y };
    });
    // ✅ If initialMonth/year not passed, try to use first item of dailyPnl as default selection
    const fallback = useMemo(() => {
        const first = dailyPnl?.find((x) => x?.date);
        if (!first?.date) return null;
        const y = Number(first.date.slice(0, 4));
        const m0 = Number(first.date.slice(5, 7)) - 1;
        if (!Number.isFinite(y) || !Number.isFinite(m0)) return null;
        return { y, m0 };
    }, [dailyPnl]);

    const [month, setMonth] = useState<number>(initialMonth ?? fallback?.m0 ?? today.getMonth());
    const [year, setYear] = useState<number>(initialYear ?? fallback?.y ?? today.getFullYear());


    /**
     * ✅ Build lookup: YYYY-MM-DD -> pnl value
     * Your data already has date as YYYY-MM-DD so direct match works.
     */
    const pnlMap = useMemo(() => {
        const m = new Map<string, number>();
        (dailyPnl ?? []).forEach((x) => {
            if (x?.date) m.set(x.date, Number(x.pnl) || 0);
        });
        return m;
    }, [dailyPnl]);

    const firstDow = useMemo(() => getFirstDayOfMonth(year, month), [year, month]);
    const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);

    const cells = useMemo(() => {
        const out: Array<{ day: number | null; dateKey?: string; status?: DayStatus }> = [];
        const totalCells = 42;

        for (let i = 0; i < totalCells; i++) {
            const dayNum = i - firstDow + 1;
            if (dayNum < 1 || dayNum > daysInMonth) {
                out.push({ day: null });
            } else {
                const dateKey = keyForDate(year, month, dayNum);
                const pnl = pnlMap.get(dateKey) ?? 0;
                out.push({ day: dayNum, dateKey, status: statusFromPnl(pnl) });
            }
        }
        return out;
    }, [firstDow, daysInMonth, year, month, pnlMap]);

    return (
        <View style={s.container}>
            {/* Month/Year dropdown row */}
            <View style={s.ddRow}>
                <View style={{ flex: 1, marginRight: scaler(10) }}>
                    <Dropdown
                        data={MONTH_OPTIONS}
                        labelField="label"
                        valueField="value"
                        value={month}
                        placeholder="Month"
                        style={s.rnDropdown}
                        containerStyle={s.rnDropdownContainer}
                        selectedTextStyle={s.rnDropdownSelectedText}
                        itemTextStyle={s.rnDropdownItemText}
                        itemContainerStyle={s.rnDropdownItemContainer}
                        activeColor={mainColors.inputBorder}
                        onChange={(item: any) => setMonth(item.value)}
                    />
                </View>

                <View style={{ width: "38%" }}>
                    <Dropdown
                        data={YEAR_OPTIONS}
                        labelField="label"
                        valueField="value"
                        value={year}
                        placeholder="Year"
                        style={s.rnDropdown}
                        containerStyle={s.rnDropdownContainer}
                        selectedTextStyle={s.rnDropdownSelectedText}
                        itemTextStyle={s.rnDropdownItemText}
                        itemContainerStyle={s.rnDropdownItemContainer}
                        activeColor={mainColors.inputBorder}
                        onChange={(item: any) => setYear(item.value)}
                    />
                </View>
            </View>

            {/* Week header */}
            <View style={s.weekRow}>
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((w) => (
                    <Text key={w} style={s.weekText}>{w}</Text>
                ))}
            </View>

            {/* Date grid */}
            <View style={s.grid}>
                {cells.map((c, idx) => {
                    if (!c.day) return <View key={`e-${idx}`} style={s.cell} />;

                    const st = statusStyle(c.status || "none");
                    return (
                        <View key={c.dateKey} style={s.cell}>
                            <View style={[s.dayPill, { backgroundColor: "transparent" }]}>
                                {/* ✅ background layer with opacity */}
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: st.bg, opacity: 0.5 }]} />

                                {/* ✅ text stays fully opaque */}
                                <Text style={[s.dayText, { color: st.text }]}>{c.day}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Legend */}
            <View style={s.legendRow}>
                <View style={s.legendItem}>
                    <View style={[s.legendDot, { backgroundColor: "#636363" }]} />
                    <Text style={s.legendText}>No Trade</Text>
                </View>
                <View style={s.legendItem}>
                    <View style={[s.legendDot, { backgroundColor: "#EA4335" }]} />
                    <Text style={s.legendText}>Lossy Trades</Text>
                </View>
                <View style={s.legendItem}>
                    <View style={[s.legendDot, { backgroundColor: "#0DB149" }]} />
                    <Text style={s.legendText}>Profitable Trades</Text>
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        marginTop: scaler(12),
        padding: scaler(12),
        borderRadius: scaler(14),
        borderWidth: 1,
        borderColor: "#202020",
        backgroundColor: mainColors.black,
    },

    ddRow: { flexDirection: "row", marginBottom: scaler(12) },
    ddBtn: {
        height: scaler(38),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: mainColors.dateBg,
        paddingHorizontal: scaler(12),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ddText: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
    },
    ddArrow: { color: mainColors.white, fontSize: scaler(14) },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        paddingHorizontal: scaler(20),
    },
    modalCard: {
        backgroundColor: "#121212",
        borderRadius: scaler(14),
        borderWidth: 1,
        borderColor: "#242424",
        maxHeight: "60%",
        overflow: "hidden",
    },
    modalItem: {
        paddingVertical: scaler(12),
        paddingHorizontal: scaler(14),
        borderBottomWidth: 1,
        borderBottomColor: "#1E1E1E",
    },
    modalItemText: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
    },

    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: scaler(4),
        marginBottom: scaler(8),
    },
    weekText: {
        width: `${100 / 7}%`,
        textAlign: "center",
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(11),
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: scaler(2),
    },
    cell: {
        width: `${100 / 7}%`,
        alignItems: "center",
        paddingVertical: scaler(6),
    },
    dayPill: {
        width: scaler(34),
        height: scaler(34),
        borderRadius: scaler(5),
        alignItems: "center",
        overflow: 'hidden',
        justifyContent: "center",
    },
    dayText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
    },

    legendRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: scaler(14),
        paddingHorizontal: scaler(6),
    },
    legendItem: { flexDirection: "row", alignItems: "center" },
    legendDot: {
        width: scaler(14),
        height: scaler(14),
        borderRadius: scaler(4),
        marginRight: scaler(8),
    },
    legendText: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
    },
    rnDropdown: {
        borderWidth: 1,
        borderColor: mainColors.dateBg,
        height: scaler(38),
        borderRadius: scaler(5),
        paddingHorizontal: scaler(12),
    },
    rnDropdownContainer: {
        borderRadius: scaler(5),
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        overflow: "hidden",
        backgroundColor: mainColors.black,
    },
    rnDropdownSelectedText: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
    },
    rnDropdownItemContainer: {
        backgroundColor: mainColors.black,
    },
    rnDropdownItemText: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(11),
    },

});
