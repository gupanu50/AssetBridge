import { Image, StyleSheet, View } from 'react-native';
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
        <IconButton
          name={'search'}
          size={scaler(28)}
          color="#AFAFAF"
          vectorType="MaterialIcons"
        />
        <IconButton
          onPress={() => props?.navigation?.navigate('Notifications')}
          name={'bell-outline'}
          size={scaler(28)}
          style={styles.bellIcon}
          color="#AFAFAF"
          vectorType="MaterialCommunityIcons"
        />
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
  },
  bellIcon: {
    marginLeft: scaler(10),
  },
});
