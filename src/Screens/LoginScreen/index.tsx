import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../Assets';
import scaler from '../../Utils/scaler';
import { getApiErrorMessage, mainColors } from '../../Utils/helper';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconButton from '../../ReusableComponents/iconButton';
import CommonButton from '../../ReusableComponents/commonButton';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { styles } from './styles';
import CommonLoader from '../../ReusableComponents/commonLoader';
import useLoginMutation from './Hooks/useLoginMutation';
import snackbarHandler from '../../Utils/snackbarHandler';
type Props = MainStackScreenProps<'Login'>;
const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const { mutate } = useLoginMutation();
  const [loader, setLoader] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const onBtnPressed = () => {
    setLoader(true);
    if (!email) {
      setEmailError('Please enter mobile number');
      setLoader(false);
      return;
    } else if (email.length < 10) {
      setEmailError('Please enter 10 digit mobile number');
      setLoader(false);
      return;
    } else if (!password) {
      setPasswordError('Please enter password');
      setLoader(false);
      return;
    }
    mutate({
      contact: `+91${email}`,
      password: password
    },
      {
        onSuccess: response => {
          snackbarHandler.successToast(response?.data?.data?.message)
          setLoader(false)
          navigation.navigate('Otp', { mobile: email, navScr: 'login' });
        },
        onError: er => {
          setLoader(false);
          const msg = getApiErrorMessage(er)
          snackbarHandler.errorToast(msg);
        },
      },)
  }
  const crossPress = () => {
    if (email) {
      setEmail('')
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
          <Text style={styles.headingText}>Hello</Text>
          <Text style={styles.headingText}>Welcome to Asset Bridge</Text>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inputContainer}>
              <Text style={styles.inputLable}>Enter mobile number</Text>
              <CommonTextInput
                value={email}
                setValue={(text) => { setEmailError(''), setEmail(text) }}
                errorMessage={emailError}
                placeholder='* * * * *   * * * * *'
                keyboardType='numeric'
                max={10}
                rightImage={
                  <TouchableOpacity
                    testID="togglePasswordIcon"
                    style={styles.eyeIcon}
                  >
                    <IconButton
                      onPress={() => crossPress()}
                      name={email ? 'close' : 'phone'}
                      vectorType="MaterialCommunityIcons"
                      size={scaler(28)}
                      color={emailError ? mainColors.sellButton : mainColors.inputLabel}
                    />
                  </TouchableOpacity>
                }
              />
              <View style={{ height: scaler(20) }} />
              <View style={styles.flexView}>
                <Text style={styles.inputLable}>Enter your password</Text>
                <CommonButton
                  label="Forget?"
                  backgroundColor="transparent"
                  textColor={mainColors.mainButton}
                  extraStyle={styles.forgetBtn}
                  onPress={() => navigation.navigate('Forget')}
                />
              </View>
              <CommonTextInput
                value={password}
                setValue={(text) => { setPasswordError(''), setPassword(text) }}
                placeholder='Enter Your Password'
                errorMessage={passwordError}
                secure={secureText}
                rightImage={
                  <TouchableOpacity
                    testID="togglePasswordIcon"
                    style={styles.eyeIcon}
                  >
                    <IconButton
                      onPress={() => setSecureText(!secureText)}
                      name={secureText ? 'eye-off-outline' : 'eye'}
                      vectorType="MaterialCommunityIcons"
                      size={scaler(28)}
                      color={passwordError ? mainColors.sellButton : mainColors.inputLabel}
                    />
                  </TouchableOpacity>
                }
              />
            </View>
          </KeyboardAwareScrollView>
          <CommonButton
            label="Login"
            extraStyle={styles.buttonStyle}
            onPress={() => onBtnPressed()}
          />
          <Text style={styles.orText}>Or</Text>
          <CommonButton
            label="Continue with Google"
            leftImage={
              <Image
                source={Images.googleIcon}
                style={styles.googleIcon}
                resizeMode="contain"
              />
            }
            backgroundColor={mainColors.googleButton}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don't Have an Account{'   '}
              <Text style={{ color: mainColors.mainButton }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {loader && <CommonLoader />}
    </View>
  );
};

export default LoginScreen;