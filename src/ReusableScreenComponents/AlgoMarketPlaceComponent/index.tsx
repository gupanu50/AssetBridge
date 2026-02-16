import { View, FlatList } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Images } from '../../Assets';
import { styles } from './styles';
import CommonAlgoMarketPlaceCard from '../../ReusableComponents/commonCardsAlgoMarketPlaceCard';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import useTradingBotsQuery from '../../ReusableComponents/Hooks/useTradingBotsQuery';
import { isMarketOpenIST } from '../../Utils/helper';
import RiskDisclosureScreen from '../../ReusableComponents/riskDisclosureModal';
type MyAlgoProps = {
  navigation?: MainStackScreenProps<'AlgoMain'>['navigation'];
}
const AlgoMarketPlaceComponent = ({ navigation }: MyAlgoProps) => {
  const isMarketHours = isMarketOpenIST();
  const [showRiskModal, setShowRiskModal] = useState(false)
  const { data: tradingData }: any = useTradingBotsQuery({
    queryKey: ['/api/v1/strategy/bots/'],
    refetchInterval: isMarketHours ? 3000 : false
  });
  const tradingBotData = tradingData?.data?.data;
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
        <CommonAlgoMarketPlaceCard
          logo={item.logo}
          name={item.name}
          onPress={() => navigation?.navigate('MarketPlace', { cardData: item })}
          sub={item.description}
          onPressSubscribe={() => setShowRiskModal(true)}
          tagLeft={item.tagLeft}
          tagRight={item.tagRight}
          ltp={item.backtest_results.summary.net_pnl}
          ltpChange={item.ltpChange}
          intraday={item.backtest_results.summary.total_trades}
          intradayChange={item.intradayChange}
          pAndL={item.backtest_results.summary.max_drawdown}
          pAndLChange={item.pAndLChange}
          status={item.status}
        />
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      {/* -------------------- BIG CARD (UNCHANGED SECTION) -------------------- */}
      <FlatList
        data={tradingBotData}
        keyExtractor={i => i.id}
        renderItem={renderFeatureCard}
      />
      <RiskDisclosureScreen visible={showRiskModal} setVisible={setShowRiskModal} onPress={() => setShowRiskModal(false)} />
    </View>
  );
};

export default AlgoMarketPlaceComponent;
