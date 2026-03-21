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
import { getLastByKey, onWsMessage, registerSubscription, unregisterSubscription } from '../../Utils/ws/marketSocket';
import { WebView } from "react-native-webview";
import { computeChange, computeChange1, formatChange, formatNumber, lastPart } from '../../Utils/ws/commonWebSocketFunctions';
import useTopMoversPercentageQuery from '../HomeScreen/Hooks/useTopMoversPercentQuery';
import CommonButton from '../../ReusableComponents/commonButton';
import useCandleStickQuery from './Hooks/useCandleStickQuery';
import { buildFromToISO } from './commonFunctions';
import SkeletonBlock from '../../ReusableComponents/commonSkeletonBlock';
type Props = MainStackScreenProps<'Instrument'>;
const InstumentScreen = ({ navigation, route }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState<string>('1D');
  const paramItem = route?.params?.item;
  const paramNav = route?.params?.nav;
  const paramIndex = route?.params?.item?.index || route?.params?.index || 'options';
  console.log('ParamItemsInstrumentScreen', paramItem, route?.params, paramNav)
  const topTabListRef: any = useRef(null);
  const isMarketHours = isMarketOpenIST();
  const [activeTopTab, setActiveTopTab] = useState('Opened Positions');
  const { fromDate, toDate } = useMemo(() => buildFromToISO(selectedLabel), [selectedLabel]);
  const [symbolData, setSymbolData] = useState<any>({
    ltp: 0,
    abs: 0,
    pct: 0,
  });
  const { data: candleData, isLoading: candleLoading } = useCandleStickQuery({
    index: paramIndex,
    symbol: paramItem?.symbol.replace(' ', '') ?? route?.params?.symbol,
    exchange: paramItem?.segment ?? paramItem?.exchange ?? 'NFO',
    fromDate,
    toDate,
    segment: paramItem?.segment ?? paramItem?.exchange ?? 'NFO-OPT',
  });
  // console.log('CandleStickData', candleData);
  const candleData120 = useMemo(() => {
    return candleData?.data?.data?.candles?.map((item: any) => ({
      timestamp: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
  }, [candleData]);
  // console.log('candleData', candleData);
  const isChartLoading = candleLoading || !candleData120?.length;
  let moversDetails;
  if (paramItem?.segment) {
    const { data: moversPercentageData } = useTopMoversPercentageQuery({
      exchange: paramNav === 'movers' ? paramItem?.segment : paramItem?.exchange,
      name: paramItem?.symbol
    },
      {
        queryKey: ['/price/market/move', 'NSE', paramItem?.symbol],
        // refetchInterval: isMarketHours ? 10 : false,
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
  // console.log('RawSymbol', rawSymbol);
  const symbol = normalizeWsSymbol(rawSymbol);
  // console.log('Symbol', symbol);
  const [live, setLive] = useState(() => {
    const payload =
      getLastByKey(`INDICES:${symbol}`) ||
      getLastByKey(symbol); // snapshot cache key
    const { ltp, abs, pct } = computeChange(payload);
    return { ltp, abs, pct };
  });
  const symbolNormalized = normalizeWsSymbol(symbol);
  useEffect(() => {
    if (!symbol) return;

    // WebSocket Subscription to the Symbol
    const wsPayload: any = {
      type: 'subscribe',
      data: [
        {
          segment: 'NSE',
          subscription_type: 'contract',
          symbols: [symbolNormalized],
        },
      ],
    };
    registerSubscription('instrumentScreen', wsPayload);

    // Cleanup: Unsubscribe when symbol changes or screen unmounts
    return () => unregisterSubscription('instrumentScreen');
  }, [symbolNormalized]);

  // WebSocket message handler
  useEffect(() => {
    const off = onWsMessage((msg) => {
      if (msg?.type !== "snapshot" && msg?.type !== "update") return;
      if (!msg?.data || typeof msg.data !== "object") return;

      let payload: any;
      if (msg.type === "snapshot") {
        payload = msg.data?.[symbolNormalized];
      } else {
        for (const [key, value] of Object.entries(msg.data)) {
          if (lastPart(key) === symbolNormalized) {
            payload = value;
            break;
          }
        }
      }

      if (!payload) return;

      if (paramNav === 'movers') {
        const { ltp, abs, pct } = computeChange1(payload, paramItem?.previous_close);
        setLive((prev) => (prev.ltp !== ltp || prev.abs !== abs || prev.pct !== pct ? { ltp, abs, pct } : prev));
        setSymbolData({ ltp, abs, pct });
      } else {
        const { ltp, abs, pct } = computeChange(payload);
        setLive((prev) => (prev.ltp !== ltp || prev.abs !== abs || prev.pct !== pct ? { ltp, abs, pct } : prev));
        setSymbolData({ ltp, abs, pct });
      }
    });

    return () => off();
  }, [symbolNormalized]);

  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Opened Positions' },
      { id: 't2', label: 'Closed Positions' },
      { id: 't3', label: 'Orders' },
    ],
    [],
  );
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
    const fallbackParamItem = {
      symbol: route?.params?.symbol ?? symbolNormalized,
      segment:
        route?.params?.segment ??
        route?.params?.exchange ??
        (symbolNormalized.includes('CE') || symbolNormalized.includes('PE')
          ? 'NFO-OPT'
          : 'NSE'),
      exchange:
        route?.params?.exchange ??
        route?.params?.segment ??
        (symbolNormalized.includes('CE') || symbolNormalized.includes('PE')
          ? 'NFO-OPT'
          : 'NSE'),
      current_price:
        route?.params?.ltp ??
        symbolData?.ltp ??
        live?.ltp ??
        0,
      absolute_change:
        route?.params?.abs ??
        symbolData?.abs ??
        live?.abs ??
        0,
      percentage_change:
        route?.params?.pct ??
        symbolData?.pct ??
        live?.pct ??
        0,
      index: route?.params?.index,
    };
    const routeParamsData = {
      paramItem: paramItem ?? fallbackParamItem,
      nav: paramNav || '',
      buynav: nav,
      isOptionChainFlow: !!(symbolNormalized.includes('CE') || symbolNormalized.includes('PE')),
    }
    navigation.navigate('BuySellOrder', { buySelldata: routeParamsData })
  }
  const getInitials = (name?: string) => {
    const n = (name || '').trim();
    if (!n) return '?';

    const parts = n.split(/\s+/).filter(Boolean);

    // If multiple words => first char of first + first char of last
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    // Single word => first 2 chars
    const word = parts[0];
    return word.slice(0, 2).toUpperCase();
  };
  return (
    <View style={styles.conatiner}>
      <CommonBackHeader navigation={navigation} />
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.flexView}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoInitials}>{getInitials(paramItem?.symbol ?? symbolNormalized)}</Text>
            </View>
            <View style={[styles.innerFlexView, styles.onlyWidth]}>
              <Text style={styles.headingText}>{paramItem?.symbol ?? symbolNormalized}</Text>
              <View style={styles.flexView}>
                <Text style={styles.subHeadingText}>{paramItem?.symbol ?? symbolNormalized}</Text>
                <Text style={[styles.subHeadingText, styles.innerFlexView]}>
                  {paramItem?.segment ?? 'NSE'}
                </Text>
                {/* <View style={styles.innerFlexView1}>
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
                </View> */}
              </View>
            </View>
            {paramItem?.segment ? null : (symbolNormalized.includes('CE') || symbolNormalized.includes('PE')) ? null :
              paramItem?.symbol === "SENSEX" ? null :
                < IconButton
                  onPress={() => navigation.navigate('OptionsChain', { segment: paramItem?.segment ? paramItem?.segment : paramItem?.exchange, symbol: paramItem?.symbol })}
                  vectorType="MaterialCommunityIcons"
                  size={scaler(20)}
                  name="link-variant"
                  backgroundColor={mainColors.black}
                  color={mainColors.white}
                />}
          </View>
          <View style={[styles.flexView, styles.onlyMarginVertical]}>
            <View>
              {isMarketHours ?
                <Text style={styles.amountHeading}>{'\u20B9'} {paramItem?.segment ? symbolData.ltp : formatNumber(live.ltp, 2)}</Text> :
                <Text style={styles.amountHeading}>{'\u20B9'} {paramItem?.segment ? moversDetails?.current_price : formatNumber(live.ltp, 2)}</Text>}
              {(paramItem?.segment && isMarketHours) ?
                <Text style={[styles.amountPosLosHeading, { color: moversDetails?.absolute_change > 0 ? mainColors.greenText : mainColors.redText }]}>
                  {symbolData.abs.toFixed(3)}({symbolData.pct.toFixed(2)}%) <Text style={styles.innerText}>1D</Text>
                </Text> :
                (paramItem?.segment && !isMarketHours) ?
                  <Text style={[styles.amountPosLosHeading, { color: moversDetails?.absolute_change > 0 ? mainColors.greenText : mainColors.redText }]}>
                    {moversDetails?.absolute_change}({moversDetails?.percentage_change}%) <Text style={styles.innerText}>1D</Text>
                  </Text> :
                  <Text style={[styles.amountPosLosHeading, { color: formatChange(live.abs, live.pct).includes('-') ? mainColors.redText : mainColors.greenText }]}>
                    {formatChange(live.abs, live.pct)} <Text style={styles.innerText}>1D</Text>
                  </Text>
              }
            </View>
            {/* <View style={styles.eCommerceView}>
              <Text style={[styles.subHeadingText, styles.onlyFontSize]}>
                E-Commerce/App Based
              </Text>
            </View> */}
          </View>
          <View style={styles.chartView}>
            {isChartLoading ? (
              <View style={styles.chartSkeletonWrap}>
                <SkeletonBlock width={'100%'} height={scaler(230)} radius={12} />

                <View style={styles.chartSkeletonBottomLabels}>
                  <SkeletonBlock width={scaler(30)} height={scaler(12)} radius={6} />
                  <SkeletonBlock width={scaler(30)} height={scaler(12)} radius={6} />
                  <SkeletonBlock width={scaler(30)} height={scaler(12)} radius={6} />
                  <SkeletonBlock width={scaler(30)} height={scaler(12)} radius={6} />
                  <SkeletonBlock width={scaler(30)} height={scaler(12)} radius={6} />
                </View>
              </View>
            ) : (<CandlestickChart.Provider data={candleData120}>
              <CandlestickChart width={W} height={scaler(230)}>
                <CandlestickChart.Candles />
                <CandlestickChart.Crosshair />
              </CandlestickChart>
            </CandlestickChart.Provider>)}

          </View>
          {!isChartLoading ? (
            <View style={styles.touchView}>
              <TouchableOpacity
                style={styles.chartExpandView}
                onPress={() => navigation.navigate('TradingView', { symbol: paramItem?.symbol ?? symbolNormalized })}
              >
                <Image
                  source={Images.expandScreen}
                  resizeMode="contain"
                  style={styles.candle}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {!isChartLoading ? <>
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
          </> : null}
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
      {(paramItem?.segment || symbolNormalized.includes('CE') || symbolNormalized.includes('PE')) ? <View style={styles.buttonFlexView}>
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
      </View> : null}
    </View>
  );
};

export default InstumentScreen;
