import { View, FlatList, Alert } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Images } from '../../Assets';
import { styles } from './styles';
import CommonAlgoMarketPlaceCard from '../../ReusableComponents/commonCardsAlgoMarketPlaceCard';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import useTradingBotsQuery from '../../ReusableComponents/Hooks/useTradingBotsQuery';
import { getApiErrorMessage, isMarketOpenIST } from '../../Utils/helper';
import RiskDisclosureScreen from '../../ReusableComponents/riskDisclosureModal';
import snackbarHandler from '../../Utils/snackbarHandler';
// import PaymentScreen from '../../ReusableComponents/paymentComponent';
import useProfileQuery from '../../Screens/ProfileScreen/Hooks/useProfileQuery';
import useCreatePaymentOrderMutation from '../../Screens/MarketPlaceScreen/Hooks/useCreatePaymentOrderMutation';
import { s } from '../MarketPlaceTradesComponent/styles';
import { startRazorpayPayment } from '../../ReusableComponents/paymentComponent';
import useStartStopBotMutation from '../../Screens/HomeScreen/Hooks/useStartStopBotMutation';
import useVerifyPaymentMutation from '../../Screens/MarketPlaceScreen/Hooks/usePaymentVerifyMutation';
type MyAlgoProps = {
  navigation?: MainStackScreenProps<'AlgoMain'>['navigation'];
}
const AlgoMarketPlaceComponent = ({ navigation }: MyAlgoProps) => {
  const isMarketHours = isMarketOpenIST();
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [selectedBotId, setSelectedBotId] = useState<string>('');
  // const [selectedInstanceId, setSelectedInstanceId] = useState<number | null>(null);
  const { data: profileApiData } = useProfileQuery();
  const { mutate: verifyPaymentMutate } = useVerifyPaymentMutation();
  const profileData = profileApiData?.data?.data[0]
  const { data: tradingData, refetch }: any = useTradingBotsQuery({
    queryKey: ['/api/v1/strategy/bots/'],
    refetchInterval: isMarketHours ? 3000 : false
  });
  const tradingBotData = tradingData?.data?.data;
  // console.log('TradingBotDataMarketPlace', tradingBotData)
  const { mutate: startStopBotMutate } = useStartStopBotMutation();
  const { mutate: subscribeMutate } = useCreatePaymentOrderMutation();
  const subs = (id: string) => {
    if (!id) {
      snackbarHandler.errorToast('Bot id not found');
      return;
    }
    subscribeMutate({
      bot_id: parseInt(id)
    }, {
      onSuccess: async (res: any) => {
        // console.log('PaymentOrderCreateApiSuccess', res);
        let resData = res?.data?.data;
        // snackbarHandler.successToast('Subscribed successfully!');
        setShowRiskModal(false);
        const result = await startRazorpayPayment({
          amount: Number(resData?.amount),         // ✅ in paise
          currency: resData?.currency ?? 'INR',
          id: resData?.provider_order_id,    // ✅ if order flow
          subscription_id: resData?.subscription_id, // ✅ only if subscription flow
          email: profileData?.email ?? '',
          contact: profileData?.contact ?? '',
          name: `${profileData?.first_name ?? ''} ${profileData?.last_name ?? ''}`.trim(),
        });
        if (result.ok) {
          verifyPaymentMutate({
            razorpay_order_id: result?.data?.razorpay_order_id,
            razorpay_payment_id: result?.data?.razorpay_payment_id,
            razorpay_signature: result?.data?.razorpay_signature
          }, {
            onSuccess: (res) => {
              // console.log('ResPaymentVerify', res)
              snackbarHandler.successToast('Payment is successfully verified');
              refetch();
            },
            onError: (err) => {
              snackbarHandler.errorToast('Payment is not verified');
              const message = getApiErrorMessage(err) || 'Payment failed';
              snackbarHandler.errorToast(message);
            }
          })
        } else {
          Alert.alert('Payment not successful, Please retry after some time')
        }
      },
      onError: (err: any) => {
        // console.log('PaymentOrderCreateApiError', err);
        const message = getApiErrorMessage(err) || 'Subscription failed';
        snackbarHandler.errorToast(message);
      },
    });
  }
  const handleCardAction = (item: any) => {
    const isSubscribed = item?.is_subscribed;
    const runningStatus = item?.running_status;

    // 1. Not subscribed -> open modal
    if (!isSubscribed) {
      setSelectedBotId(String(item?.bot_id));
      setShowRiskModal(true);
      return;
    }

    // 2. Already subscribed -> start / stop bot
    if (!item?.instance_id) {
      snackbarHandler.errorToast('Instance id not found');
      return;
    }

    if (runningStatus === 'pause') {
      startStopBotMutate(
        {
          instance_id: item?.instance_id,
          type: 'start',
        },
        {
          onSuccess: (res: any) => {
            // console.log('StartBotResponse', res);
            refetch();
            snackbarHandler.successToast('Bot started successfully');
          },
          onError: (err: any) => {
            // console.log('StartBotError', err);
            snackbarHandler.errorToast(getApiErrorMessage(err) || 'Failed to start bot');
          },
        }
      );
      return;
    }

    if (runningStatus === 'run') {
      startStopBotMutate(
        {
          instance_id: item?.instance_id,
          type: 'stop',
        },
        {
          onSuccess: (res: any) => {
            // console.log('StopBotResponse', res);
            refetch();
            snackbarHandler.successToast('Bot paused successfully');
          },
          onError: (err: any) => {
            // console.log('StopBotError', err);
            snackbarHandler.errorToast(getApiErrorMessage(err) || 'Failed to pause bot');
          },
        }
      );
      return;
    }
  };
  const renderFeatureCard = ({ item }: any) => {
    return (
      <View style={styles.commonCardView}>
        {/* @ts-ignore */}
        <CommonAlgoMarketPlaceCard
          logo={item.logo}
          name={item.name}
          onPress={() => navigation?.navigate('MarketPlace', { cardData: item })}
          sub={item?.tags?.description}
          onPressSubscribe={() => handleCardAction(item)}
          tagLeft={item.tagLeft}
          tagRight={item.tagRight}
          ltp={item.backtest_results.summary.net_pnl}
          ltpChange={item.backtest_results.summary.net_pnl_pct}
          intraday={item.backtest_results.summary.total_trades}
          intradayChange={item.backtest_results.summary.rr_pct}
          pAndL={item.backtest_results.summary.max_drawdown}
          pAndLChange={item.backtest_results.summary.max_dd_pct}
          status={item.running_status}
          is_subscribed={item?.is_subscribed}
        />
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      {/* -------------------- BIG CARD (UNCHANGED SECTION) -------------------- */}
      <FlatList
        data={tradingBotData}
        keyExtractor={(item, index) => String(item?.bot_id ?? index)}
        renderItem={renderFeatureCard}
      />
      <RiskDisclosureScreen visible={showRiskModal} setVisible={setShowRiskModal} onPress={() => subs(selectedBotId)} />
    </View>
  );
};

export default AlgoMarketPlaceComponent;
