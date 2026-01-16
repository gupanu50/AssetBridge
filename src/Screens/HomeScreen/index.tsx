/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import CommonHeader from '../../ReusableComponents/commonHeader';
import { mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { Images } from '../../Assets';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import CommonCard from '../../ReusableComponents/commonCard';
import {
  NewsItemProps,
  PropCommonCardTypes,
} from '../../ReusableComponents/commonTypes';
import { MoverData, TopTab } from './types';
import { styles } from './styles';
import CommonNews from '../../ReusableComponents/commonNews';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
type Props = MainStackScreenProps<'HomeTab'>;
const HomeScreen = ({ navigation }: Props) => {
  // -------------------- STATE --------------------
  const [activeTopTab, setActiveTopTab] = useState('Explore');
  const [activeMoverTab, setActiveMoverTab] = useState('Gainers');
  const [activeIndex, setActiveIndex] = useState('Today');

  // refs to keep tab visible while sliding
  const topTabListRef: any = useRef(null);

  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Explore' },
      { id: 't2', label: 'Positions Open(23)' },
      { id: 't3', label: 'Positions Closed' },
    ],
    [],
  );

  // Top Movers section (keep as-is from previous code)
  const moversDataGrid = useMemo<MoverData[]>(
    () => [
      {
        id: 'm1',
        name: 'Company Name He...',
        price: '₹ 500.00',
        chg: '+8.00 (0.17%)',
        logo: Images.comLogo,
        isUp: true,
      },
      {
        id: 'm2',
        name: 'Company Name He...',
        price: '₹ 500.00',
        logo: Images.comLogo,
        chg: '+8.00 (0.17%)',
        isUp: true,
      },
      {
        id: 'm3',
        name: 'Company Name He...',
        price: '₹ 500.00',
        logo: Images.comLogo,
        chg: '-8.00 (0.17%)',
        isUp: false,
      },
      {
        id: 'm4',
        name: 'Company Name He...',
        price: '₹ 500.00',
        logo: Images.comLogo,
        chg: '+8.00 (0.17%)',
        isUp: true,
      },
      {
        id: 'm5',
        name: 'Company Name He...',
        price: '₹ 500.00',
        logo: Images.comLogo,
        chg: '+8.00 (0.17%)',
        isUp: true,
      },
      { id: 'm6', isViewAll: true },
    ],
    [],
  );
  const featureCards = useMemo(
    () => [
      {
        id: 'f1',
        logo: Images.swiperLogo,
        name: 'TradeMioon Sensex',
        sub: 'Buying {DTE 0,1,2,3}',
        tagLeft: 'Buy',
        tagRight: 'MOMENT',
        ltp: '20,000',
        ltpChange: '+3.1%',
        intraday: '2.22',
        intradayChange: '+1.3%',
        pAndL: '3.11',
        pAndLChange: '-0.37%',
        status: 'Running',
      },
      // add more cards here (it will automatically become swipe-able)
      {
        id: 'f2',
        logo: Images.swiperLogo,
        name: 'TradeMioon Nifty',
        sub: 'Buying {DTE 0,1,2,3}',
        tagLeft: 'Buy',
        tagRight: 'MOMENT',
        ltp: '18,450',
        ltpChange: '+1.2%',
        intraday: '1.90',
        intradayChange: '+0.6%',
        pAndL: '2.01',
        pAndLChange: '+0.22%',
        status: 'Running',
      },
      {
        id: 'f3',
        logo: Images.swiperLogo,
        name: 'TradeMioon Bank',
        sub: 'Buying {DTE 0,1,2,3}',
        tagLeft: 'Buy',
        tagRight: 'MOMENT',
        ltp: '42,110',
        ltpChange: '-0.4%',
        intraday: '1.10',
        intradayChange: '-0.2%',
        pAndL: '1.55',
        pAndLChange: '-0.11%',
        status: 'Running',
      },
    ],
    [], // no dependencies
  );
  const renderFeatureCard = (item: PropCommonCardTypes) => {
    return (
      <CommonCard
        logo={item.logo}
        name={item.name}
        sub={item.sub}
        tagLeft={item.tagLeft}
        tagRight={item.tagRight}
        ltp={item.ltp}
        ltpChange={item.ltpChange}
        intraday={item.intraday}
        intradayChange={item.intradayChange}
        pAndL={item.pAndL}
        pAndLChange={item.pAndLChange}
        status={item.status}
      />
    );
  };
  const newsData = useMemo(
    () => [
      {
        id: 'n1',
        time: '10 hours ago',
        img: Images.news3,
        title:
          'DXY: Dollar Index Dives After Job Losses Juice Traders Optimism on Easier Policy',
      },
      {
        id: 'n2',
        time: '10 hours ago',
        img: Images.news3,
        title:
          'DXY: Dollar Index Dives After Job Losses Juice Traders Optimism on Easier Policy',
      },
      {
        id: 'n3',
        time: '10 hours ago',
        img: Images.news3,
        title:
          'DXY: Dollar Index Dives After Job Losses Juice Traders Optimism on Easier Policy',
      },
      {
        id: 'n4',
        time: '10 hours ago',
        img: Images.news3,
        title:
          'DXY: Dollar Index Dives After Job Losses Juice Traders Optimism on Easier Policy',
      },
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

  // Top Movers grid cards (kept)
  const renderMoverGridCard = ({ item }: { item: MoverData }) => {
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
      <TouchableOpacity activeOpacity={0.85} style={styles.moverCard}>
        <Image source={item.logo} resizeMode="contain" style={styles.logoImg} />
        <Text style={styles.moverName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.moverPrice}>{item.price}</Text>
        <Text
          style={[
            styles.moverChg,
            { color: item.isUp ? mainColors.green : mainColors.red },
          ]}
        >
          {item.chg}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderNewsItem = ({ item }: { item: NewsItemProps }) => {
    return (
      <CommonNews
        id={item.id}
        time={item.time}
        img={item.img}
        title={item.title}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaler(30) }}
      >
        <View style={styles.mainView}>
          {/* -------------------- Header Boxes -------------------- */}
          <View style={styles.flexMainView}>
            <View style={styles.innerBoxView}>
              <Text style={styles.textNifty}>NIFTY 50</Text>
              <Text style={styles.textNiftyValue}>
                25944.75{' '}
                <Text style={{ color: mainColors.green }}>87.45(0.34%)</Text>
              </Text>
            </View>

            <View style={styles.innerBoxView}>
              <Text style={styles.textNifty}>SENSEX</Text>
              <Text style={styles.textNiftyValue}>
                84977.45{' '}
                <Text style={{ color: mainColors.red }}>-287.45(0.34%)</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* -------------------- SLIDABLE TOP TABS (LIKE IMAGE) -------------------- */}
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
        <View style={styles.mainView}>
          {/* -------------------- BIG CARD (UNCHANGED SECTION) -------------------- */}
          <FlatList
            data={featureCards}
            keyExtractor={item => item.id}
            renderItem={({ item }) => renderFeatureCard(item)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH - scaler(20)} // same as wrapper width
            decelerationRate="fast"
            contentContainerStyle={{ paddingRight: scaler(10) }}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH - scaler(20),
              offset: (SCREEN_WIDTH - scaler(20)) * index,
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
                navigation.navigate('WatchList');
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

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveIndex('Today')}
              style={styles.indexDrop}
            >
              <Text style={styles.indexDropText}>{activeIndex}</Text>
              <Text style={styles.indexDropArrow}>{'v'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.moversGridWrap}>
            <FlatList
              data={moversDataGrid}
              keyExtractor={item => item.id ?? 'view_all'}
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
              keyExtractor={item => item.id}
              renderItem={renderNewsItem}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={styles.newsSeparator} />
              )}
            />
          </View>

          {/* Footer (kept simple like image) */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Terms and Privacy Policy {' | '} Trust &amp; Security {' | '}{' '}
              Careers
            </Text>
            <Text style={[styles.footerText, { marginTop: scaler(8) }]}>
              Made with <Text style={{ color: mainColors.red }}>♥</Text> India{' '}
              {' | '}
              Copyright © 2025 •{' '}
              <Text style={{ color: mainColors.mainButton }}>Asset Bridge</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
