import React, { useMemo } from 'react';
import { View, Dimensions, Text } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const W = Dimensions.get('window').width;

const BAR_COLOR_UP = '#6FB353';
const BAR_COLOR_DOWN = '#CB2228';
const CHART_HEIGHT = 50;
const PADDING_H = 12;

type CandlePoint = {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
};

type Props = {
    data: CandlePoint[];
};

const VolumeChart = ({ data }: Props) => {
    const { bars, barWidth } = useMemo(() => {
        if (!data?.length) return { bars: [], barWidth: 0 };

        const availableWidth = W - PADDING_H * 2;
        const n = data.length;
        // Reserve 10% of bar width as gap between bars
        const bWidth = (availableWidth / n) * 0.9;
        const gap = (availableWidth / n) * 0.1;

        const maxVol = Math.max(...data.map(c => c.volume ?? 0));
        if (maxVol === 0) return { bars: [], barWidth: bWidth };

        const bars = data.map((candle, i) => {
            const vol = candle.volume ?? 0;
            const barH = (vol / maxVol) * CHART_HEIGHT;
            const x = PADDING_H + i * (bWidth + gap);
            const y = CHART_HEIGHT - barH;
            const isUp = candle.close >= candle.open;
            return { x, y, width: bWidth, height: barH, color: isUp ? BAR_COLOR_UP : BAR_COLOR_DOWN };
        });

        return { bars, barWidth: bWidth };
    }, [data]);
    if (!bars.length) return null;
    // console.log('DataVolumeChart', data)
    return (
        <View style={{ width: W, height: CHART_HEIGHT }}>
            <Svg width={W} height={CHART_HEIGHT}>
                {bars.map((bar, i) => (
                    <Rect
                        key={i}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        opacity={0.75}
                    />
                ))}
            </Svg>
        </View>
    );
};

export default VolumeChart;
