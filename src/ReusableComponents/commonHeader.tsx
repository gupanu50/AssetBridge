import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import scaler from '../Utils/scaler';
import { Images } from '../Assets';
import { mainColors } from '../Utils/helper';
import IconButton from './iconButton';
import { MainStackScreenProps } from '../Navigation/NavigationTypes/screenTypes';
type CommonHeaderProps = {
  navigation?: MainStackScreenProps<'HomeTab'>['navigation'];
}
const CommonHeader = (props: CommonHeaderProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={Images.singleLogo}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.innerView}>
        <TouchableOpacity>
          <Image source={Images.search} resizeMode='contain' style={styles.searchLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props?.navigation?.navigate('Notifications')}>
          <Image source={Images.notification} resizeMode='contain' style={styles.notiLogo} />
        </TouchableOpacity>
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
    alignItems: 'center'
  },
  searchLogo: {
    height: scaler(20),
    width: scaler(20),
  },
  notiLogo: {
    height: scaler(25),
    width: scaler(25),
    marginLeft: scaler(10)
  }
});
