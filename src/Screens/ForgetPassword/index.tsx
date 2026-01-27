import { Image, ImageBackground, Text, View } from 'react-native';
import React, { useState } from 'react';
import scaler from '../../Utils/scaler';
import CommonButton from '../../ReusableComponents/commonButton';
import { Images } from '../../Assets';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
type Props = MainStackScreenProps<'Forget'>;
const ForgetPassword = ({ navigation }: Props) => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground source={Images.onboardBg} style={styles.backgroundImg} resizeMode='stretch'>
        <View style={styles.logoView}>
          <Image
            source={Images.logo}
            style={styles.logoImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.main}>
          <Text style={styles.headingText}>Forgot your password?</Text>
          <Text style={styles.headingText}>No worries!</Text>
          <Text style={styles.subHeadingText}>
            Just enter your Mobile Number and we’ll send you a OTP to your
            Mobile Number.
          </Text>
          <Text style={[styles.inputLabel]}>
            Enter Your Mobile Number
          </Text>
          <CommonTextInput value={value} setValue={setValue} placeholder='Enter Your Mobile Number' />
          <CommonButton label="Send Otp" extraStyle={styles.loginStyle} onPress={() => navigation.navigate('Otp')} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgetPassword;
