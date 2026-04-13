import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NewsItemProps } from './commonTypes';
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import moment from 'moment';

const CommonNews = (props: NewsItemProps) => {
  return (
    <TouchableOpacity style={[styles.newsItem]} onPress={props?.onPress}>
      <View style={styles.flexView}>
        <View style={styles.newsLeft}>
          <Text style={styles.sourceText}>{props?.source?.slice(0, 15) + '...'}</Text>
        </View>
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
    backgroundColor: mainColors.lastUpdatedBg,
    borderRadius: 10,
    paddingVertical: scaler(2),
    paddingHorizontal: scaler(10)
  },
  newsImg: {
    height: '100%',
    width: '100%',
  },
  newsTime: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.headingTextColor,
    fontSize: scaler(12),
  },
  sourceText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(12),
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
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
