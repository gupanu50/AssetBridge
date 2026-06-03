import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import scaler from "../Utils/scaler";
import { mainColors } from "../Utils/helper";
import { styles } from "../ReusableScreenComponents/PositionsOpenComponent/styles";

export const SymbolWithTooltip = ({ symbol }: { symbol: string }) => {
    const textRef = React.useRef<Text>(null);

    const [visibleWidth, setVisibleWidth] = useState(0);
    const [fullTextWidth, setFullTextWidth] = useState(0);

    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({
        top: 0,
        left: 0,
    });

    const isTruncated =
        visibleWidth > 0 &&
        fullTextWidth > 0 &&
        fullTextWidth > visibleWidth + 2;

    const handlePress = () => {
        if (!isTruncated) {
            return;
        }

        textRef.current?.measureInWindow((x, y, width, height) => {
            setTooltipPosition({
                top: y + height + 4,
                left: x,
            });
            setTooltipVisible(true);
        });
    };

    return (
        <>
            <View
                style={{
                    flexShrink: 1,
                    maxWidth: "45%",
                }}
            >
                <Text
                    ref={textRef}
                    style={[
                        styles.cardTitle,
                        {
                            maxWidth: "100%",
                        },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    onLayout={event => {
                        setVisibleWidth(event.nativeEvent.layout.width);
                    }}
                    onPress={handlePress}
                >
                    {symbol}
                </Text>
            </View>

            <Text
                style={[
                    styles.cardTitle,
                    {
                        position: "absolute",
                        opacity: 0,
                        left: -9999,
                        top: -9999,
                        maxWidth: undefined,
                        flexShrink: 0,
                    },
                ]}
                numberOfLines={1}
                onLayout={event => {
                    setFullTextWidth(event.nativeEvent.layout.width);
                }}
            >
                {symbol}
            </Text>

            <Modal
                visible={tooltipVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setTooltipVisible(false)}
            >
                <Pressable
                    style={{ flex: 1 }}
                    onPress={() => setTooltipVisible(false)}
                >
                    <View
                        style={{
                            position: "absolute",
                            top: tooltipPosition.top,
                            left: tooltipPosition.left,
                            maxWidth: scaler(260),
                            backgroundColor: mainColors.black,
                            borderRadius: scaler(6),
                            paddingHorizontal: scaler(8),
                            paddingVertical: scaler(5),
                        }}
                    >
                        <Text
                            style={{
                                color: mainColors.white,
                                fontSize: scaler(11),
                            }}
                            numberOfLines={2}
                        >
                            {symbol}
                        </Text>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};