import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { mainColors } from '../../Utils/helper';
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
type Props = MainStackScreenProps<'Instrument'>;
const InstumentScreen = ({ navigation }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState<string>('1D');
  const topTabListRef: any = useRef(null);
  const [activeTopTab, setActiveTopTab] = useState('Opened Positions');
  const W = Dimensions.get("window").width;
  const candleData120 = [
    { timestamp: 1706706600000, open: 945.00, high: 946.80, low: 943.90, close: 946.20 },
    { timestamp: 1706706660000, open: 946.20, high: 947.10, low: 944.60, close: 945.10 },
    { timestamp: 1706706720000, open: 945.10, high: 946.00, low: 943.70, close: 944.40 },
    { timestamp: 1706706780000, open: 944.40, high: 946.30, low: 944.10, close: 945.80 },
    { timestamp: 1706706840000, open: 945.80, high: 946.40, low: 944.20, close: 944.90 },
    { timestamp: 1706706900000, open: 944.90, high: 945.60, low: 943.30, close: 944.10 },
    { timestamp: 1706706960000, open: 944.10, high: 945.90, low: 943.80, close: 945.50 },
    { timestamp: 1706707020000, open: 945.50, high: 947.40, low: 945.10, close: 947.00 },
    { timestamp: 1706707080000, open: 947.00, high: 947.90, low: 946.20, close: 946.70 },
    { timestamp: 1706707140000, open: 946.70, high: 948.10, low: 946.40, close: 947.80 },
    { timestamp: 1706707200000, open: 947.80, high: 949.00, low: 947.30, close: 948.60 },
    { timestamp: 1706707260000, open: 948.60, high: 949.20, low: 947.10, close: 947.60 },
    { timestamp: 1706707320000, open: 947.60, high: 948.20, low: 946.00, close: 946.40 },
    { timestamp: 1706707380000, open: 946.40, high: 947.40, low: 945.60, close: 946.90 },
    { timestamp: 1706707440000, open: 946.90, high: 948.30, low: 946.50, close: 947.90 },
    { timestamp: 1706707500000, open: 947.90, high: 949.10, low: 947.20, close: 948.70 },
    { timestamp: 1706707560000, open: 948.70, high: 949.60, low: 947.80, close: 948.10 },
    { timestamp: 1706707620000, open: 948.10, high: 948.90, low: 946.80, close: 947.20 },
    { timestamp: 1706707680000, open: 947.20, high: 948.20, low: 946.10, close: 947.70 },
    { timestamp: 1706707740000, open: 947.70, high: 949.40, low: 947.40, close: 949.00 },

    { timestamp: 1706707800000, open: 949.00, high: 949.80, low: 947.90, close: 948.30 },
    { timestamp: 1706707860000, open: 948.30, high: 949.10, low: 947.10, close: 947.60 },
    { timestamp: 1706707920000, open: 947.60, high: 948.20, low: 946.40, close: 947.10 },
    { timestamp: 1706707980000, open: 947.10, high: 948.70, low: 946.80, close: 948.40 },
    { timestamp: 1706708040000, open: 948.40, high: 949.00, low: 947.20, close: 947.90 },
    { timestamp: 1706708100000, open: 947.90, high: 948.60, low: 946.30, close: 946.80 },
    { timestamp: 1706708160000, open: 946.80, high: 947.90, low: 946.10, close: 947.50 },
    { timestamp: 1706708220000, open: 947.50, high: 949.10, low: 947.20, close: 948.80 },
    { timestamp: 1706708280000, open: 948.80, high: 949.50, low: 948.00, close: 948.30 },
    { timestamp: 1706708340000, open: 948.30, high: 949.60, low: 948.10, close: 949.20 },
    { timestamp: 1706708400000, open: 949.20, high: 950.60, low: 948.90, close: 950.10 },
    { timestamp: 1706708460000, open: 950.10, high: 950.90, low: 948.60, close: 949.10 },
    { timestamp: 1706708520000, open: 949.10, high: 949.70, low: 947.70, close: 948.20 },
    { timestamp: 1706708580000, open: 948.20, high: 949.30, low: 947.50, close: 948.70 },
    { timestamp: 1706708640000, open: 948.70, high: 950.20, low: 948.40, close: 949.80 },
    { timestamp: 1706708700000, open: 949.80, high: 951.20, low: 949.00, close: 950.90 },
    { timestamp: 1706708760000, open: 950.90, high: 951.70, low: 949.90, close: 950.20 },
    { timestamp: 1706708820000, open: 950.20, high: 951.10, low: 948.80, close: 949.30 },
    { timestamp: 1706708880000, open: 949.30, high: 950.20, low: 948.10, close: 949.80 },
    { timestamp: 1706708940000, open: 949.80, high: 951.50, low: 949.50, close: 951.10 },
  ];


  // const filteredData = useMemo(() => {
  //   const q = searchText.trim().toLowerCase();
  //   if (!q) return flatData;
  //   return flatData.filter(x =>
  //     `${x.name} ${x.exchange} ${x.Status} ${x.Source}`
  //       .toLowerCase()
  //       .includes(q),
  //   );
  // }, [flatData, searchText]);

  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Opened Positions' },
      { id: 't2', label: 'Closed Positions' },
      { id: 't3', label: 'Orders' },
    ],
    [],
  );
  const onPressTopTab = (label: string, index: number) => {
    setActiveTopTab(label);
    // keep active tab visible while sliding
    try {
      topTabListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    } catch (e) { }
  };
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
  };
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
              <Text style={styles.headingText}>HDFC</Text>
              <View style={styles.flexView}>
                <Text style={styles.subHeadingText}>HDFC</Text>
                <Text style={[styles.subHeadingText, styles.innerFlexView]}>
                  NSE
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
              onPress={() => navigation.navigate('OptionsChain')}
              vectorType="MaterialCommunityIcons"
              size={scaler(20)}
              name="link-variant"
              backgroundColor={mainColors.black}
              color={mainColors.white}
            />
          </View>
          <View style={[styles.flexView, styles.onlyMarginVertical]}>
            <View>
              <Text style={styles.amountHeading}>{'\u20B9'}945.00</Text>
              <Text style={styles.amountPosLosHeading}>
                20,000(10%) <Text style={styles.innerText}>1D</Text>
              </Text>
            </View>
            <View style={styles.eCommerceView}>
              <Text style={[styles.subHeadingText, styles.onlyFontSize]}>
                E-Commerce/App Based
              </Text>
            </View>
          </View>
          <View style={styles.chartView}>
            <CandlestickChart.Provider data={candleData120}>
              <CandlestickChart width={W} height={260}>
                <CandlestickChart.Candles />
                <CandlestickChart.Crosshair />
              </CandlestickChart>
            </CandlestickChart.Provider>
          </View>
          <View style={styles.touchView}>
            <TouchableOpacity style={styles.chartExpandView}>
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
        {activeTopTab === 'Orders' && <OrderComponent isShow={true} />}
        {activeTopTab === 'Opened Positions' && <PositionsOpenComponent isShow={true} nav={navigation} />}
        {activeTopTab === 'Closed Positions' && <PositionsClosedComponent isShow={true} />}
      </ScrollView>
    </View>
  );
};

export default InstumentScreen;
