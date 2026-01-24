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
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CommonCard = (props: PropCommonCardTypes) => {
  const [activeDayMonthMoverTab, setActiveDayMonthMoverTab] = useState('Month');
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

  const pnlColor = String(props.pAndLChange || '')
    .trim()
    .startsWith('-')
    ? mainColors.red
    : mainColors.green;

  return (
    <TouchableOpacity style={styles.featureCardWrapper} onPress={props?.onPress}>
      <View style={styles.featureCard}>
        <View style={styles.featureTopRow}>
          <View style={styles.featureLeft}>
            <Image
              source={props.logo}
              resizeMode="contain"
              style={styles.swiperLogo}
            />
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
                width: scaler(105),
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveDayMonthMoverTab('Day')}
              style={[
                styles.moverDaySegmentBtn,
                activeDayMonthMoverTab === 'Day' &&
                styles.moverDayMonthSegmentBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.moverDaySegmentText,
                  activeDayMonthMoverTab === 'Day' &&
                  styles.moverDayMonthSegmentTextActive,
                ]}
              >
                Day
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveDayMonthMoverTab('Month')}
              style={[
                styles.moverDayMonthSegmentBtn,
                activeDayMonthMoverTab === 'Month' &&
                styles.moverDayMonthSegmentBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.moverDayMonthSegmentText,
                  activeDayMonthMoverTab === 'Month' &&
                  styles.moverDayMonthSegmentTextActive,
                ]}
              >
                Month
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
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
              <Text style={styles.statValue}>{props.ltp}</Text>
              <View style={styles.swiperPnlView}>
                <Image
                  source={Images.swiperUp}
                  resizeMode="contain"
                  style={styles.swiperUpImg}
                />
                <Text style={[styles.statChange, { color: ltpColor }]}>
                  {props.ltpChange}
                </Text>
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
                  {props.intradayChange}
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
              <Text style={styles.statValue}>{props.pAndL}</Text>
              <View style={styles.swiperMaxDDView}>
                <Image
                  source={Images.swiperDown}
                  resizeMode="contain"
                  style={styles.swiperUpImg}
                />
                <Text style={[styles.statChange, { color: pnlColor }]}>
                  {props.pAndLChange}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.featureActionsRow}>
          <View style={styles.actionPill}>
            <Image
              source={Images.swiperIntraday}
              resizeMode="contain"
              style={styles.inInsRunImg}
            />
            <Text style={styles.actionText}>Intraday</Text>
          </View>
          <View style={[styles.actionPill, { marginRight: scaler(20) }]}>
            <Image
              source={Images.swiperInstument}
              resizeMode="contain"
              style={styles.inInsRunImg}
            />
            <Text style={styles.actionText}>Instrument</Text>
          </View>
          <View style={[styles.actionPill, styles.actionPillGreen]}>
            <Image
              source={Images.swiperRunning}
              resizeMode="contain"
              style={styles.inInsRunImg}
            />
            <Text style={[styles.actionText, { color: mainColors.white }]}>
              {props.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommonCard;

const styles = StyleSheet.create({
  featureCardWrapper: {
    width: SCREEN_WIDTH - scaler(30),
  },
  featureCard: {
    marginTop: scaler(10),
    borderRadius: scaler(12),
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    padding: scaler(12),
    backgroundColor: mainColors.moversCards,
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
    fontSize: scaler(8),
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
    fontSize: scaler(12),
    marginRight: scaler(6),
  },
  statChange: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(10),
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
    marginRight: 0,
    backgroundColor: mainColors.swiperPnl,
    borderColor: 'transparent',
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
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    borderRadius: 999,
    padding: scaler(4),
    width: scaler(86),
  },
  moverDayMonthSegmentBtn: {
    justifyContent: 'center',
    borderRadius: 999,
    width: scaler(55),
    alignItems: 'center'
  },
  moverDayMonthSegmentText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(12),
    opacity: 0.7,
  },
  moverDayMonthSegmentBtnActive: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    backgroundColor: mainColors.mainButton,
  },
  moverDayMonthSegmentTextActive: {
    opacity: 1,
  },
  moverDaySegmentBtn: {
    borderRadius: 999,
    justifyContent: 'center',
    width: scaler(40),
    alignItems: 'center'
  },
  moverDaySegmentText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(12),
    opacity: 0.7,
  },
  swiperPnlView: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mainColors.swiperBgPnl,
    paddingHorizontal: scaler(6),
    paddingVertical: scaler(3),
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
    paddingHorizontal: scaler(6),
    paddingVertical: scaler(3),
  },
});
