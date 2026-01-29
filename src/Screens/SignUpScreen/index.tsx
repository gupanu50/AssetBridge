import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../Assets'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import IconButton from '../../ReusableComponents/iconButton'
import scaler from '../../Utils/scaler'
import CommonButton from '../../ReusableComponents/commonButton'
import { styles } from './styles'
import PasswordInfoTooltip from '../../ReusableComponents/signUpToolTip'
import useRegisterMutation from './Hooks/useRegisterMutation'
import snackbarHandler from '../../Utils/snackbarHandler'
import CommonLoader from '../../ReusableComponents/commonLoader'
import { mainColors } from '../../Utils/helper'

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureText1, setSecureText1] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const { mutate } = useRegisterMutation();
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [loader, setLoader] = useState(false);
  const onBtnPressed = () => {
    setLoader(true);
    if (!email) {
      setEmailError('Please enter mobile number');
      return;
    } else if (email.length < 10) {
      setEmailError('Please enter 10 digit mobile number');
      return;
    } else if (!password) {
      setPasswordError('Please enter password');
      return;
    } else if (!password1) {
      setConfirmPasswordError('Please enter confirm password');
      return;
    } else if (password1 !== password) {
      setConfirmPasswordError('Confirm Password does not match with password');
      return;
    }
    mutate({
      contact: `+91${email}`,
      country_code: "+91",
      password: password
    },
      {
        onSuccess: response => {
          snackbarHandler.successToast('Register')
          setLoader(false)
        },
        onError: er => {
          setLoader(false);
          snackbarHandler.errorToast('Invalid mobile number or Password');
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
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.main}>
            <Text style={styles.headingText}>Hello, Welcome back!</Text>
            <Text style={styles.headingText}>Join us in just a few steps</Text>
            <Text style={styles.subHeadingText}>
              Your email is safe with us — just enter it to continue.
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLable}>Enter mobile number</Text>
              <CommonTextInput
                value={email}
                placeholder='* * * * *  * * * * *'
                setValue={(text) => { setEmailError(''), setEmail(text) }}
                errorMessage={emailError}
                keyboardType='numeric'
                max={10}
                rightImage={
                  <TouchableOpacity
                    testID="togglePasswordIcon"
                    style={styles.eyeIcon}
                  >
                    <IconButton
                      name={email ? 'close' : 'phone'}
                      onPress={() => crossPress()}
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
                <PasswordInfoTooltip />
              </View>
              <CommonTextInput
                value={password}
                setValue={(text) => { setPasswordError(''), setPassword(text) }}
                errorMessage={passwordError}
                placeholder='Enter Password'
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
              <View style={{ height: scaler(20) }} />
              <Text style={styles.inputLable}>Confirm password</Text>
              <CommonTextInput
                value={password1}
                errorMessage={confirmPasswordError}
                setValue={(text) => { setConfirmPasswordError(''), setPassword1(text) }}
                secure={secureText1}
                placeholder='Confirm Password'
                rightImage={
                  <TouchableOpacity
                    testID="togglePasswordIcon"
                    style={styles.eyeIcon}
                  >
                    <IconButton
                      onPress={() => setSecureText1(!secureText1)}
                      name={secureText1 ? 'eye-off-outline' : 'eye'}
                      vectorType="MaterialCommunityIcons"
                      size={scaler(28)}
                      color={confirmPasswordError ? mainColors.sellButton : mainColors.inputLabel}
                    />
                  </TouchableOpacity>
                }
              />
            </View>

            <CommonButton
              label="Create an Account"
              extraStyle={styles.buttonStyle}
              onPress={() => onBtnPressed()}
            />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
      {loader && <CommonLoader />}
    </View>
  )
}

export default SignUpScreen