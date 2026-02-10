import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import scaler from '../Utils/scaler';
import { Images } from '../Assets';
import { mainColors } from '../Utils/helper';
import CommonTextInput from './commonTextInput';
type CommonHeaderProps = {
  onPressBell?: () => void; // ✅ add this
};
const CommonHeader = (props: CommonHeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState('');
  return (
    <View>
      <View style={[styles.container, { justifyContent: showSearch ? 'center' : 'space-between' }]}>
        <Image
          source={Images.singleLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        {showSearch && (
          <CommonTextInput
            value={value}
            setValue={setValue}
            placeholder="Search here"
            containerStyle={styles.containerStyle}
            style={styles.input}
          />
        )}
        <View style={styles.innerView}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Image
              source={Images.search}
              resizeMode="contain"
              style={styles.searchLogo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // ✅ open modal if provided, else fallback to your old screen
              if (props.onPressBell) {
                props.onPressBell();
                return;
              }
            }}
          >
            <Image
              source={Images.notification}
              resizeMode="contain"
              style={styles.notiLogo}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: mainColors.moversCards,
    borderWidth: 1,
    marginHorizontal: scaler(10),
    marginVertical: scaler(10),
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaler(20),
    paddingVertical: scaler(10),
  },
  logo: {
    height: scaler(30),
    width: scaler(30),
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchLogo: {
    height: scaler(20),
    width: scaler(20),
  },
  notiLogo: {
    height: scaler(25),
    width: scaler(25),
    marginLeft: scaler(8),
  },
  containerStyle: {
    marginHorizontal: scaler(10),
    height: scaler(30),
    borderWidth: 0,
  },
  input: {
    height: '130%',
    width: '70%',
  },
});
