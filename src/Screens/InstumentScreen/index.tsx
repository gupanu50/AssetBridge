import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { isMarketOpenIST, mainColors } from '../../Utils/helper';
import CommonBackHeader from '../../ReusableComponents/commonBackHeader';
import { Images } from '../../Assets';
import scaler from '../../Utils/scaler';
import { Text } from 'react-native-gesture-handler';
import IconButton from '../../ReusableComponents/iconButton';
import { LabelItem, TopTab } from './type';
import { styles } from './styles';
import OrderComponent from '../../ReusableScreenComponents/OrdersComponent';
import PositionsOpenComponent from '../../ReusableScreenComponents/PositionsOpenComponent';
import PositionsClosedComponent from '../../ReusableScreenComponents/PositionsClosedComponent';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { CandlestickChart } from "react-native-wagmi-charts";
import { getLastByKey, onWsMessage } from '../../Utils/ws/marketSocket';
import { WebView } from "react-native-webview";
import { computeChange, formatChange, formatNumber, lastPart } from '../../Utils/ws/commonWebSocketFunctions';
import useTopMoversPercentageQuery from '../HomeScreen/Hooks/useTopMoversPercentQuery';
import CommonButton from '../../ReusableComponents/commonButton';
import useCandleStickQuery from './Hooks/useCandleStickQuery';
import { buildFromToISO } from './commonFunctions';
type Props = MainStackScreenProps<'Instrument'>;
const InstumentScreen = ({ navigation, route }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState<string>('1D');
  const paramItem = route?.params?.item;
  const paramNav = route?.params?.nav;
  console.log('ParamItemsInstrumentScreen', paramItem, route?.params)
  const topTabListRef: any = useRef(null);
  const isMarketHours = isMarketOpenIST();
  const [activeTopTab, setActiveTopTab] = useState('Opened Positions');
  const { fromDate, toDate } = useMemo(() => buildFromToISO(selectedLabel), [selectedLabel]);
  const { data: candleData } = useCandleStickQuery({
    symbol: paramItem?.symbol.replace(' ', ''),
    exchange: paramItem?.segment ?? paramItem?.exchange,
    fromDate,
    toDate,
    segment: paramItem?.segment ?? paramItem?.exchange,
  });
  console.log('CandleStickData', candleData);
  const candleData120 = useMemo(() => {
    return candleData?.data?.data?.candles?.map((item: any) => ({
      timestamp: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
  }, [candleData]);
  let moversDetails;
  if (paramItem?.segment) {
    const { data: moversPercentageData } = useTopMoversPercentageQuery({
      exchange: paramNav === 'movers' ? paramItem?.segment : paramItem?.exchange,
      name: paramItem?.symbol
    },
      {
        queryKey: ['/price/market/move', 'NSE', paramItem?.symbol],
        refetchInterval: isMarketHours ? 10 : false,
      }
    )
    const moverPercentageDataDetails = moversPercentageData?.data?.data
    moversDetails = React.useMemo(() => {
      return moverPercentageDataDetails
    }, [moverPercentageDataDetails]);
  }
  const W = Dimensions.get("window").width;
  function normalizeWsSymbol(raw: any): string {
    const s = String(raw ?? "").trim().toUpperCase();

    if (s === "NIFTY 50" || s === "NIFTY50") return "NIFTY50";
    if (s === "NIFTY BANK" || s === "NIFTYBANK") return "NIFTYBANK";
    if (s === "SENSEX") return "SENSEX";

    // generic fallback: remove spaces
    return s.replace(/\s+/g, "");
  }
  const rawSymbol =
    route?.params?.symbol ??
    route?.params?.item?.wsSymbol ??
    route?.params?.item?.symbol;
  const symbol = normalizeWsSymbol(rawSymbol);

  const [live, setLive] = useState(() => {
    const payload =
      getLastByKey(`INDICES:${symbol}`) ||
      getLastByKey(symbol); // snapshot cache key
    const { ltp, abs, pct } = computeChange(payload);
    return { ltp, abs, pct };
  });

  useEffect(() => {
    if (!symbol) return;

    const off = onWsMessage((msg) => {
      if (msg?.type !== "snapshot" && msg?.type !== "update") return;
      if (!msg?.data || typeof msg.data !== "object") return;

      let payload: any;

      if (msg.type === "snapshot") {
        payload = msg.data?.[symbol]; // { NIFTY50: {...} }
      } else {
        // { "INDICES:NIFTY50": {...} }
        for (const [k, v] of Object.entries(msg.data)) {
          if (lastPart(k) === symbol) {
            payload = v;
            break;
          }
        }
      }

      // fallback: match by payload.symbol
      if (!payload) {
        for (const v of Object.values(msg.data)) {
          const sym = String((v as any)?.symbol ?? "").toUpperCase();
          if (sym === symbol) {
            payload = v;
            break;
          }
        }
      }

      if (!payload) return;

      const { ltp, abs, pct } = computeChange(payload);
      setLive((prev) =>
        prev.ltp === ltp && prev.abs === abs && prev.pct === pct
          ? prev
          : { ltp, abs, pct }
      );
    });

    return () => off();
  }, [symbol]);

  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Opened Positions' },
      { id: 't2', label: 'Closed Positions' },
      { id: 't3', label: 'Orders' },
    ],
    [],
  );
  // const onPressTopTab = (label: string, index: number) => {
  //   setActiveTopTab(label);
  //   // keep active tab visible while sliding
  //   try {
  //     topTabListRef.current?.scrollToIndex({
  //       index,
  //       animated: true,
  //       viewPosition: 0.5,
  //     });
  //   } catch (e) { }
  // };
  // -------------------- RENDERERS --------------------
  const renderTopTab = ({ item, index }: { item: TopTab; index: number }) => {
    const isActive = activeTopTab === item.label;
    return (
      <CommonTabSlider
        activeTab="Explore"
        index={index}
        label={item?.label}
        isActive={isActive}
        setIsActive={setActiveTopTab}
      />
    );
  };

  const data: LabelItem[] = [
    { label: '1D' },
    { label: '1W' },
    { label: '1M' },
    { label: '2M' },
    { label: '3M' },
    { label: '6M' },
    { label: '1Y' },
    { label: '5Y' },
    { label: '10Y' },
    { label: 'All' },
  ];
  const renderItem = ({ item }: { item: LabelItem }) => {
    const isSelected = item.label === selectedLabel;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => setSelectedLabel(item.label)}
      >
        <Text style={styles.text}>{item.label}</Text>
      </TouchableOpacity>
    );
  }
  const navBuySell = (nav: string) => {
    const routeParamsData = {
      paramItem: paramItem,
      nav: paramNav || '',
      buynav: nav
    }
    navigation.navigate('BuySellOrder', { buySelldata: routeParamsData })
  }

  return (
    <View style={styles.conatiner}>
      <CommonBackHeader navigation={navigation} />
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.flexView}>
            <Image
              source={Images.swiperLogo}
              resizeMode="contain"
              style={styles.logoImg}
            />
            <View style={[styles.innerFlexView, styles.onlyWidth]}>
              <Text style={styles.headingText}>{paramItem?.symbol}</Text>
              <View style={styles.flexView}>
                <Text style={styles.subHeadingText}>{paramItem?.symbol}</Text>
                <Text style={[styles.subHeadingText, styles.innerFlexView]}>
                  {paramItem?.segment}
                </Text>
                <View style={styles.innerFlexView1}>
                  <IconButton
                    vectorType="MaterialCommunityIcons"
                    name="chevron-up"
                    backgroundColor={mainColors.black}
                    color={mainColors.descText}
                    size={scaler(10)}
                  />
                  <IconButton
                    vectorType="MaterialCommunityIcons"
                    name="chevron-down"
                    backgroundColor={mainColors.black}
                    color={mainColors.descText}
                    size={scaler(10)}
                  />
                </View>
              </View>
            </View>
            <IconButton
              onPress={() => navigation.navigate('OptionsChain', { segment: paramItem?.segment, symbol: paramItem?.symbol })}
              vectorType="MaterialCommunityIcons"
              size={scaler(20)}
              name="link-variant"
              backgroundColor={mainColors.black}
              color={mainColors.white}
            />
          </View>
          <View style={[styles.flexView, styles.onlyMarginVertical]}>
            <View>
              <Text style={styles.amountHeading}>{'\u20B9'} {paramItem?.segment ? moversDetails?.current_price : formatNumber(live.ltp, 2)}</Text>
              {paramItem?.segment ?
                <Text style={[styles.amountPosLosHeading, { color: moversDetails?.absolute_change > 0 ? mainColors.greenText : mainColors.redText }]}>
                  {moversDetails?.absolute_change}({moversDetails?.percentage_change}%) <Text style={styles.innerText}>1D</Text>
                </Text> :
                <Text style={[styles.amountPosLosHeading, { color: formatChange(live.abs, live.pct).includes('-') ? mainColors.redText : mainColors.greenText }]}>
                  {formatChange(live.abs, live.pct)} <Text style={styles.innerText}>1D</Text>
                </Text>
              }
            </View>
            <View style={styles.eCommerceView}>
              <Text style={[styles.subHeadingText, styles.onlyFontSize]}>
                E-Commerce/App Based
              </Text>
            </View>
          </View>
          <View style={styles.chartView}>
            <CandlestickChart.Provider data={candleData120}>
              <CandlestickChart width={W} height={scaler(230)}>
                <CandlestickChart.Candles />
                <CandlestickChart.Crosshair />
              </CandlestickChart>
            </CandlestickChart.Provider>

          </View>
          <View style={styles.touchView}>
            <TouchableOpacity style={styles.chartExpandView}
              onPress={() => navigation.navigate('TradingView')}>
              <Image
                source={Images.expandScreen}
                resizeMode="contain"
                style={styles.candle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.barChartView}>
            <Image
              source={Images.smallBarGraph}
              resizeMode="contain"
              style={styles.candle}
            />
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.label}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.topTabsWrap}>
          <FlatList
            ref={topTabListRef}
            data={topTabs}
            keyExtractor={item => item.id}
            renderItem={renderTopTab}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topTabsContent}
            onScrollToIndexFailed={() => { }}
          />
        </View>
        {activeTopTab === 'Orders' && <OrderComponent />}
        {activeTopTab === 'Opened Positions' && <PositionsOpenComponent />}
        {activeTopTab === 'Closed Positions' && <PositionsClosedComponent />}
      </ScrollView>
      {true && <View style={styles.buttonFlexView}>
        <CommonButton
          label="Buy"
          backgroundColor={mainColors.black}
          onPress={() => navBuySell('buy')}
          textColor={mainColors.greenText}
          extraStyle={[styles.buttonWidth, { borderColor: mainColors.greenText }]}
        />
        <CommonButton
          label="Sell"
          backgroundColor={mainColors.black}
          onPress={() => navBuySell('sell')}
          textColor={mainColors.redText}
          extraStyle={[styles.buttonWidth, { borderColor: mainColors.redText }]}
        />
      </View>}
    </View>
  );
};

export default InstumentScreen;
