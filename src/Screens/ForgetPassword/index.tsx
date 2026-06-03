import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import scaler from '../../Utils/scaler';
import CommonButton from '../../ReusableComponents/commonButton';
import { Images } from '../../Assets';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import CommonLoader from '../../ReusableComponents/commonLoader';
import useForgetMutation from './Hooks/useForgetMutation';
import snackbarHandler from '../../Utils/snackbarHandler';
import IconButton from '../../ReusableComponents/iconButton';
import { getApiErrorMessage, mainColors } from '../../Utils/helper';
type Props = MainStackScreenProps<'Forget'>;
const ForgetPassword = ({ navigation }: Props) => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const { mutate } = useForgetMutation();
  const [loader, setLoader] = useState(false);
  const onBtnPressed = () => {
    setLoader(true);
    if (!value) {
      setValueError('Please enter mobile number');
      setLoader(false);
      return;
    } else if (value.length < 10) {
      setValueError('Please enter 10 digit mobile number');
      setLoader(false);
      return;
    }
    mutate({
      contact: `+91${value}`,
    },
      {
        onSuccess: response => {
          snackbarHandler.successToast(response?.data?.data?.message);
          setLoader(false)
          navigation.navigate('Otp', { mobile: value, navScr: 'forgot_password' })
        },
        onError: er => {
          setLoader(false);
          const message = getApiErrorMessage(er);
          snackbarHandler.errorToast(message);
        },
      },)
  }
  const crossPress = () => {
    if (value) {
      setValue('')
    }
  }
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
          <CommonTextInput
            value={value}
            keyboardType='numeric'
            setValue={(text) => { setValueError(''), setValue(text) }}
            placeholder='Enter Your Mobile Number'
            errorMessage={valueError}
            rightImage={
              <TouchableOpacity
                testID="togglePasswordIcon"
                style={styles.eyeIcon}
              >
                <IconButton
                  onPress={() => crossPress()}
                  name={value ? 'close' : 'phone'}
                  vectorType="MaterialCommunityIcons"
                  size={scaler(28)}
                  color={valueError ? mainColors.sellButton : mainColors.inputLabel}
                />
              </TouchableOpacity>
            }
          />
          <CommonButton label="Send Otp" extraStyle={styles.loginStyle} onPress={() => onBtnPressed()} />
        </View>
      </ImageBackground>
      {loader && <CommonLoader />}
    </View>
  );
};

export default ForgetPassword;
