import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { onWsMessage, getLastByKey } from "../Utils/ws/marketSocket";
import { computeChange, computeChange1, lastPart, formatChange, formatNumber } from "../Utils/ws/commonWebSocketFunctions";
import { mainColors } from "../Utils/helper";
import { styles } from "../Screens/InstumentScreen/styles";

const LivePrice = ({ symbol, paramNav, paramItem, isMarketHours, moversDetails, selectedLabel }: any) => {
  // console.log('LivePricesProps', symbol, paramNav, paramItem, isMarketHours, moversDetails, selectedLabel)
  const [priceData, setPriceData] = useState({
    ltp: 0,
    abs: 0,
    pct: 0,
  });

  useEffect(() => {
    const payload =
      getLastByKey(`INDICES:${symbol}`) ||
      getLastByKey(symbol);

    if (payload) {
      const { ltp, abs, pct }: any = computeChange(payload);
      setPriceData({ ltp, abs, pct });
    }

    const off = onWsMessage((msg) => {
      if (!msg?.data) return;

      let payload: any;

      for (const [key, value] of Object.entries(msg.data)) {
        if (lastPart(key) === symbol) {
          payload = value;
          break;
        }
      }

      if (!payload) return;

      let updated;

      if (paramNav === "movers") {
        updated = computeChange1(payload, paramItem?.previous_close);
      } else {
        updated = computeChange(payload);
      }

      setPriceData((prev: any) =>
        prev.ltp !== updated.ltp ? updated : prev
      );
    });

    return () => off();
  }, [symbol]);

  // ---------------- DISPLAY LOGIC ----------------

  const ltp = isMarketHours
    ? (paramItem?.segment ? priceData.ltp : formatNumber(priceData.ltp, 2))
    : (paramItem?.segment
      ? moversDetails?.current_price
      : paramItem?.current_price ?
        paramItem?.current_price :
        paramItem?.ltp
    );

  let changeText = "";
  let changeColor = mainColors.greenText;

  if (paramItem?.segment && isMarketHours) {
    changeText = `${priceData.abs.toFixed(3)} (${priceData.pct.toFixed(2)}%)`;
    changeColor = priceData.abs > 0 ? mainColors.greenText : mainColors.redText;
  } else if (paramItem?.segment && !isMarketHours) {
    changeText = `${moversDetails?.absolute_change} (${moversDetails?.percentage_change}%)`;
    changeColor = moversDetails?.absolute_change > 0 ? mainColors.greenText : mainColors.redText;
  } else if (!paramItem?.segment && !isMarketHours) {
    changeText = `${paramItem?.percentage_change ?? paramItem?.abs.toFixed(2)}`;
    changeColor = changeText.includes('-') ? mainColors.redText : mainColors.greenText;
  } else {
    changeText = formatChange(priceData.abs, priceData.pct);
    changeColor = changeText.includes('-') ? mainColors.redText : mainColors.greenText;
  }

  return (
    <View>
      {/* PRICE */}
      <Text style={styles.amountHeading}>
        ₹ {ltp}
      </Text>

      {/* CHANGE */}
      <Text style={[styles.amountPosLosHeading, { color: changeColor }]}>
        {changeText}{" "}
        <Text style={styles.innerText}>
          {selectedLabel}
        </Text>
      </Text>
    </View>
  );
};

export default React.memo(LivePrice);