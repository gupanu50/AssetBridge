import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import PaginationBar from "../../ReusableComponents/paginationBar";
import { s } from "./styles";
import TradeLogCard, { TradeItem } from "../../ReusableComponents/tradeLogCard";
import { OtherItem } from "./types";

type Props = {
    trades: TradeItem[];     // ✅ full array from parent
    pageSize?: number;       // optional (default 3 like screenshot)
    totalPnl?: number;
    otherData?: OtherItem;     // optional (if parent already calculates)
};

const fmtMoney = (n: number) =>
    (n ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function MarketPlaceTradesComponent({
    trades,
    pageSize = 3,
    totalPnl,
    otherData,
}: Props) {
    const [page, setPage] = useState(1);

    const totalPages = useMemo(() => {
        const count = trades?.length ?? 0;
        return Math.max(1, Math.ceil(count / pageSize));
    }, [trades, pageSize]);

    // keep page valid if trades length changes
    React.useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return (trades ?? []).slice(start, end);
    }, [trades, page, pageSize]);

    const computedTotal = useMemo(() => {
        if (typeof totalPnl === "number") return totalPnl;
        return (trades ?? []).reduce((sum, t) => sum + (Number(t?.pnl) || 0), 0);
    }, [trades, totalPnl]);

    const onPageChange = useCallback(
        (p: number) => {
            if (p < 1 || p > totalPages) return;
            setPage(p);
        },
        [totalPages]
    );

    return (
        <View style={s.wrap}>
            <FlatList
                data={pageItems}
                keyExtractor={(it) => String(it.id)}
                renderItem={({ item }) => <TradeLogCard item={item} otherData={otherData} />}
                scrollEnabled={false} // parent ScrollView already exists
                extraData={otherData}
                ListFooterComponent={
                    <View style={s.footerWrap}>
                        <PaginationBar page={page} totalPages={totalPages} onPageChange={onPageChange} />
                        <View style={s.divider} />
                        <View style={s.totalRow}>
                            <Text style={s.totalLabel}>Total</Text>
                            <Text style={s.totalValue}>{fmtMoney(computedTotal)}</Text>
                        </View>
                        <View style={s.divider} />
                    </View>
                }
                ListEmptyComponent={
                    <View style={s.empty}>
                        <Text style={s.emptyText}>No trades found</Text>
                    </View>
                }
            />
        </View>
    );
}
