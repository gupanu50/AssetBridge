import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Images } from '../../Assets';
import CommonCard from '../../ReusableComponents/commonCard';
import {
  NewsItemProps,
  PropCommonCardApiTypes,
} from '../../ReusableComponents/commonTypes';
import { fontFamily, getApiErrorMessage, isMarketOpenIST, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import CommonNews from '../../ReusableComponents/commonNews';
import { MoversApiProps } from './types';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { Dropdown } from 'react-native-element-dropdown';
import useTopMoversQuery from '../../Screens/HomeScreen/Hooks/useTopMoversQuery';
import useTradingBotsQuery from '../../ReusableComponents/Hooks/useTradingBotsQuery';
import useNewsQuery from '../../ReusableComponents/Hooks/useNewsQuery';
import RiskDisclosureScreen from '../../ReusableComponents/riskDisclosureModal';
import snackbarHandler from '../../Utils/snackbarHandler';
import useCreatePaymentOrderMutation from '../../Screens/MarketPlaceScreen/Hooks/useCreatePaymentOrderMutation';
import useProfileQuery from '../../Screens/ProfileScreen/Hooks/useProfileQuery';
import { startRazorpayPayment } from '../../ReusableComponents/paymentComponent';
import useStartStopBotMutation from '../../Screens/HomeScreen/Hooks/useStartStopBotMutation';
import useVerifyPaymentMutation from '../../Screens/MarketPlaceScreen/Hooks/usePaymentVerifyMutation';
import { onWsMessage, registerSubscription, SubscribePayload, unregisterSubscription } from '../../Utils/ws/marketSocket';
import { mapApiToWsSegment } from '../../Utils/ws/wsSegmentMapper';
import { computeChange1 } from '../../Utils/ws/commonWebSocketFunctions';
import { getInitials } from '../../ReusableComponents/commonFunctions';
import { BotCardSkeleton, MoversGridSkeleton, NewsListSkeleton } from '../../Screens/HomeScreen/Skeleton/ExploreSkeleton/ExploreSkeleton';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const CARD_SIDE_PADDING = scaler(13);
const CARD_GAP = scaler(13);
const CARD_WIDTH = SCREEN_WIDTH - CARD_SIDE_PADDING * 2;
const ITEM_SIZE = CARD_WIDTH + CARD_GAP;
const AUTO_PLAY_INTERVAL = 5000;
const AUTO_PLAY_RESUME_DELAY = 4000;

type ExploreProps = {
  navigation?: MainStackScreenProps<'HomeTab'>['navigation'];
};

export default function ExploreComponent(props: ExploreProps) {
  const [activeMoverTab, setActiveMoverTab] = useState('Gainers');
  const [selectedValue, setSelectedValue] = useState<string>('today');
  const [moverLimit, setMoverLimit] = useState<'5' | '15'>('5');
  const isMarketHours = isMarketOpenIST();
  const [showRiskModal, setShowRiskModal] = useState(false);

  const featureListRef = useRef<FlatList<any>>(null);
  const topMoversListRef = useRef<FlatList<any>>(null);
  const featureIndexRef = useRef<number>(1);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUserScrollingRef = useRef<boolean>(false);

  const { data: profileApiData } = useProfileQuery();
  const { mutate: startStopBotMutate } = useStartStopBotMutation();
  const profileData = profileApiData?.data?.data[0];
  const { mutate: subscribeMutate } = useCreatePaymentOrderMutation();

  const dropDownData = [
    { label: 'Today', value: 'today' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];

  const { data, refetch: refetchTopMovers, isLoading: moversLoading } = useTopMoversQuery(
    {
      exchange: 'NSE',
      limit: moverLimit,
      time: selectedValue,
      type: activeMoverTab.replace('s', '').toLowerCase(),
    },
    { queryKey: ['topMovers', selectedValue, activeMoverTab, moverLimit] },
  );

  const moversApiData: MoversApiProps[] = data?.data?.data?.movers ?? [];
  const [realTimeData, setRealTimeData] = useState<Record<string, { ltp: number; abs: number; pct: number }>>({});
  const { mutate: verifyPaymentMutate } = useVerifyPaymentMutation();
  const [selectedBotId, setSelectedBotId] = useState<string>('');

  const moversWithViewAll: MoversApiProps[] = useMemo(() => {
    const normalized = moversApiData.map(m => ({ ...m, isViewAll: false }));
    if (moverLimit === '15') {
      return [...normalized, { id: '__view_less__', isViewAll: true, symbol: '', current_price: 0, absolute_change: 0 }];
    }
    return [...normalized, { id: '__view_all__', isViewAll: true, symbol: '', current_price: 0, absolute_change: 0 }];
  }, [moversApiData, moverLimit]);

  const { data: tradingData, refetch, isLoading: botsLoading }: any = useTradingBotsQuery({
    queryKey: ['/api/v1/strategy/bots/'],
  });

  const tradingBotData = tradingData?.data?.data;
  const { data: newsApiData, isLoading: newsLoading } = useNewsQuery();
  const bots: PropCommonCardApiTypes[] = tradingBotData ?? [];

  const loopedBots = useMemo(() => {
    if (!bots.length) return [];
    if (bots.length === 1) return [bots[0], bots[0], bots[0]];
    return [bots[bots.length - 1], ...bots, bots[0]];
  }, [bots]);

  const scrollToIndex = useCallback(
    (index: number, animated: boolean) => {
      featureListRef.current?.scrollToOffset({
        offset: index * ITEM_SIZE,
        animated,
      });
    },
    [],
  );

  const startAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);

    autoPlayTimerRef.current = setInterval(() => {
      if (isUserScrollingRef.current) return;

      const next = featureIndexRef.current + 1;
      scrollToIndex(next, true);
      featureIndexRef.current = next;
    }, AUTO_PLAY_INTERVAL);
  }, [scrollToIndex]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!bots.length) return;

    const init = () => {
      featureIndexRef.current = 1;
      scrollToIndex(1, false);
      startAutoPlay();
    };

    const raf = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(raf);
      stopAutoPlay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [bots.length, scrollToIndex, startAutoPlay, stopAutoPlay]);

  const onScrollBeginDrag = useCallback(() => {
    isUserScrollingRef.current = true;
    stopAutoPlay();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, [stopAutoPlay]);

  const onFeatureScrollEnd = useCallback(
    (e: any) => {
      const x = e.nativeEvent.contentOffset.x;
      const i = Math.round(x / ITEM_SIZE);
      featureIndexRef.current = i;
      isUserScrollingRef.current = false;

      if (i >= bots.length + 1) {
        setTimeout(() => {
          featureIndexRef.current = 1;
          scrollToIndex(1, false);
        }, 30);
      } else if (i <= 0) {
        setTimeout(() => {
          featureIndexRef.current = bots.length;
          scrollToIndex(bots.length, false);
        }, 30);
      }

      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        startAutoPlay();
      }, AUTO_PLAY_RESUME_DELAY);
    },
    [bots.length, scrollToIndex, startAutoPlay],
  );

  const newsData = newsApiData?.data?.data?.results;

  const handleCardAction = useCallback(
    (item: any) => {
      const isSubscribed = item?.is_subscribed;
      const runningStatus = item?.running_status;

      if (!isSubscribed) {
        setSelectedBotId(String(item?.bot_id));
        setShowRiskModal(true);
        return;
      }

      if (!item?.instance_id) {
        snackbarHandler.errorToast('Instance id not found');
        return;
      }

      if (runningStatus === 'pause') {
        startStopBotMutate(
          { instance_id: item?.instance_id, type: 'start' },
          {
            onSuccess: () => {
              refetch();
              snackbarHandler.successToast('Bot started successfully');
            },
            onError: (err: any) => {
              snackbarHandler.errorToast(getApiErrorMessage(err) || 'Failed to start bot');
            },
          },
        );
        return;
      }

      if (runningStatus === 'run') {
        startStopBotMutate(
          { instance_id: item?.instance_id, type: 'stop' },
          {
            onSuccess: () => {
              refetch();
              snackbarHandler.successToast('Bot paused successfully');
            },
            onError: (err: any) => {
              snackbarHandler.errorToast(getApiErrorMessage(err) || 'Failed to pause bot');
            },
          },
        );
        return;
      }
    },
    [startStopBotMutate, refetch],
  );

  const renderFeatureCard = useCallback(
    (item: PropCommonCardApiTypes) => {
      return (
        <CommonCard
          logo={item.logo}
          onPress={() => props?.navigation?.navigate('AlgoMain', { item })}
          name={item.name}
          sub={item?.tags?.description || ''}
          // @ts-ignore
          dayPnl={item?.is_subscribed ? item?.users_result?.today_realized_pnl || '0' : item?.backtest_results?.summary?.day?.net_pnl || '0'}
          dayReward={item?.is_subscribed ? item?.users_result?.today_reward_risk_ratio || '0' : item?.backtest_results?.summary?.day?.total_trades || '0'}
          dayDD={item?.is_subscribed ? item?.users_result?.today_max_drawdown || '0' : item?.backtest_results?.summary?.day?.max_drawdown || '0'}
          tagLeft={item.tagLeft}
          tagRight={item.tagRight}
          intra={item?.metadata?.card_tags?.[0] || ''}
          instr={item?.metadata?.card_tags?.[1] || ''}
          ltp={item?.is_subscribed ? item?.users_result?.month_realized_pnl || 0 : item?.backtest_results?.summary?.month?.net_pnl || 0}
          ltpChange={item?.is_subscribed ? item?.users_result?.today_realized_pnl_pct : item.backtest_results?.summary?.day?.net_pnl_pct || 0}
          ltpChangeMonth={item?.is_subscribed ? item.users_result?.month_realized_pnl_pct || 0 : item.backtest_results?.summary?.month?.net_pnl_pct || 0}
          ddPct={item?.is_subscribed ? item?.users_result?.today_max_drawdown_pct : item?.backtest_results?.summary?.day?.max_dd_pct || 0}
          ddPctMonth={item?.is_subscribed ? item?.users_result?.month_max_drawdown_pct || 0 : item?.backtest_results?.summary?.month?.max_dd_pct || 0}
          rewardPct={item?.is_subscribed ? item?.users_result?.today_reward_risk_ratio_pct || 0 : item?.backtest_results?.summary?.day?.Reward_risk_ratio_percentage || 0}
          rewardPctMonth={item?.is_subscribed ? item?.users_result?.month_reward_risk_ratio_pct || 0 : item?.backtest_results?.summary?.month?.Reward_risk_ratio_percentage || 0}
          intraday={item?.is_subscribed ? item?.users_result?.month_reward_risk_ratio : item?.backtest_results?.summary?.month?.total_trades || ''}
          intradayChange={item.intradayChange}
          pAndL={item?.is_subscribed ? item?.users_result?.month_max_drawdown : item?.backtest_results?.summary?.month?.max_drawdown || ''}
          pAndLChange={item.pAndLChange}
          is_subscribed={item?.is_subscribed}
          status={item?.running_status}
          onPressSubscribe={() => handleCardAction(item)}
        />
      );
    },
    [props?.navigation, handleCardAction],
  );

  const subs = useCallback(
    (id: string) => {
      if (!id) {
        snackbarHandler.errorToast('Bot id not found');
        return;
      }
      subscribeMutate(
        { bot_id: parseInt(id) },
        {
          onSuccess: async (res: any) => {
            const resData = res?.data?.data;
            snackbarHandler.successToast('Subscribed successfully!');
            setShowRiskModal(false);
            const result = await startRazorpayPayment({
              amount: Number(resData?.amount),
              currency: resData?.currency ?? 'INR',
              id: resData?.provider_order_id,
              subscription_id: resData?.subscription_id,
              email: profileData?.email ?? '',
              contact: profileData?.contact ?? '',
              name: `${profileData?.first_name ?? ''} ${profileData?.last_name ?? ''}`.trim(),
            });
            if (result.ok) {
              verifyPaymentMutate(
                {
                  razorpay_order_id: result?.data?.razorpay_order_id,
                  razorpay_payment_id: result?.data?.razorpay_payment_id,
                  razorpay_signature: result?.data?.razorpay_signature,
                },
                {
                  onSuccess: () => {
                    snackbarHandler.successToast('Payment is successfully verified');
                    refetch();
                  },
                  onError: (err) => {
                    snackbarHandler.errorToast('Payment is not verified');
                    const message = getApiErrorMessage(err) || 'Payment failed';
                    snackbarHandler.errorToast(message);
                  },
                },
              );
            } else {
              Alert.alert('Payment not successful, Please retry after some time');
            }
          },
          onError: (err: any) => {
            const message = getApiErrorMessage(err) || 'Subscription failed';
            snackbarHandler.errorToast(message);
          },
        },
      );
    },
    [subscribeMutate, profileData, verifyPaymentMutate, refetch],
  );

  const wsPayload: SubscribePayload | null = useMemo(() => {
    if (!moversApiData.length) return null;
    const bucket = new Map<string, { segment: string; subscription_type: string; symbols: Set<string> }>();
    moversApiData.forEach((item) => {
      const symbol = item.symbol?.trim();
      const segment = item.segment?.trim();
      if (!symbol || !segment) return;
      const wsSegment = mapApiToWsSegment(segment, 'NSE');
      const type = 'contract';
      const key = `${wsSegment}__${type}`;
      if (!bucket.has(key)) bucket.set(key, { segment: wsSegment, subscription_type: type, symbols: new Set() });
      bucket.get(key)!.symbols.add(symbol);
    });
    const dataArr = Array.from(bucket.values()).map((b) => ({
      segment: b.segment,
      subscription_type: b.subscription_type,
      symbols: Array.from(b.symbols),
    }));
    return dataArr.length ? { type: 'subscribe', data: dataArr } : null;
  }, [moversApiData]);

  useEffect(() => {
    if (!wsPayload) return;
    registerSubscription('exploreOwner', wsPayload);
    return () => unregisterSubscription('exploreOwner');
  }, [wsPayload]);

  const previousCloseMap = useMemo(() => {
    const map: Record<string, number> = {};
    moversApiData.forEach((item) => {
      if (item?.symbol && item?.previous_close != null) map[item.symbol] = Number(item.previous_close);
    });
    return map;
  }, [moversApiData]);

  useEffect(() => {
    const off = onWsMessage((msg) => {
      if (msg?.type !== 'snapshot' && msg?.type !== 'update') return;
      if (!msg?.data || typeof msg.data !== 'object') return;
      setRealTimeData((prev) => {
        const updated = { ...prev };
        Object.keys(msg.data).forEach((key) => {
          const payload = msg.data[key];
          const symbol = payload?.symbol;
          if (!symbol) return;
          const previousClose = previousCloseMap[symbol];
          const { ltp, abs, pct } = computeChange1(payload, previousClose);
          updated[symbol] = { ltp, abs, pct } as any;
        });
        return updated;
      });
    });
    return () => off();
  }, [previousCloseMap]);

  const renderNewsItem = useCallback(({ item }: { item: NewsItemProps }) => {
    return (
      <CommonNews
        published_at={item.published_at}
        img={item.image_url}
        source={item?.source}
        title={item.title}
        onPress={() => Linking.openURL(item?.url || '')}
      />
    );
  }, []);

  const renderMoverGridCard = useCallback(
    ({ item }: { item: MoversApiProps }) => {
      if (item.isViewAll) {
        const isViewAllBtn = item.id === '__view_all__';
        return (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.moverCard, styles.viewAllCard]}
            onPress={() => {
              setMoverLimit(isViewAllBtn ? '15' : '5');
              refetchTopMovers();
              setTimeout(() => {
                topMoversListRef.current?.scrollToOffset({ offset: 0, animated: true });
              }, 50);
            }}
          >
            <Text style={styles.viewAllText}>{isViewAllBtn ? 'View all' : 'View Less'}</Text>
            <View style={styles.viewAllCircle}>
              <Text style={styles.viewAllArrow}>{!isViewAllBtn ? '<' : '>'}</Text>
            </View>
          </TouchableOpacity>
        );
      }

      const realTimeInfo = realTimeData[item.symbol];
      return (
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.moverCard}
          onPress={() => props.navigation?.navigate('Instrument', { item, nav: 'movers', index: 'equity' })}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoInitials}>{getInitials(item.symbol)}</Text>
          </View>
          <Text style={styles.moverName} numberOfLines={1}>
            {item.symbol}
          </Text>
          <Text style={styles.moverPrice}>₹ {isMarketHours ? realTimeInfo?.ltp : item.current_price}</Text>
          {isMarketHours ? (
            <Text
              style={[
                styles.moverChg,
                { color: realTimeInfo?.abs > 0 ? mainColors.greenText : mainColors.redText },
              ]}
            >
              {realTimeInfo?.abs?.toFixed(3)} ({realTimeInfo?.pct?.toFixed(2)}%)
            </Text>
          ) : (
            <Text
              style={[
                styles.moverChg,
                {
                  color:
                    item?.absolute_change > 0
                      ? mainColors.greenText
                      : item?.absolute_change === 0
                        ? mainColors.inputLabel
                        : mainColors.redText,
                },
              ]}
            >
              {item.absolute_change} ({item?.percentage_change}%)
            </Text>
          )}
        </TouchableOpacity>
      );
    },
    [realTimeData, isMarketHours, props.navigation, refetchTopMovers],
  );

  return (
    <View style={styles.mainView}>
      {botsLoading && !bots.length ? (
        <BotCardSkeleton />
      ) : (
        <FlatList
          ref={featureListRef}
          data={loopedBots}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => renderFeatureCard(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum
          contentContainerStyle={{ paddingHorizontal: CARD_SIDE_PADDING }}
          ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
          getItemLayout={(_, index) => ({
            length: ITEM_SIZE,
            offset: ITEM_SIZE * index,
            index,
          })}
          onScrollBeginDrag={onScrollBeginDrag}
          onMomentumScrollEnd={onFeatureScrollEnd}
          scrollEventThrottle={16}
        />
      )}

      <View style={styles.sectionHeaderRow}>
        <View style={styles.sectionHeaderLeft}>
          <Image source={Images.topMovers} resizeMode="contain" style={styles.tMimg} />
          <Text style={styles.sectionTitle}>Top Movers</Text>
        </View>
      </View>

      <View style={styles.moverTabsRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setActiveMoverTab('Gainers')}
          style={[
            styles.moverSegmentBtn,
            activeMoverTab === 'Gainers' ? styles.moverSegmentBtnActive : styles.moverSegmentBtnInActive,
          ]}
        >
          <Text style={[styles.moverSegmentText, activeMoverTab === 'Gainers' && styles.moverSegmentTextActive]}>
            Gainers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setActiveMoverTab('Losers')}
          style={[
            styles.moverSegmentBtn,
            activeMoverTab === 'Losers' ? styles.moverSegmentBtnActive : styles.moverSegmentBtnInActive,
          ]}
        >
          <Text style={[styles.moverSegmentText, activeMoverTab === 'Losers' && styles.moverSegmentTextActive]}>
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
          style={{
            borderWidth: 1,
            borderColor: mainColors.inputBorder,
            height: scaler(25),
            width: selectedValue === 'yesterday' ? scaler(100) : scaler(80),
            borderRadius: 15,
            paddingHorizontal: scaler(10),
          }}
          itemTextStyle={{ color: mainColors.white, fontFamily: fontFamily.poppinsRegular, fontSize: scaler(8) }}
          itemContainerStyle={{ backgroundColor: mainColors.black }}
          onChange={item => setSelectedValue(item.value)}
          activeColor={mainColors.inputBorder}
        />
      </View>

      {moversLoading ? (
        <MoversGridSkeleton />
      ) : (
        <View style={styles.moversGridWrap}>
          <FlatList
            ref={topMoversListRef}
            data={moversWithViewAll}
            keyExtractor={(item, index) => item.id ?? item.symbol ?? String(index)}
            renderItem={renderMoverGridCard}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            scrollEnabled={false}
          />
        </View>
      )}

      <View style={[styles.sectionHeaderRow, { marginTop: scaler(4) }]}>
        <View style={styles.sectionHeaderLeft}>
          <Image source={Images.topMovers} resizeMode="contain" style={styles.tMimg} />
          <Text style={styles.sectionTitle}>Hot News</Text>
        </View>
      </View>

      {newsLoading && !newsData?.length ? (
        <NewsListSkeleton />
      ) : (
        <View style={styles.newsCard}>
          <FlatList
            data={newsData}
            keyExtractor={item => item.title}
            renderItem={renderNewsItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.newsSeparator} />}
          />
        </View>
      )}

      <Image source={Images.line} resizeMode="contain" style={styles.line} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Terms and Privacy Policy {' | '} Trust &amp; Security {' | '} Careers
        </Text>
        <Text style={styles.footerText}>
          Investor Charter{' | '} Prices &amp; Charges {' | '} Grievance Redressal
        </Text>
        <Image source={Images.line} resizeMode="contain" style={styles.line} />
        <Text style={[styles.footerText]}>
          Made with <Text style={{ color: mainColors.red }}>♥</Text> India{' | '}
          Copyright © 2026 • <Text style={{ color: mainColors.mainButton }}>Asset Bridge</Text>
        </Text>
      </View>

      <RiskDisclosureScreen
        visible={showRiskModal}
        setVisible={setShowRiskModal}
        onPress={() => subs(selectedBotId)}
      />
    </View>
  );
}
