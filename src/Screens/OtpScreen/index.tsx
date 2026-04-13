import { Image, ImageBackground, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../Assets';
import scaler from '../../Utils/scaler';
import { mainColors } from '../../Utils/helper';
import { Text } from 'react-native-gesture-handler';
import { OtpInput } from 'react-native-otp-entry';
import CommonButton from '../../ReusableComponents/commonButton';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { styles } from './styles';
import IconButton from '../../ReusableComponents/iconButton';
import useOtpMutation from './Hooks/useOtpMutation';
import snackbarHandler from '../../Utils/snackbarHandler';
import useResendMutation from './Hooks/useResendMutation';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/authSlice';
type Props = MainStackScreenProps<'Otp'>;
const OtpScreen = ({ navigation, route }: Props) => {
  const mobile = route.params?.mobile;
  const nav = route?.params?.navScr || 'login';
  const [input, setInput] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [isNav, setIsNav] = useState(false);
  const { mutate } = useOtpMutation();
  const dispatch = useDispatch();
  const { mutate: resendMutation } = useResendMutation();
  const [errorInput, setErrorInput] = useState('');
  // const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = () => {
    setSecondsLeft(59);
    // setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          // setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const navFunc = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: nav === 'register' ? 'MPin' : nav === 'forgot_password' ? 'ChangePassword' : nav === 'forgot_mpin' ? 'ResetMPIN' : 'HomeTab',
        },
      ],
    });
  }
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const resendBtn = () => {
    resendMutation({
      contact: `+91${mobile}`,
      purpose: nav,
    },
      {
        onSuccess: response => {
          snackbarHandler.successToast('OTP Resend')
          console.log('Response', response)
        },
        onError: er => {
          snackbarHandler.errorToast('Invalid OTP or OTP is expired');
          setErrorInput('Wrong OTP Entered');
        },
      },)
  }
  const triggeredMethod = (text: string) => {
    mutate({
      contact: `+91${mobile}`,
      purpose: nav,
      otp: text
    },
      {
        onSuccess: response => {
          dispatch(login(response?.data?.data));
          setIsNav(true);
        },
        onError: er => {
          snackbarHandler.errorToast('Invalid OTP or OTP is expired');
          setErrorInput('Wrong OTP Entered');
          setIsNav(false);
        },
      },)
  }
  const formatTime = (sec: number) => {
    const s = sec < 10 ? `0${sec}` : `${sec}`;
    return `00:${s}`;
  };
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
          <Text style={styles.headingText}>Enter Your OTP</Text>
          <Text style={styles.subHeadingText}>
            Please enter the one-time password sent to your phone number.
          </Text>
          <Text style={[styles.subHeadingText, { marginTop: scaler(20) }]}>
            Enter Otp
          </Text>
          <View style={styles.flexView}>
            <OtpInput
              numberOfDigits={4}
              onFilled={(text) => { setInput(text); triggeredMethod(text) }}
              onTextChange={(text) => { setInput(text); setErrorInput('') }}
              theme={{
                containerStyle: { width: input.length === 4 ? '90%' : "100%" },
                pinCodeContainerStyle: styles.otpContainerStyle,
                focusedPinCodeContainerStyle: styles.focusedContainerStyle,
                filledPinCodeContainerStyle: errorInput ? styles.wrongContainerStyle : styles.focusedContainerStyle,
                pinCodeTextStyle: styles.pinCodeStyle,
              }}
            />
            {input.length === 4 &&
              <IconButton
                vectorType='MaterialCommunityIcons'
                name={errorInput ? 'close' : 'check-circle-outline'}
                color={errorInput ? mainColors.redText : mainColors.greenText}
                style={{ marginLeft: scaler(10) }}
              />}
          </View>
          <View style={styles.flexVieW}>
            <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
            <CommonButton
              label="Resend"
              backgroundColor="transparent"
              onPress={() => resendBtn()}
              disabled={secondsLeft === 0 ? false : true}
              extraStyle={styles.btnStyle}
              textColor={secondsLeft === 0 ? mainColors.mainButton : mainColors.inputLabel}
            />
            {errorInput && <Text style={styles.errorText}>{errorInput}</Text>}
          </View>
          <CommonButton
            label="Login"
            backgroundColor={(errorInput || input.length < 4 || !isNav) ? mainColors.inputBorder : mainColors.mainButton}
            disabled={(errorInput || input.length < 4 || !isNav) ? true : false}
            extraStyle={styles.loginStyle}
            onPress={() => navFunc()}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default OtpScreen;
