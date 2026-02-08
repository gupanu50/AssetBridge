/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../Assets';
import CommonCard from '../../ReusableComponents/commonCard';
import {
  NewsItemProps,
  PropCommonCardApiTypes,
} from '../../ReusableComponents/commonTypes';
import { fontFamily, isMarketOpenIST, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import CommonNews from '../../ReusableComponents/commonNews';
import { MoversApiProps } from './types';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { Dropdown } from 'react-native-element-dropdown';
import useTopMoversQuery from '../../Screens/HomeScreen/Hooks/useTopMoversQuery';
import useTradingBotsQuery from '../../ReusableComponents/Hooks/useTradingBotsQuery';
import useNewsQuery from '../../ReusableComponents/Hooks/useNewsQuery';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');
type ExploreProps = {
  navigation?: MainStackScreenProps<'HomeTab'>['navigation'];
}
export default function ExploreComponent(props: ExploreProps) {
  const CARD_WIDTH = SCREEN_WIDTH - scaler(30);
  const CARD_GAP = scaler(12); // space between cards
  const [activeMoverTab, setActiveMoverTab] = useState('Gainers');
  const [selectedValue, setSelectedValue] = useState<string>('today');
  const isMarketHours = isMarketOpenIST();
  const dropDownData = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
  ];
  const { data, refetch } = useTopMoversQuery({
    exchange: 'NSE',
    limit: '5',
    time: selectedValue,
    type: activeMoverTab
  },
    {
      queryKey: ['topMovers', selectedValue, activeMoverTab],
      refetchInterval: isMarketHours ? 3000 : false,
    }
  )
  const moversApiData: MoversApiProps[] = data?.data?.data?.movers ?? [];

  const moversWithViewAll: MoversApiProps[] = React.useMemo(() => {
    return [
      ...moversApiData.map(m => ({ ...m, isViewAll: false })), // normalize
      { id: "__view_all__", isViewAll: true, symbol: '', current_price: 0, absolute_change: 0 },
    ];
  }, [moversApiData]);
  const { data: tradingData }: any = useTradingBotsQuery({
    queryKey: ['/api/v1/strategy/bots/'],
    refetchInterval: isMarketHours ? 3000 : false
  });
  const tradingBotData = tradingData?.data?.data;
  console.log('TradingBotData', tradingBotData)
  const { data: newsApiData } = useNewsQuery();
  // console.log('NewsData', newsApiData)
  const newsData = newsApiData?.data?.results;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch(); // Manually trigger a refetch of the API data
  //   }, 15000);

  //   return () => clearInterval(interval); // Clean up the interval on unmount
  // }, [refetch]);
  // const featureCards = useMemo(
  //   () => [
  //     {
  //       id: 'f1',
  //       logo: Images.swiperLogo,
  //       name: 'TradeMioon Sensex',
  //       sub: 'Buying {DTE 0,1,2,3}',
  //       tagLeft: 'Buy',
  //       tagRight: 'MOMENT',
  //       ltp: '20,000',
  //       ltpChange: '+3.1%',
  //       intraday: '2.22',
  //       intradayChange: '+1.3%',
  //       pAndL: '3.11',
  //       pAndLChange: '-0.37%',
  //       status: 'RUNNING',
  //     },
  //     // add more cards here (it will automatically become swipe-able)
  //     {
  //       id: 'f2',
  //       logo: Images.swiperLogo,
  //       name: 'TradeMioon Nifty',
  //       sub: 'Buying {DTE 0,1,2,3}',
  //       tagLeft: 'Buy',
  //       tagRight: 'MOMENT',
  //       ltp: '18,450',
  //       ltpChange: '+1.2%',
  //       intraday: '1.90',
  //       intradayChange: '+0.6%',
  //       pAndL: '2.01',
  //       pAndLChange: '+0.22%',
  //       status: 'RUNNING',
  //     },
  //     {
  //       id: 'f3',
  //       logo: Images.swiperLogo,
  //       name: 'TradeMioon Bank',
  //       sub: 'Buying {DTE 0,1,2,3}',
  //       tagLeft: 'Buy',
  //       tagRight: 'MOMENT',
  //       ltp: '42,110',
  //       ltpChange: '-0.4%',
  //       intraday: '1.10',
  //       intradayChange: '-0.2%',
  //       pAndL: '1.55',
  //       pAndLChange: '-0.11%',
  //       status: 'RUNNING',
  //     },
  //   ],
  //   [], // no dependencies
  // );
  const renderFeatureCard = (item: PropCommonCardApiTypes) => {
    return (
      <CommonCard
        logo={item.logo}
        onPress={() => props?.navigation?.navigate('AlgoMain', { item: item })}
        name={item.name}
        sub={item.description}
        tagLeft={item.tagLeft}
        tagRight={item.tagRight}
        ltp={item?.backtest_results?.summary?.net_pnl}
        ltpChange={item.ltpChange}
        intraday={item?.backtest_results?.summary?.total_trades}
        intradayChange={item.intradayChange}
        pAndL={item?.backtest_results?.summary?.max_drawdown}
        pAndLChange={item.pAndLChange}
        status={item.status}
      />
    );
  };
  // const newsData = useMemo(
  //   () => [
  //     {
  //       id: 'n1',
  //       time: '10 hours ago',
  //       img: Images.news3,
  //       title:
  //         'DXY: Dollar Index Dives After Job Losses Juice Traders Optimism on Easier Policy',
  //     },
  //     {
  //       id: 'n2',
  //       time: '10 hours ago',
  //       img: Images.news3,
  //       title:
  //         'DXY: Dollar Index Dives After Job Losses Juice Traders Optimism on Easier Policy',
  //     },
  //     {
  //       id: 'n3',
  //       time: '10 hours ago',
  //       img: Images.news3,
  //       title:
  //         'DXY: Dollar Index Dives After Job Losses Juice Traders Optimism on Easier Policy',
  //     },
  //     {
  //       id: 'n4',
  //       time: '10 hours ago',
  //       img: Images.news3,
  //       title:
  //         'DXY: Dollar Index Dives After Job Losses Juice Traders Optimism on Easier Policy',
  //     },
  //   ],
  //   [],
  // );
  const renderMoverGridCard = ({ item }: { item: MoversApiProps }) => {
    if (item.isViewAll) {
      return (
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.moverCard, styles.viewAllCard]}
        >
          <Text style={styles.viewAllText}>View all</Text>
          <View style={styles.viewAllCircle}>
            <Text style={styles.viewAllArrow}>{'>'}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity activeOpacity={0.85} style={styles.moverCard}
        onPress={() => props.navigation?.navigate('Instrument')}>
        {/* <Image source={item.logo} resizeMode="contain" style={styles.logoImg} /> */}
        <Text style={styles.moverName} numberOfLines={1}>
          {item.symbol}
        </Text>
        <Text style={styles.moverPrice}>{item.current_price}</Text>
        <Text
          style={[
            styles.moverChg,
            { color: mainColors.greenText },
          ]}
        >
          {item.absolute_change}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderNewsItem = ({ item }: { item: NewsItemProps }) => {
    return (
      <CommonNews
        published_at={item.published_at}
        img={item.img}
        title={item.title}
      />
    );
  };
  return (
    <View style={styles.mainView}>
      {/* -------------------- BIG CARD (UNCHANGED SECTION) -------------------- */}
      <FlatList
        data={tradingBotData}
        keyExtractor={item => item.name}
        renderItem={({ item }) => renderFeatureCard(item)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start" // same as wrapper width
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: scaler(10) }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + CARD_GAP,
          offset: (CARD_WIDTH + CARD_GAP) * index,
          index,
        })}
      />

      {/* -------------------- TOP MOVERS (KEEP ALL PARTS) -------------------- */}
      <View style={styles.sectionHeaderRow}>
        <View style={styles.sectionHeaderLeft}>
          <Image
            source={Images.topMovers}
            resizeMode="contain"
            style={styles.tMimg}
          />
          <Text style={styles.sectionTitle}>Top Movers</Text>
        </View>
      </View>

      <View style={styles.moverTabsRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            setActiveMoverTab('Gainers');
          }}
          style={[
            styles.moverSegmentBtn,
            activeMoverTab === 'Gainers'
              ? styles.moverSegmentBtnActive
              : styles.moverSegmentBtnInActive,
          ]}
        >
          <Text
            style={[
              styles.moverSegmentText,
              activeMoverTab === 'Gainers' && styles.moverSegmentTextActive,
            ]}
          >
            Gainers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setActiveMoverTab('Losers')}
          style={[
            styles.moverSegmentBtn,
            activeMoverTab === 'Losers'
              ? styles.moverSegmentBtnActive
              : styles.moverSegmentBtnInActive,
          ]}
        >
          <Text
            style={[
              styles.moverSegmentText,
              activeMoverTab === 'Losers' && styles.moverSegmentTextActive,
            ]}
          >
            Losers
          </Text>
        </TouchableOpacity>
        <Dropdown
          data={dropDownData}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={selectedValue}
          containerStyle={{ borderRadius: 10, borderWidth: 1, borderColor: mainColors.inputBorder, overflow: 'hidden' }}
          selectedTextStyle={{ color: mainColors.white, fontFamily: fontFamily.poppinsRegular, fontSize: scaler(10) }}
          style={{ borderWidth: 1, borderColor: mainColors.inputBorder, height: scaler(25), width: scaler(80), borderRadius: 15, paddingHorizontal: scaler(10) }}
          itemTextStyle={{ color: mainColors.white, fontFamily: fontFamily.poppinsRegular, fontSize: scaler(8) }}
          itemContainerStyle={{ backgroundColor: mainColors.black }}
          onChange={item => setSelectedValue(item.value)}
          activeColor={mainColors.inputBorder}
        />
      </View>

      <View style={styles.moversGridWrap}>
        <FlatList
          data={moversWithViewAll}
          keyExtractor={(item, index) => item.id ?? item.symbol ?? String(index)}
          renderItem={renderMoverGridCard}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          scrollEnabled={false}
        />
      </View>

      {/* -------------------- HOT NEWS (KEEP ALL PARTS) -------------------- */}
      <View style={[styles.sectionHeaderRow, { marginTop: scaler(4) }]}>
        <View style={styles.sectionHeaderLeft}>
          <Image
            source={Images.topMovers}
            resizeMode="contain"
            style={styles.tMimg}
          />
          <Text style={styles.sectionTitle}>Hot News</Text>
        </View>
      </View>

      <View style={styles.newsCard}>
        <FlatList
          data={newsData}
          keyExtractor={item => item.title}
          renderItem={renderNewsItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.newsSeparator} />}
        />
      </View>
      <Image source={Images.line} resizeMode='contain' style={styles.line} />
      {/* Footer (kept simple like image) */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Terms and Privacy Policy {' | '} Trust &amp; Security {' | '} Careers
        </Text>
        <Text style={styles.footerText}>
          Investor {' | '}  Lorem Ipsum1  &amp;  Lorem Ipsum1  {' | '}  Lorem Ipsum1
        </Text>
        <Image source={Images.line} resizeMode='contain' style={styles.line} />
        <Text style={[styles.footerText, {}]}>
          Made with <Text style={{ color: mainColors.red }}>♥</Text> India{' '}
          {' | '}
          Copyright © 2025 •{' '}
          <Text style={{ color: mainColors.mainButton }}>Asset Bridge</Text>
        </Text>
      </View>
    </View>
  );
}
