/* eslint-disable react-native/no-inline-styles */
import {
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
import { fontFamily, mainColors } from '../../Utils/helper';
import { Images } from '../../Assets';
import IconButton from '../../ReusableComponents/iconButton';
import CommonButton from '../../ReusableComponents/commonButton';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { TopTabProps } from '../../ReusableComponents/commonTypes';
import { styles } from './styles';
import CommonTopBtnSlider from '../../ReusableComponents/commonTopBtnSlider';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { LineChart } from 'react-native-wagmi-charts';
type Props = MainStackScreenProps<'MarketPlace'>;
const MarketPlaceScreen = ({ navigation }: Props) => {
  const [activeTopTab, setActiveTopTab] = useState('Overview');
  // refs to keep tab visible while sliding
  const topTabListRef: any = useRef(null);
  type Point = { timestamp: number; value: number };
  const DAY = 24 * 60 * 60 * 1000;

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
  const [aboutExpanded, setAboutExpanded] = useState(true);
  const [disclaimerExpanded, setDisclaimerExpanded] = useState(true);
  const [range, setRange] = useState<"1M" | "6M" | "1Y" | "3Y" | "5Y" | "ALL">("1M");
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
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
  const aboutBullets = useMemo(
    () => [
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type",
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    ],
    [],
  );

  const disclaimerBullets = useMemo(
    () => [
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type",
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    ],
    [],
  );

  const renderBulletList = (items: string[], expanded: boolean) => {
    const list = expanded ? items : items.slice(0, 2);
    return (
      <View style={{ marginTop: scaler(10) }}>
        {list.map((t, idx) => (
          <View key={`${idx}`} style={styles.bulletRow}>
            <Text style={styles.bulletDot}>{'\u2022'}</Text>
            <Text style={styles.bulletText}>{t}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderViewLessMore = (
    expanded: boolean,
    onPress: () => void,
    labelExpanded = 'View Less',
    labelCollapsed = 'View More',
  ) => {
    return (
      <View style={styles.viewMoreRow}>
        <Text onPress={onPress} style={styles.viewMoreText}>
          {expanded ? labelExpanded : labelCollapsed}
        </Text>

        <View style={styles.viewMoreIconWrap}>
          <IconButton
            vectorType="MaterialCommunityIcons"
            name={expanded ? 'chevron-up' : 'chevron-down'}
            color={mainColors.mainButton}
            backgroundColor={mainColors.black}
            onPress={onPress}
          />
        </View>
      </View>
    );
  };
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
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <CommonHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaler(30) }}
      >
        <View style={styles.mainView}>
          {/* -------------------- Header Boxes -------------------- */}
          <CommonTopBtnSlider navigation={navigation} />
        </View>
        <View style={styles.boxNameView}>
          <View style={styles.imgView}>
            <Image
              source={Images.swiperLogo}
              style={styles.logoImg}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.headingText}>
              TradeMilaan Sensex Buying DTE 0, 1, 2, 3,4,5...
            </Text>
            <Text style={styles.subHeadingText}>By Deviprasad Panathila</Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.lineView} />
          <View style={[styles.publishedView, { marginTop: scaler(10) }]}>
            <Text style={styles.headingPubText}>Published on {'  '}</Text>
            <Text style={styles.subHeadingPubText}>:{'  '} 14 Nov, 2025</Text>
          </View>
          <View style={[styles.publishedView, { marginTop: scaler(10) }]}>
            <Text style={styles.headingPubText}>Margin {'             '}</Text>
            <Text style={styles.subHeadingPubText}>:{'  '} 100000</Text>
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
              <Text style={styles.whatsText}>What's this?</Text>
              <IconButton
                vectorType="MaterialCommunityIcons"
                name="information-outline"
                size={scaler(20)}
                color={mainColors.mainButton}
                backgroundColor={mainColors.black}
              />
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
                  <Text style={styles.statValue}>{100}</Text>
                  <View style={styles.swiperPnlView}>
                    <Image
                      source={Images.marketPlaceEdit}
                      resizeMode="contain"
                      style={styles.swiperUpImg}
                    />
                  </View>
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
                  <Text style={styles.statValue}>30%</Text>
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
          <ImageBackground source={Images.subscribeBg} style={styles.subs}>
            <Text style={styles.subsText}>SUBSCRIBE</Text>
          </ImageBackground>
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
          {activeTopTab === 'Overview' ? (
            <>
              {/* Summary Card */}
              <View style={styles.summaryCard}>
                {/* Row 1 */}
                <View style={styles.summaryRow}>
                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryLabel}>Overall PnL</Text>
                    <Text
                      style={[styles.summaryValue, { color: mainColors.green }]}
                    >
                      ₹ 1,00,000
                    </Text>
                  </View>

                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryLabel}>Overall PnL</Text>
                    <Text
                      style={[styles.summaryValue, { color: mainColors.red }]}
                    >
                      ₹ -32,000
                    </Text>
                  </View>
                </View>

                {/* Win/Loss bar */}
                <View style={styles.winLossRow}>
                  <View style={styles.summaryWinLossCol}>
                    <Text style={styles.summaryWinLossLabel}>Win</Text>
                    <Text style={styles.summarySmallValue}>₹ 1,00,000</Text>
                  </View>

                  <View style={styles.summaryWinLossCol}>
                    <Text style={styles.summaryWinLossLabel}>Loss</Text>
                    <Text style={styles.summarySmallValue}>23%</Text>
                  </View>
                </View>

                <View style={styles.progressTrack}>
                  <View style={styles.progressFill} />
                </View>

                <View style={styles.summaryDivider} />

                {/* Row 2 */}
                <View style={styles.summaryRow}>
                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryLabel}>Total Trades</Text>
                    <Text style={styles.summaryValuePlain}>150</Text>
                  </View>

                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryLabel}>Average PnL / Trade</Text>
                    <Text style={styles.summaryValuePlain}>₹ 18,000</Text>
                  </View>
                </View>

                <View style={styles.summaryDivider} />

                {/* Row 3 */}
                <View style={styles.summaryRow}>
                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryLabel}>
                      Reward to Risk Ratio
                    </Text>
                    <Text style={styles.summaryValuePlain}>2.30</Text>
                  </View>

                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryLabel}>Expectancy Ratio</Text>
                    <Text style={styles.summaryValuePlain}>0.99</Text>
                  </View>
                </View>

                <View style={styles.summaryDivider} />

                {/* Row 4 */}
                <View style={styles.summaryRow}>
                  <View style={styles.summaryCol}>
                    <Text style={[styles.summaryLabel, { color: mainColors.headingTextColor }]}>Maximum Profit</Text>
                    <Text
                      style={[styles.summaryValue, { color: mainColors.greenText }]}
                    >
                      ₹ 99,000
                    </Text>
                  </View>

                  <View style={styles.summaryCol}>
                    <Text style={[styles.summaryLabel, { color: mainColors.headingTextColor }]}>Maximum Loss</Text>
                    <Text
                      style={[styles.summaryValue, { color: mainColors.redText }]}
                    >
                      ₹ -54,000
                    </Text>
                  </View>
                </View>
              </View>

              {/* About this Algo */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>About this Algo</Text>

                {renderBulletList(aboutBullets, aboutExpanded)}

                {renderViewLessMore(aboutExpanded, () =>
                  setAboutExpanded(prev => !prev),
                )}
              </View>

              {/* Disclaimer */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Disclaimer</Text>

                {renderBulletList(disclaimerBullets, disclaimerExpanded)}

                {renderViewLessMore(disclaimerExpanded, () =>
                  setDisclaimerExpanded(prev => !prev),
                )}
              </View>
            </>
          ) : null}
          {activeTopTab === 'PnL Calender' && <Image source={Images.pnl} resizeMode='contain' style={styles.pnlDemoImg} />}
          {activeTopTab === 'Trades' && <Image source={Images.trades} resizeMode='contain' style={styles.tradesDemoImg} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default MarketPlaceScreen;
