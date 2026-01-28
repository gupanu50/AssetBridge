import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import { inputProps } from './commonTypes';

const CommonTextInput = (props: inputProps) => {
  return (
    <View style={[styles.container, props?.containerStyle]}>
      {props?.leftImage && props?.leftImage}
      <TextInput
        placeholder={props.placeholder || ''}
        placeholderTextColor={mainColors.inputLabel}
        keyboardType={props.keyboardType || 'default'}
        returnKeyType="done"
        multiline={props?.multiline || false}
        style={[styles.inputStyle, props?.style]}
        maxLength={props?.max || 10000}
        secureTextEntry={props?.secure || false}
        onChangeText={props.setValue}
        value={props?.value}
      />
      {props?.rightImage && props?.rightImage}
    </View>
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: mainColors.inputBorder,
    height: scaler(50),
    borderRadius: 10,
  },
  inputStyle: {
    width: '85%',
    fontSize: scaler(15),
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.inputLabel,
    paddingLeft: scaler(10),
  },
});
