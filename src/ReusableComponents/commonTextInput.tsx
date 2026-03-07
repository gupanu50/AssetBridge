import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import { inputProps } from './commonTypes';

const CommonTextInput = (props: inputProps) => {
  const isMultiline = props?.multiline || false;
  return (
    <View>
      <View style={[styles.container, props?.containerStyle, isMultiline && styles.multilineContainer,
      { borderColor: props?.errorMessage ? mainColors.redText : mainColors.inputBorder }]}>
        {props?.leftImage && props?.leftImage}
        <TextInput
          placeholder={props.placeholder || ''}
          placeholderTextColor={props?.errorMessage ? mainColors.redText : mainColors.inputLabel}
          keyboardType={props.keyboardType || 'default'}
          returnKeyType="done"
          autoFocus={props.autoFocus || false}
          numberOfLines={props?.lines || 1}
          textAlignVertical={isMultiline ? 'top' : 'center'}
          multiline={props?.multiline || false}
          style={[styles.inputStyle, isMultiline && styles.multilineInput, props?.style, { color: props?.errorMessage ? mainColors.redText : mainColors.inputLabel }]}
          maxLength={props?.max || 10000}
          secureTextEntry={props?.secure || false}
          onChangeText={props.setValue}
          value={props?.value}
        />
        {props?.rightImage && props?.rightImage}
      </View>
      {props?.errorMessage && <Text style={styles.errorText}>{props?.errorMessage}</Text>}
    </View>
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    height: scaler(50),
    borderRadius: 10,
  },
  inputStyle: {
    width: '85%',
    fontSize: scaler(15),
    fontFamily: fontFamily.poppinsRegular,
    paddingLeft: scaler(10),
  },
  errorText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(11),
    color: mainColors.sellButton,
    paddingTop: scaler(5)
  },
  multilineContainer: {
    alignItems: 'flex-start',
  },
  multilineInput: {
    height: '100%',
    paddingTop: scaler(12),
    paddingBottom: scaler(12),
  },
});
