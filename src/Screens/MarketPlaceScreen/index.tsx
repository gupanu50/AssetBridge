/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import CommonHeader from '../../ReusableComponents/commonHeader';
import scaler from '../../Utils/scaler';
import moment from 'moment';
import { fontFamily, getApiErrorMessage, mainColors } from '../../Utils/helper';
import { Images } from '../../Assets';
import IconButton from '../../ReusableComponents/iconButton';
import CommonButton from '../../ReusableComponents/commonButton';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { TopTabProps } from '../../ReusableComponents/commonTypes';
import { styles } from './styles';
import CommonTopBtnSlider from '../../ReusableComponents/commonTopBtnSlider';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { LineChart } from 'react-native-wagmi-charts';
import NotificationsModal from '../NotificationScreen';
import MarketPlaceOverviewComponent from '../../ReusableScreenComponents/MarketPlaceOverviewComponent';
import MarketPlaceTradesComponent from '../../ReusableScreenComponents/MarketPlaceTradesComponent';
import MarketPlacePnlCalendarComponent from '../../ReusableScreenComponents/MarketPlacePnLCalendarComponent';
import RiskDisclosureScreen from '../../ReusableComponents/riskDisclosureModal';
import snackbarHandler from '../../Utils/snackbarHandler';
import useCreatePaymentOrderMutation from './Hooks/useCreatePaymentOrderMutation';
// import PaymentScreen, { startRazorpayPayment } from '../../ReusableComponents/paymentComponent';
import useProfileQuery from '../ProfileScreen/Hooks/useProfileQuery';
import { startRazorpayPayment } from '../../ReusableComponents/paymentComponent';
import useVerifyPaymentMutation from './Hooks/usePaymentVerifyMutation';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
type Props = MainStackScreenProps<'MarketPlace'>;
const MarketPlaceScreen = ({ navigation, route }: Props) => {
  const [activeTopTab, setActiveTopTab] = useState('Overview');
  const [brokerage, setBrokerage] = useState('100');
  const [slipage, setSlipage] = useState('15');
  const { data } = useProfileQuery();
  const getInitials = (name?: string) => {
    const n = (name || '').trim();
    if (!n) return '?';

    const parts = n.split(/\s+/).filter(Boolean);

    // If multiple words => first char of first + first char of last
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    // Single word => first 2 chars
    const word = parts[0];
    return word.slice(0, 2).toUpperCase();
  };
  const profileData = data?.data?.data[0]
  // refs to keep tab visible while sliding
  const topTabListRef: any = useRef(null);
  const { mutate: subscribeMutate } = useCreatePaymentOrderMutation();
  const { mutate: verifyPaymentMutate } = useVerifyPaymentMutation();
  const subs = () => {
    subscribeMutate({
      bot_id: parseInt(route?.params?.cardData?.bot_id)
    }, {
      onSuccess: async (res) => {
        console.log('PaymentOrderCreateApiSuccess', res);
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
        console.log('ResultRazorPay', result?.data);
        console.log('RazorPayIds', result?.data?.razorpay_order_id, result?.data?.razorpay_payment_id, result?.data?.razorpay_signature)
        if (result.ok) {
          verifyPaymentMutate({
            razorpay_order_id: result?.data?.razorpay_order_id,
            razorpay_payment_id: result?.data?.razorpay_payment_id,
            razorpay_signature: result?.data?.razorpay_signature
          }, {
            onSuccess: (res) => {
              console.log('ResPaymentVerify', res)
              snackbarHandler.successToast('Payment is successfully verified');
              navigation.goBack();
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
      onError: (err) => {
        console.log('PaymentOrderCreateApiError', err);
        const message = getApiErrorMessage(err) || 'Subscription failed';
        snackbarHandler.errorToast(message);
      },
    });
  }
  console.log('MarketPlaceRouteParams', route?.params?.cardData)
  type Point = { timestamp: number; value: number };
  const DAY = 24 * 60 * 60 * 1000;
  const cardData = route?.params?.cardData;
  console.log('CardDataMarketPlaceScreen', cardData)
  const genSeries = (
    points: number,
    startValue: number,
    startTime: number,
    stepMs: number,
    volatility: number,
    drift: number
  ): Point[] => {
    let v = startValue;
    const out: Point[] = [];
    for (let i = 0; i < points; i++) {
      const noise = (Math.random() - 0.5) * volatility;
      v = Math.max(1, v + drift + noise);
      out.push({ timestamp: startTime + i * stepMs, value: +v.toFixed(2) });
    }
    return out;
  };

  const [range, setRange] = useState<"1M" | "6M" | "1Y" | "3Y" | "5Y" | "ALL">("1M");
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [showNoti, setShowNoti] = useState(false);
  const buildRangeData = (range: "1M" | "6M" | "1Y" | "3Y" | "5Y" | "ALL") => {
    // keep points reasonable for mobile performance
    const pointsMap = { "1M": 30, "6M": 90, "1Y": 120, "3Y": 180, "5Y": 220, "ALL": 260 } as const;
    const stepMap = { "1M": DAY, "6M": 2 * DAY, "1Y": 3 * DAY, "3Y": 6 * DAY, "5Y": 8 * DAY, "ALL": 11 * DAY } as const;

    const points = pointsMap[range];
    const stepMs = stepMap[range];
    const startTime = Date.now() - points * stepMs;

    const prices = genSeries(points, 92, startTime, stepMs, range === "1M" ? 2.2 : 1.6, range === "1M" ? 0.18 : 0.10);
    const shadow = genSeries(points, 94, startTime, stepMs, 1.1, 0.06); // grey line

    return { prices, shadow };
  };
  // -------------------- Remaining UI Data --------------------

  const { prices, shadow } = React.useMemo(() => buildRangeData(range), [range]);
  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Overview' },
      { id: 't2', label: 'PnL Calender' },
      { id: 't3', label: 'Trades' },
    ],
    [],
  );
  const renderTopTab = ({
    item,
    index,
  }: {
    item: TopTabProps;
    index: number;
  }) => {
    const isActive = activeTopTab === item.label;
    return (
      <CommonTabSlider
        activeTab="Overview"
        index={index}
        label={item?.label}
        isActive={isActive}
        setIsActive={setActiveTopTab}
      />
    );
  };
  const [showRiskModal, setShowRiskModal] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <CommonHeader onPressBell={() => setShowNoti(!showNoti)} navigation={navigation} />
      <NotificationsModal
        visible={showNoti}
        onClose={() => setShowNoti(!showNoti)}
        topOffset={scaler(80)}          // tweak: header height + margin
        arrowRightOffset={scaler(35)}   // tweak: align under bell icon
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaler(30) }}
      >
        <View style={styles.mainView}>
          {/* -------------------- Header Boxes -------------------- */}
          <CommonTopBtnSlider navigation={navigation} />
        </View>
        <View style={styles.boxNameView}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoInitials}>{getInitials(cardData?.name)}</Text>
          </View>
          <View>
            <Text style={styles.headingText}>
              {cardData?.name}
            </Text>
            <Text style={styles.subHeadingText}>{cardData.description}</Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.lineView} />
          <View style={[styles.publishedView, { marginTop: scaler(10) }]}>
            <Text style={styles.headingPubText}>Published on {'  '}</Text>
            <Text style={styles.subHeadingPubText}>:{'  '} {moment(cardData?.backtest_results?.summary?.start_date).format('DD MMM, YYYY')}</Text>
          </View>
          <View style={[styles.publishedView, { marginTop: scaler(10) }]}>
            <Text style={styles.headingPubText}>Margin {'             '}</Text>
            <Text style={styles.subHeadingPubText}>:{'  '} {cardData?.minimum_capital_required}</Text>
          </View>
          <View style={[styles.publishedView, { marginTop: scaler(10) }]}>
            <Text style={styles.headingPubText}>Activate on {'     '}</Text>
            <View style={styles.activatedValueView}>
              <Text style={styles.subHeadingPubText}>:{'  '}</Text>
              <View style={styles.activatedValueView1}>
                <Text style={styles.activatedValueText}>M</Text>
              </View>
              <View style={styles.activatedValueView1}>
                <Text style={styles.activatedValueText}>T</Text>
              </View>
              <View style={styles.activatedValueView1}>
                <Text style={styles.activatedValueText}>W</Text>
              </View>
              <View style={styles.activatedValueView1}>
                <Text style={styles.activatedValueText}>-</Text>
              </View>
              <View style={styles.activatedValueView1}>
                <Text style={styles.activatedValueText}>F</Text>
              </View>
              <View style={styles.activatedValueView1}>
                <Text style={styles.activatedValueText}>-</Text>
              </View>
              <View style={styles.activatedValueView1}>
                <Text style={styles.activatedValueText}>S</Text>
              </View>
            </View>
          </View>
          <View style={styles.lineView} />
          <View style={styles.featureActionsRow}>
            <View style={styles.actionPill}>
              <Image
                source={Images.swiperIntraday}
                resizeMode="contain"
                style={styles.inInsRunImg}
              />
              <Text style={styles.actionText}>Intraday</Text>
            </View>
            <View style={styles.actionPill}>
              <Image
                source={Images.swiperInstument}
                resizeMode="contain"
                style={styles.inInsRunImg}
              />
              <Text style={styles.actionText}>Sensex</Text>
            </View>
            <View style={styles.actionPill}>
              <Image
                source={Images.swiperInstument}
                resizeMode="contain"
                style={styles.inInsRunImg}
              />
              <Text style={[styles.actionText, { color: mainColors.descText }]}>
                Buy
              </Text>
            </View>
          </View>
          <View style={styles.lineView} />
          {/* <View style={styles.onlyHeight}>
            <Image
              source={Images.tempChart}
              resizeMode="contain"
              style={styles.logoImg}
            />
          </View> */}
          <View style={styles.lineChartView}>
            {/* Shadow line (grey) */}
            <LineChart.Provider data={shadow}>
              <LineChart height={scaler(180)} width={SCREEN_WIDTH - scaler(44)}>
                {/* <LineChart.Dot at={2} /> */}
                <LineChart.Path color="rgba(255,255,255,0.20)" />
              </LineChart>
            </LineChart.Provider>

            {/* Main line (green) + cursor/tooltip */}
            <View style={styles.lineChartView1}>
              <LineChart.Provider data={prices}>
                <LineChart height={scaler(180)} width={SCREEN_WIDTH - scaler(44)}>
                  {/* optional: gradient fill (if you want greyish feel) */}
                  <LineChart.Gradient />

                  <LineChart.Path color="rgba(22,199,132,1)" />

                  <LineChart.CursorCrosshair>
                    <LineChart.Tooltip style={{ backgroundColor: '#262626', borderRadius: 15 }} textStyle={{ color: mainColors.white }} />
                  </LineChart.CursorCrosshair>
                </LineChart>
              </LineChart.Provider>
            </View>
            <View style={styles.flexView1}>
              {(["1M", "6M", "1Y", "3Y", "5Y", "ALL"] as const).map((t) => {
                const active = range === t;
                return (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setRange(t)}
                    style={[styles.buttonsView, { backgroundColor: active ? "#0072BC" : '#1F1F1F', }]}
                  >
                    <Text style={{ color: active ? mainColors.white : mainColors.headingTextColor, fontSize: scaler(11), fontFamily: fontFamily.poppinsRegular }}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.lineView} />
          <Text style={styles.recomText}>Recommended Trade Log Summary</Text>
          <Text style={styles.recomDateText}>(20 Nov 25 - 01 Dec 25)</Text>
          <View style={styles.radioBox}>
            <Text style={styles.brokerageText}>
              Brokerage, Taxes, and Slippage not included. Add to update your
              results. Lorem Ipsum some dummy text
            </Text>
            <View style={styles.whatsView}>
              {/* <Text style={styles.whatsText}>What's this?</Text>
              <IconButton
                vectorType="MaterialCommunityIcons"
                name="information-outline"
                size={scaler(20)}
                color={mainColors.mainButton}
                backgroundColor={mainColors.black}
              /> */}
              <View style={styles.addView}>
                <Text style={styles.addText}>Add</Text>
                <Switch
                  trackColor={{ false: '#767577', true: 'green' }}
                  thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>

            <View style={styles.featureStatsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Brokerage</Text>
                <View style={styles.statValueRow}>
                  {isEnabled ? <CommonTextInput
                    value={brokerage}
                    setValue={setBrokerage}
                    style={{
                      color: mainColors.white,
                      paddingLeft: scaler(5),
                      fontSize: scaler(13),
                      width: '60%',
                      height: scaler(38)
                    }}
                    containerStyle={{
                      height: scaler(25),
                      borderWidth: 0
                    }}
                    placeholder='Enter Brokerage'
                  /> : <Text style={styles.statValue}>{100}</Text>}
                  {isEnabled && <View style={styles.swiperPnlView}>
                    <Image
                      source={Images.marketPlaceEdit}
                      resizeMode="contain"
                      style={styles.swiperUpImg}
                    />
                  </View>}
                </View>
              </View>

              <View style={styles.statBox}>
                <Text style={[styles.statLabel, { paddingLeft: 5 }]}>
                  Taxes & Charges
                </Text>
                <View style={[styles.statValueRow, { paddingLeft: 5 }]}>
                  <Text style={styles.statValue}>₹100,00,000</Text>
                </View>
              </View>

              <View
                style={[
                  styles.statBox,
                  {
                    borderRightWidth: 0,
                  },
                ]}
              >
                <Text style={[styles.statLabel, { paddingLeft: 5 }]}>
                  Slippage
                </Text>
                <View style={[styles.statValueRow, { paddingLeft: 5 }]}>
                  {/* <Text style={styles.statValue}>30%</Text> */}
                  {isEnabled ?
                    <CommonTextInput
                      value={slipage}
                      setValue={setSlipage}
                      style={{
                        color: mainColors.white,
                        paddingLeft: scaler(5),
                        fontSize: scaler(12),
                        width: '60%',
                        height: scaler(35)
                      }}
                      containerStyle={{
                        height: scaler(25),
                        borderWidth: 0
                      }}
                      placeholder='Enter Brokerage'
                    /> :
                    <Text style={styles.statValue}>30%</Text>}
                  {isEnabled && <View style={styles.swiperPnlView}>
                    <Image
                      source={Images.marketPlaceEdit}
                      resizeMode="contain"
                      style={styles.swiperUpImg}
                    />
                  </View>}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.resultsBasedView}>
            <View style={styles.redIconView}>
              <IconButton
                vectorType="MaterialCommunityIcons"
                name="information-outline"
                color={mainColors.errorRed}
                backgroundColor={mainColors.black}
              />
            </View>
            <View>
              <Text style={styles.redIconText}>
                {`The results are bssed on past data. Historical${'\n'} data does not guarantee future results.`}
              </Text>
              <CommonButton
                label="Know more"
                backgroundColor="transparent"
                textColor={mainColors.mainButton}
                extraStyle={styles.btnKnow}
              />
            </View>
          </View>
          {cardData?.is_subscribed ?
            <CommonButton
              label='Subscribe'
              extraStyle={styles.unSubs}
              backgroundColor='#191919'
              disabled={true}
            />
            :
            < TouchableOpacity onPress={() => setShowRiskModal(true)}>
              <ImageBackground source={Images.subscribeBg} style={styles.subs}>
                <Text style={styles.subsText}>SUBSCRIBE</Text>
              </ImageBackground>
            </TouchableOpacity>}
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
          {/* -------------------- Remaining UI (Overview Section) -------------------- */}
          {activeTopTab === 'Overview' && <MarketPlaceOverviewComponent cardData={cardData} />}
          {activeTopTab === 'PnL Calender' &&
            <MarketPlacePnlCalendarComponent
              dailyPnl={cardData?.backtest_results?.daily_pnl ?? []}
              initialMonth={1}   // September = 8 (0-based) optional
              initialYear={2026} // optional
            />}
          {activeTopTab === 'Trades' && <MarketPlaceTradesComponent trades={cardData?.backtest_results?.trade_logic} pageSize={3} otherData={cardData} />}
        </View>
      </ScrollView >
      <RiskDisclosureScreen visible={showRiskModal} setVisible={setShowRiskModal} onPress={subs} />
    </View >
  );
};

export default MarketPlaceScreen;
