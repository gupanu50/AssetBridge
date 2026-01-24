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
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CommonAlgoMarketPlaceCard = (props: PropCommonCardTypes) => {
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
                width:
                  activeDayMonthMoverTab === 'Month' ? scaler(83) : scaler(86),
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveDayMonthMoverTab('Day')}
              style={[styles.moverDaySegmentBtn]}
            >
              <IconButton
                vectorType="MaterialCommunityIcons"
                name="chevron-left"
                color={mainColors.descText}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveDayMonthMoverTab('Month')}
              style={[
                styles.moverDayMonthSegmentBtn,
                // activeDayMonthMoverTab === 'Month' &&
                //   styles.moverDayMonthSegmentBtnActive,
              ]}
            >
              <IconButton
                name="chevron-right"
                color={mainColors.white}
                vectorType="MaterialCommunityIcons"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.monthText}>1M</Text>
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
        <View style={{ height: scaler(220) }}>
          <Image
            source={Images.algoMarketChart}
            resizeMode="contain"
            style={{ height: '100%', width: '100%' }}
          />
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
          <View style={styles.actionPill}>
            <Image
              source={Images.swiperInstument}
              resizeMode="contain"
              style={styles.inInsRunImg}
            />
            <Text style={styles.actionText}>Instrument</Text>
          </View>
          <View style={[styles.actionPillGreen]}>
            {/* <Image
              source={Images.swiperRunning}
              resizeMode="contain"
              style={styles.inInsRunImg}
            />
            <Text style={[styles.actionText, { color: mainColors.white }]}>
              {props.status}
            </Text> */}
            <Image
              source={Images.subscribeBtn}
              resizeMode="contain"
              style={{ height: '100%', width: '100%' }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommonAlgoMarketPlaceCard;

const styles = StyleSheet.create({
  featureCardWrapper: {
    width: SCREEN_WIDTH - scaler(20),
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
});
