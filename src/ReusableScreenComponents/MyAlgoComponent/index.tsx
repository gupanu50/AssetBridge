import { View, FlatList } from 'react-native';
import React, { useMemo } from 'react';
import CommonCard from '../../ReusableComponents/commonCard';
// import { Images } from '../../Assets';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import useStartStopBotMutation from '../../Screens/HomeScreen/Hooks/useStartStopBotMutation';
import snackbarHandler from '../../Utils/snackbarHandler';
import { getApiErrorMessage } from '../../Utils/helper';
type MyAlgoProps = {
  navigation?: MainStackScreenProps<'Algo'>['navigation'];
  subsData?: any[];
};
const MyAlgoComponent = ({ navigation, subsData }: MyAlgoProps) => {
  console.log('PropsSubsData', subsData);
  const { mutate: startStopBotMutate } = useStartStopBotMutation();
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
  //       status: 'Running',
  //     },
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
  //       status: 'Running',
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
  //       status: 'Running',
  //     },
  //   ],
  //   [],
  // );
  const renderFeatureCard = ({ item }: any) => {
    console.log('Item', item);
    const pressSub = () => {
      if (item?.running_status === 'pause') {
        startStopBotMutate({
          instance_id: item?.instance_id,
          type: 'start'
        }, {
          onSuccess: (res) => {
            snackbarHandler.successToast('Bot started successfully');
            console.log('StartBotResponse', res);
          },
          onError: (err) => {
            console.log('StoppedApirror', err);
            snackbarHandler.errorToast(getApiErrorMessage(err) || 'Failed to start bot');
          }
        })
      } else if (item?.running_status === 'run') {
        startStopBotMutate({
          instance_id: item?.instance_id,
          type: 'stop'
        }, {
          onSuccess: (res) => {
            snackbarHandler.successToast('Bot paused successfully');
            console.log('StartBotResponse', res)
          },
          onError: (err) => {
            console.log('StoppedApirror', err);
            snackbarHandler.errorToast(getApiErrorMessage(err) || 'Failed to pause bot');
          }
        })
      }
    }
    return (
      <View style={styles.commonCardView}>
        <CommonCard
          logo={item.logo}
          onPress={() => navigation?.navigate('AlgoMain', { item: item?.bot })}
          name={item?.bot?.name}
          sub={item?.bot?.tags?.description}
          dayPnl={item?.users_result?.today_realized_pnl || '0'}
          dayReward={item?.users_result?.today_reward_risk_ratio || '0'}
          dayDD={item?.users_result?.today_max_drawdown || '0'}
          tagLeft={item.tagLeft}
          tagRight={item.tagRight}
          ltp={item?.users_result?.month_realized_pnl}
          ltpChange={item?.users_result?.today_realized_pnl_pct}
          ltpChangeMonth={item.users_result?.month_realized_pnl_pct || 0}
          ddPct={item?.users_result?.today_max_drawdown_pct || 0}
          ddPctMonth={item?.users_result?.month_max_drawdown_pct || 0}
          rewardPct={item?.users_result?.today_reward_risk_ratio_pct || 0}
          rewardPctMonth={item?.users_result?.month_reward_risk_ratio_pct || 0}
          intraday={item?.users_result?.month_reward_risk_ratio}
          intradayChange={item.intradayChange}
          pAndL={item?.users_result?.month_max_drawdown}
          pAndLChange={item.pAndLChange}
          status={item.running_status}
          is_subscribed={true}
          onPressSubscribe={() => pressSub()}
        />
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      {/* -------------------- BIG CARD (UNCHANGED SECTION) -------------------- */}
      <FlatList
        data={subsData}
        keyExtractor={i => i.id}
        renderItem={renderFeatureCard}
      />
    </View>
  );
};

export default MyAlgoComponent;
