import { FlatList, ScrollView, Text, View } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import CommonHeader from '../../ReusableComponents/commonHeader';
import { mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { Images } from '../../Assets';
import CommonCard from '../../ReusableComponents/commonCard';
import { styles } from './styles';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';

const AlgoScreen = () => {
  const topTabListRef: any = useRef(null);
  const [activeTopTab, setActiveTopTab] = useState('My Algo');
  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'My Algo' },
      { id: 't2', label: 'Market Place' },
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
    [],
  );
  const renderFeatureCard = ({ item }: any) => {
    return (
      <View style={styles.commonCardView}>
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
      </View>
    );
  };
  // -------------------- RENDERERS --------------------
  const renderTopTab = ({ item, index }: any) => {
    const isActive = activeTopTab === item.label;
    return (
      <CommonTabSlider
        activeTab="My Algo"
        index={index}
        label={item?.label}
        isActive={isActive}
        setIsActive={setActiveTopTab}
        style={styles.sliderView}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CommonHeader />

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
            onScrollToIndexFailed={() => {}}
          />
        </View>
        <View style={styles.mainView}>
          {/* -------------------- BIG CARD (UNCHANGED SECTION) -------------------- */}
          <FlatList
            data={featureCards}
            keyExtractor={i => i.id}
            renderItem={renderFeatureCard}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AlgoScreen;
