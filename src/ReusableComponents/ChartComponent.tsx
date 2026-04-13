import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { CandlestickChart } from "react-native-wagmi-charts";
import scaler from "../Utils/scaler";
import { fontFamily, mainColors } from "../Utils/helper";

const W = Dimensions.get("window").width;

const ChartComponent = ({ data }: any) => {
  // console.log("📊 Chart Render", data);
  return (
    <CandlestickChart.Provider data={data}>
      <CandlestickChart width={W} height={scaler(230)}>
        <CandlestickChart.Candles />
        <CandlestickChart.Crosshair />
      </CandlestickChart>
      <View style={styles.flexView}>
        <CandlestickChart.PriceText type="open" style={styles.labelText}
          format={(value: any) => {
            'worklet';
            const v = typeof value === 'object' && value !== null ? value.value ?? value.open ?? 0 : value;
            return `o: ${v}`;
          }}
        />
        <CandlestickChart.PriceText type="high" style={styles.labelText}
          format={(value: any) => {
            'worklet';
            const v = typeof value === 'object' && value !== null ? value.value ?? value.high ?? 0 : value;
            return `h: ${v}`;
          }}
        />
        <CandlestickChart.PriceText type="low" style={styles.labelText}
          format={(value: any) => {
            'worklet';
            const v = typeof value === 'object' && value !== null ? value.value ?? value.low ?? 0 : value;
            return `l: ${v}`;
          }}
        />
        <CandlestickChart.PriceText type="close" style={styles.labelText}
          format={(value: any) => {
            'worklet';
            const v = typeof value === 'object' && value !== null ? value.value ?? value.close ?? 0 : value;
            return `c: ${v}`;
          }}
        />
      </View>
    </CandlestickChart.Provider>
  );
};

export default ChartComponent;

const styles = StyleSheet.create({
  labelText: {
    color: mainColors.white,
    fontSize: scaler(10),
    fontFamily: fontFamily.poppinsSemiBold
  },
  flexView: {
    flexDirection: 'row'
  }
})