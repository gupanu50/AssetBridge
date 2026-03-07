import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NewsItemProps } from './commonTypes';
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import moment from 'moment';

const CommonNews = (props: NewsItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={[styles.newsItem]}>
      <View style={styles.newsLeft}>
        <Image source={{ uri: props.img }} resizeMode="contain" style={styles.newsImg} />
        <Text style={styles.newsTime}>{moment(props.published_at).fromNow()}</Text>
      </View>

      <View style={styles.newsRight}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonNews;

const styles = StyleSheet.create({
  newsItem: {
    paddingVertical: scaler(10),
    backgroundColor: mainColors.googleButton,
    paddingHorizontal: scaler(12),
    paddingBottom: scaler(12),
  },
  newsLeft: {
    width: scaler(95),
    paddingRight: scaler(10),
    flexDirection: 'row',
  },
  newsImg: {
    height: scaler(50),
    width: scaler(80),
  },
  newsTime: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.headingTextColor,
    fontSize: scaler(12),
    marginLeft: scaler(5),
    alignSelf: 'center',
  },
  newsRight: {
    flex: 1,
    justifyContent: 'center',
    marginTop: scaler(15)
  },
  newsTitle: {
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white,
    fontSize: scaler(12),
    lineHeight: scaler(16),
  },
});
