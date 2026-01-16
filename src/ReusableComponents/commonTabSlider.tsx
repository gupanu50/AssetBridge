import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { TopTabProps } from './commonTypes';
import scaler from '../Utils/scaler';
import { fontFamily, mainColors } from '../Utils/helper';

const CommonTabSlider = (props: TopTabProps) => {
  const topTabListRef: any = useRef(null);
  const onPressTopTab = (label: string, index: number) => {
    props?.setIsActive(label);
    try {
      topTabListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    } catch (e) { }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPressTopTab(props.label ?? '', props.index ?? 0)}
      style={[styles.topTabBtn, props?.style]}
    >
      {props?.isRightText ?
        <View style={styles.rightView}>
          <Text
            style={[styles.topTabText, props?.isActive && styles.topTabTextActive]}
          >
            {props.label}
          </Text>
          <View style={styles.buyView}>
            <Text style={styles.buyText}>Buy 1x</Text>
          </View>
        </View> :
        <Text
          style={[styles.topTabText, props?.isActive && styles.topTabTextActive]}
        >
          {props.label}
        </Text>
      }
      {props?.isActive ? (
        <View style={styles.topTabUnderline} />
      ) : (
        <View style={styles.topTabUnderlineOff} />
      )}
    </TouchableOpacity>
  );
};

export default CommonTabSlider;

const styles = StyleSheet.create({
  topTabBtn: {
    marginRight: scaler(18),
    alignItems: 'center',
    paddingTop: scaler(3),
  },
  topTabText: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
    paddingHorizontal: scaler(10),
    opacity: 0.8,
  },
  topTabTextActive: {
    opacity: 1,
    color: mainColors.blue,
  },
  topTabUnderline: {
    marginTop: scaler(6),
    height: scaler(3),
    width: '100%',
    borderRadius: 10,
    backgroundColor: mainColors.blue,
  },
  topTabUnderlineOff: {
    marginTop: scaler(6),
    height: scaler(2),
    width: '100%',
    backgroundColor: 'transparent',
  },
  rightView: {
    flexDirection: 'row'
  },
  buyView: {
    borderWidth: 1,
    paddingHorizontal: scaler(7),
    paddingVertical: scaler(1.5),
    borderRadius: 10,
    backgroundColor: mainColors.inputBorder
  },
  buyText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(10),
    color: mainColors.headingTextColor
  }
});
