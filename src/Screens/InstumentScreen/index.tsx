import {
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
const InstumentScreen = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>('1D');
  const topTabListRef: any = useRef(null);
  const [activeTopTab, setActiveTopTab] = useState('Opened Positions');

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
    } catch (e) {}
  };
  // -------------------- RENDERERS --------------------
  const renderTopTab = ({ item, index }: { item: TopTab; index: number }) => {
    const isActive = activeTopTab === item.label;
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPressTopTab(item.label, index)}
        style={styles.topTabBtn}
      >
        <Text style={[styles.topTabText, isActive && styles.topTabTextActive]}>
          {item.label}
        </Text>
        {isActive ? (
          <View style={styles.topTabUnderline} />
        ) : (
          <View style={styles.topTabUnderlineOff} />
        )}
      </TouchableOpacity>
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
      <CommonBackHeader />
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
                    size={scaler(15)}
                  />
                  <IconButton
                    vectorType="MaterialCommunityIcons"
                    name="chevron-down"
                    backgroundColor={mainColors.black}
                    color={mainColors.descText}
                    size={scaler(15)}
                  />
                </View>
              </View>
            </View>
            <IconButton
              vectorType="MaterialCommunityIcons"
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
            <Image
              source={Images.candleChart}
              resizeMode="contain"
              style={styles.candle}
            />
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
            onScrollToIndexFailed={() => {}}
          />
        </View>
        {activeTopTab === 'Orders' && <OrderComponent />}
        {activeTopTab === 'Opened Positions' && <PositionsOpenComponent />}
        {activeTopTab === 'Closed Positions' && <PositionsClosedComponent />}
      </ScrollView>
    </View>
  );
};

export default InstumentScreen;
