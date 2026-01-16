/* eslint-disable react/no-unstable-nested-components */
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
import { FlatItem, LabelItem, TopTab } from './type';
import CommonButton from '../../ReusableComponents/commonButton';
import { styles } from './styles';
const InstumentScreen = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>('1D');
  const topTabListRef: any = useRef(null);
  const [activeTopTab, setActiveTopTab] = useState('Opened Positions');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  // const [searchText, setSearchText] = useState('');

  // const [isChecked1, setIsChecked1] = useState(false);

  const flatData = [
    {
      id: 1,
      name: 'HDFC',
      exchange: 'NSE',
      bs: 'Buy',
      DateTime: '21/09/2025  07:36:02',
      Qty: '0/1',
      LTP: '245.55',
      Product: 'CNC',
      Status: 'Filled',
      Price: '245.00',
      Source: 'Manual',
    },
    {
      id: 2,
      name: 'Lorem Ipsum',
      exchange: 'NSE',
      bs: 'Sell',
      DateTime: '21/09/2025  07:36:02',
      Qty: '0/1',
      LTP: '2450.55',
      Product: 'CNC',
      Status: 'Pending',
      Price: '2450.00',
      Source: 'Automated',
    },
  ];
  const toggleRow = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isAllSelected =
    flatData.length > 0 && selectedIds.size === flatData.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(flatData.map(x => x.id)));
    }
  };
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
  const renderCardData = ({ item }: { item: FlatItem }) => {
    const checked = selectedIds.has(item.id);
    setIsChecked(checked);
    const statusColor =
      item.Status?.toLowerCase() === 'filled'
        ? mainColors.green
        : item.Status?.toLowerCase() === 'pending'
        ? '#F5A524' // orange-ish like screenshot
        : mainColors.descText;

    const bsColor = item.bs === 'Buy' ? mainColors.green : mainColors.red;

    return (
      <View style={styles.orderCard}>
        {/* Top row: checkbox + Name + Exchange badge */}
        <View style={styles.cardTopRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => toggleRow(item.id)}
            style={styles.checkboxHit}
          >
            <IconButton
              vectorType="MaterialCommunityIcons"
              name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
              backgroundColor={mainColors.black}
              color={mainColors.mainButton}
            />
          </TouchableOpacity>

          <Text style={styles.cardTitle}>{item.name}</Text>

          <View style={styles.exchangeBadge}>
            <Text style={styles.exchangeBadgeText}>{item.exchange}</Text>
          </View>
        </View>

        {/* Buy/Sell + DateTime */}
        <View style={styles.cardSubRow}>
          <Text style={[styles.bsText, { color: bsColor }]}>{item.bs}</Text>
          <Text style={styles.dateText}>{item.DateTime}</Text>
        </View>

        {/* Two columns like screenshot */}
        <View style={styles.cardGrid}>
          {/* Left column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Qty.t</Text>
              <Text style={styles.kValue}>: {item.Qty}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>LTP</Text>
              <Text style={styles.kValue}>: {item.LTP}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Product</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{item.Product}</Text>
              </View>
            </View>
          </View>

          {/* Right column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Status</Text>
              <Text style={[styles.kValue, { color: statusColor }]}>
                : {item.Status}
              </Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Price</Text>
              <Text style={styles.kValue}>: {item.Price}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Source</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{item.Source}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
        <View style={styles.main}>
          <View style={[styles.flexView, styles.lineView]}>
            <IconButton
              vectorType="MaterialCommunityIcons"
              name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
              backgroundColor={mainColors.black}
              color={mainColors.mainButton}
              onPress={() => toggleSelectAll()}
            />
            <Text style={styles.selectText}>Select All</Text>
            <View style={styles.searchBox}>
              <Text style={styles.searchText}>Search</Text>
              <IconButton
                vectorType="MaterialIcons"
                name="search"
                size={scaler(18)}
                color={mainColors.white}
                backgroundColor={mainColors.black}
              />
            </View>
            <IconButton
              vectorType="AntDesign"
              name="download"
              color={mainColors.mainButton}
              backgroundColor={mainColors.black}
            />
          </View>
          <FlatList
            data={flatData}
            renderItem={renderCardData}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
            scrollEnabled={false}
          />
          <View style={styles.buttonFlexView}>
            <CommonButton
              label="Buy"
              backgroundColor={mainColors.buyButton}
              extraStyle={styles.buttonWidth}
            />
            <CommonButton
              label="Sell"
              backgroundColor={mainColors.sellButton}
              extraStyle={styles.buttonWidth}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InstumentScreen;
