/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
type buttonProps = {
  label: string;
  backgroundColor?: string;
  leftImage?: any;
  textColor?: string;
  extraStyle?: any;
  onPress?: any;
};
const CommonButton = (props: buttonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: props?.backgroundColor || mainColors.mainButton },
        props?.extraStyle,
      ]}
      onPress={props?.onPress}
    >
      {props?.leftImage && props?.leftImage}
      <Text
        style={[
          styles.labelText,
          {
            color: props?.textColor || mainColors.white,
            marginLeft: props?.leftImage ? scaler(10) : 0,
          },
        ]}
      >
        {props?.label}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  container: {
    height: scaler(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  labelText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(13),
  },
});
