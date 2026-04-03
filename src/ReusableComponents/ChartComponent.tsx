import React, { memo } from "react";
import { Dimensions } from "react-native";
import { CandlestickChart } from "react-native-wagmi-charts";
import scaler from "../Utils/scaler";

const W = Dimensions.get("window").width;

const ChartComponent = ({ data }: any) => {
  console.log("📊 Chart Render");

  return (
    <CandlestickChart.Provider data={data}>
      <CandlestickChart width={W} height={scaler(230)}>
        <CandlestickChart.Candles />
        <CandlestickChart.Crosshair />
      </CandlestickChart>
    </CandlestickChart.Provider>
  );
};

export default ChartComponent;