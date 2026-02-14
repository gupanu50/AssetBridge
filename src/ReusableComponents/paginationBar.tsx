import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import scaler from "../Utils/scaler";
import { fontFamily, mainColors } from "../Utils/helper";
import IconButton from "../ReusableComponents/iconButton"; // ✅ adjust path

type Props = {
    page: number;          // 1-based
    totalPages: number;
    onPageChange: (p: number) => void;
};

const PageBtn = ({
    label,
    active,
    onPress,
    disabled,
}: {
    label: string;
    active?: boolean;
    disabled?: boolean;
    onPress?: () => void;
}) => {
    return (
        <TouchableOpacity
            disabled={disabled || !onPress}
            onPress={onPress}
            style={[
                s.pageBtn,
                active ? s.pageBtnActive : null,
                disabled ? { opacity: 0.5 } : null,
            ]}
        >
            <Text style={[s.pageText, active ? s.pageTextActive : null]}>{label}</Text>
        </TouchableOpacity>
    );
};

const ArrowBtn = ({
    direction,
    disabled,
    onPress,
}: {
    direction: "left" | "right";
    disabled?: boolean;
    onPress?: () => void;
}) => {
    return (
        <IconButton
            vectorType="MaterialCommunityIcons"
            name={direction === "left" ? "arrow-left" : "arrow-right"}
            size={scaler(20)}
            color={mainColors.white}
            backgroundColor="transparent"
            disabled={disabled}
            onPress={onPress}
            style={[s.arrowBtn, disabled ? { opacity: 0.4 } : null]}
        />
    );
};

export default function PaginationBar({ page, totalPages, onPageChange }: Props) {
    const pages = useMemo(() => {
        if (totalPages <= 6) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const first = [1, 2, 3];
        const last = [totalPages - 1, totalPages];

        if (page >= totalPages - 2) {
            return [1, "…", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [...first, "…", ...last];
    }, [page, totalPages]);

    return (
        <View style={s.wrap}>
            <ArrowBtn
                direction="left"
                disabled={page <= 1}
                onPress={() => onPageChange(page - 1)}
            />

            {pages.map((p, idx) => {
                if (p === "…") {
                    return (
                        <Text key={`dots-${idx}`} style={s.dots}>
                            …
                        </Text>
                    );
                }
                const num = p as number;
                return (
                    <PageBtn
                        key={num}
                        label={`${num}`}
                        active={num === page}
                        onPress={() => onPageChange(num)}
                    />
                );
            })}

            <ArrowBtn
                direction="right"
                disabled={page >= totalPages}
                onPress={() => onPageChange(page + 1)}
            />
        </View>
    );
}

const s = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaler(14),
    },

    // ✅ Arrow area (no border in screenshot)
    arrowBtn: {
        width: scaler(28),
        height: scaler(28),
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: scaler(6),
    },

    pageBtn: {
        borderRadius: scaler(8),
        height: scaler(35),
        width: scaler(30),
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: scaler(4),
    },
    pageBtnActive: {
        backgroundColor: "#3C3C3C",
    },
    pageText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.inputLabel,
        fontSize: scaler(16),
    },
    pageTextActive: {
        color: mainColors.white,
    },
    dots: {
        color: mainColors.white,
        marginHorizontal: scaler(8),
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsMedium,
    },
});
