/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { fontFamily, mainColors } from '../Utils/helper';
import { Images } from '../Assets';
import scaler from '../Utils/scaler';
import { PropCommonCardTypes } from './commonTypes';
import IconButton from './iconButton';
import { LineChart } from 'react-native-wagmi-charts';
import { formatAmount, getInitials } from './commonFunctions';
const { width: SCREEN_WIDTH } = Dimensions.get('window');


const CommonAlgoMarketPlaceCard = (props: PropCommonCardTypes) => {
  type Point = { timestamp: number; value: number };
  const DAY = 24 * 60 * 60 * 1000;
  const rangeOptions = ["1M", "6M", "1Y", "3Y", "5Y", "ALL"] as const;
  const [range, setRange] = useState<RangeType>("1M");
  type RangeType = typeof rangeOptions[number];
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
  const onArrowPress = (direction: "left" | "right") => {
    const currentIndex = rangeOptions.indexOf(range);
    if (direction === "left" && currentIndex > 0) {
      setRange(rangeOptions[currentIndex - 1]);
    } else if (direction === "right" && currentIndex < rangeOptions.length - 1) {
      setRange(rangeOptions[currentIndex + 1]);
    }
  };
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


  const [activeDayMonthMoverTab, setActiveDayMonthMoverTab] = useState('Month');
  // const [range, setRange] = useState<"1M" | "6M" | "1Y" | "3Y" | "5Y" | "ALL">("1M");

  const { prices, shadow } = React.useMemo(() => buildRangeData(range), [range]);
  const ltpColor = String(props.ltpChange || '')
    .trim()
    .startsWith('-')
    ? mainColors.red
    : mainColors.swiperPnl;

  const intraColor = String(props.intradayChange || '')
    .trim()
    .startsWith('-')
    ? mainColors.red
    : mainColors.green;
  return (
    <View style={styles.featureCardWrapper}>
      <View style={styles.featureCard}>
        <View style={styles.featureTopRow}>
          <View style={styles.featureLeft}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoInitials}>{getInitials(props.name)}</Text>
            </View>
            <View style={{ marginLeft: scaler(10), flex: 1 }}>
              <Text style={styles.featureTitle} numberOfLines={1}>
                {props.name}
              </Text>
              <Text style={styles.featureSub} numberOfLines={1}>
                {props.sub}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.flexView}>
          <View
            style={[
              styles.moverDayMonthSegment,
              {
                width:
                  activeDayMonthMoverTab === 'Month' ? scaler(83) : scaler(86),
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onArrowPress("left")}
              disabled={range === "1M"} // disable when at first
              style={[styles.moverDaySegmentBtn, range === "1M" && { opacity: 0.4 }]}
            >
              <IconButton
                vectorType="MaterialCommunityIcons"
                onPress={() => onArrowPress("left")}
                name="chevron-left"
                color={mainColors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onArrowPress("right")}
              disabled={range === "ALL"} // disable when at last
              style={[styles.moverDayMonthSegmentBtn, range === "ALL" && { opacity: 0.4 }]}
            >
              <IconButton
                name="chevron-right"
                onPress={() => onArrowPress("right")}
                color={mainColors.white}
                vectorType="MaterialCommunityIcons"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.monthText}>{range}</Text>
          <TouchableOpacity onPress={props?.onPress}>
            <Image
              source={Images.swiperView}
              resizeMode="contain"
              style={styles.swiperViewImg}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.featureStatsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>PNL Value</Text>
            <View style={styles.statValueRow}>
              <Text style={[styles.statValue, { marginRight: scaler(4) }]}>{formatAmount(props.ltp)}</Text>
              <View style={[styles.swiperPnlView, { paddingHorizontal: scaler(4) }]}>
                <Image
                  source={Images.swiperUp}
                  resizeMode="contain"
                  style={styles.swiperUpImg}
                />
                {props?.ltpChange?.toString().length > 8 ?
                  <Text style={[styles.statChange, { color: ltpColor }]}>
                    {props.ltpChange?.toString().slice(0, 2) + "..."}%
                  </Text> :
                  <Text style={[styles.statChange, { color: ltpColor }]}>
                    {props.ltpChange ?? 0}%
                  </Text>}
              </View>
            </View>
          </View>

          <View style={styles.statBox}>
            <Text style={[styles.statLabel, { paddingLeft: 5 }]}>
              Reward/Risk Ratio
            </Text>
            <View style={[styles.statValueRow, { paddingLeft: 5 }]}>
              <Text style={styles.statValue}>{props.intraday}</Text>
              <View style={styles.swiperPnlView}>
                <Image
                  source={Images.swiperUp}
                  resizeMode="contain"
                  style={styles.swiperUpImg}
                />
                <Text style={[styles.statChange, { color: intraColor }]}>
                  {props.intradayChange ?? 0}%
                </Text>
              </View>
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
            <Text style={[styles.statLabel, { paddingLeft: 5 }]}>Max DD</Text>
            <View style={[styles.statValueRow, { paddingLeft: 5 }]}>
              <Text style={styles.statValue}>{formatAmount(props.pAndL)}</Text>
              <View style={styles.swiperMaxDDView}>
                <Image
                  source={Images.swiperDown}
                  resizeMode="contain"
                  style={styles.swiperUpImg}
                />
                <Text style={[styles.statChange, { color: mainColors.redText }]}>
                  {props.pAndLChange ?? 0}%
                </Text>
              </View>
            </View>
          </View>
        </View>
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
            {rangeOptions.map((t) => {
              const active = range === t;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => setRange(t)}
                  style={[styles.buttonsView, { backgroundColor: active ? "#0072BC" : '#1F1F1F' }]}
                >
                  <Text
                    style={{
                      color: active ? mainColors.white : mainColors.headingTextColor,
                      fontSize: scaler(11),
                      fontFamily: fontFamily.poppinsRegular,
                    }}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.featureActionsRow}>
          <View style={styles.actionPill}>
            <Image
              source={Images.swiperIntraday}
              resizeMode="contain"
              style={styles.inInsRunImg}
            />
            <Text style={styles.actionText}>{props?.intra ?? 'Intraday'}</Text>
          </View>
          <View style={styles.actionPill}>
            <Image
              source={Images.swiperInstument}
              resizeMode="contain"
              style={styles.inInsRunImg}
            />
            <Text style={styles.actionText}>{props?.instr ?? 'Instrument'}</Text>
          </View>
          <TouchableOpacity style={[styles.actionPillGreen]} onPress={props.onPressSubscribe}>
            {(props?.is_subscribed && props?.status === 'pause') ?
              <Image
                source={Images.pausedBtn}
                resizeMode="contain"
                style={styles.imgView}
              /> :
              (props?.is_subscribed && props?.status === 'run') ?
                <Image
                  source={Images.runningBtn}
                  resizeMode="contain"
                  style={styles.imgView}
                />
                :
                <Image
                  source={Images.subscribeBtn}
                  resizeMode="contain"
                  style={styles.imgView}
                />
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommonAlgoMarketPlaceCard;

const styles = StyleSheet.create({
  logoCircle: {
    height: scaler(30),
    width: scaler(30),
    borderRadius: scaler(15),
    backgroundColor: mainColors.pnlCard, // choose any existing color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInitials: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  imgView: {
    height: '100%', width: '100%'
  },
  featureCardWrapper: {
    width: SCREEN_WIDTH - scaler(20),
  },
  flexView1: { flexDirection: 'row' },
  featureCard: {
    marginTop: scaler(10),
    borderRadius: scaler(12),
    borderWidth: 1,
    padding: scaler(12),
    backgroundColor: mainColors.googleButton,
  },
  featureTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: scaler(10),
  },
  featureTitle: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  featureSub: {
    marginTop: scaler(2),
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
  },
  featureStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(12),
    paddingLeft: scaler(12),
    borderRadius: 20,
    paddingVertical: scaler(5),
    backgroundColor: mainColors.pnlCard,
  },
  statBox: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: mainColors.inputBorder,
  },
  statLabel: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(9),
    opacity: 0.65,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(4),
  },
  statValue: {
    fontFamily: fontFamily.poppinsSemiBold,
    color: mainColors.white,
    fontSize: scaler(10),
    marginRight: scaler(6),
  },
  statChange: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(8),
  },
  featureActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaler(12),
  },
  actionPill: {
    paddingRight: scaler(5),
    paddingVertical: scaler(5),
    flexDirection: 'row',
    marginHorizontal: scaler(5),
    borderRadius: 999,
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    alignItems: 'center',
  },
  inInsRunImg: {
    height: scaler(20),
    width: scaler(20),
    marginLeft: scaler(2),
  },
  actionPillGreen: {
    height: scaler(30),
    width: scaler(140),
  },
  actionText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.descText,
    fontSize: scaler(12),
    marginLeft: scaler(4),
  },
  flexView: {
    flexDirection: 'row',
    height: scaler(30),
    alignSelf: 'flex-end',
  },
  swiperLogo: {
    height: scaler(30),
    width: scaler(30),
  },
  moverDayMonthSegment: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: scaler(10),
    width: scaler(86),
  },
  moverDayMonthSegmentBtn: {
    justifyContent: 'center',
    borderRadius: 999,
  },
  moverDayMonthSegmentText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(10),
    opacity: 0.7,
  },
  moverDayMonthSegmentBtnActive: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    paddingHorizontal: scaler(7),
    backgroundColor: mainColors.mainButton,
  },
  moverDayMonthSegmentTextActive: {
    opacity: 1,
  },
  moverDaySegmentBtn: {
    borderRadius: 999,
    justifyContent: 'center',
    marginRight: scaler(10),
  },
  moverDaySegmentText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(10),
    opacity: 0.7,
  },
  swiperPnlView: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mainColors.swiperBgPnl,
    paddingHorizontal: scaler(6),
    paddingVertical: scaler(1),
  },
  swiperViewImg: {
    height: scaler(26),
    marginLeft: scaler(10),
    width: scaler(26),
  },
  swiperUpImg: {
    height: scaler(7),
    width: scaler(7),
    marginRight: scaler(2),
  },
  swiperMaxDDView: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mainColors.swiperMaxDDbg,
    paddingHorizontal: scaler(4),
    paddingVertical: scaler(1),
  },
  monthText: {
    color: mainColors.white,
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(12),
    alignSelf: 'center',
  },
  lineChartView: { height: scaler(220), marginTop: scaler(10) },
  lineChartView1: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  buttonsView: {
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(2),
    borderRadius: 25,
    marginRight: scaler(20),
  }
});
