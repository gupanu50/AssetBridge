import { View, FlatList } from 'react-native';
import React, { useMemo } from 'react';
import CommonCard from '../../ReusableComponents/commonCard';
import { Images } from '../../Assets';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
type MyAlgoProps = {
  navigation?: MainStackScreenProps<'Algo'>['navigation'];
}
const MyAlgoComponent = ({ navigation }: MyAlgoProps) => {
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
          onPress={() => navigation?.navigate('AlgoMain')}
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
  return (
    <View style={styles.mainView}>
      {/* -------------------- BIG CARD (UNCHANGED SECTION) -------------------- */}
      <FlatList
        data={featureCards}
        keyExtractor={i => i.id}
        renderItem={renderFeatureCard}
      />
    </View>
  );
};

export default MyAlgoComponent;
