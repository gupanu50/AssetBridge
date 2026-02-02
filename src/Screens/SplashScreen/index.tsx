/* eslint-disable react-hooks/exhaustive-deps */
import { Image, View } from 'react-native';
import React, { useEffect } from 'react';
import { Images } from '../../Assets';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../Redux/authSlice';
type Props = MainStackScreenProps<'Splash'>;
const SplashScreen = ({ navigation }: Props) => {
  const isLogin = useSelector(selectIsLogin);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(isLogin ? 'HomeTab' : 'Onboard');
    }, 3000);
  }, []);
  return (
    <View style={styles.conatiner}>
      <Image source={Images.splash} style={styles.imgStyle} />
    </View>
  );
};

export default SplashScreen;
