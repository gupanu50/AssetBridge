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
type Props = MainStackScreenProps<'Otp'>;
const OtpScreen = ({ navigation }: Props) => {
  const [input, setInput] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(59);
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

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const triggeredMethod = (text: string) => {
    if (text === '1234') {
      setErrorInput('Wrong OTP Entered');
    }
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
              disabled={secondsLeft === 0 ? false : true}
              extraStyle={styles.btnStyle}
              textColor={secondsLeft === 0 ? mainColors.mainButton : mainColors.inputLabel}
            />
            {errorInput && <Text style={styles.errorText}>{errorInput}</Text>}
          </View>
          <CommonButton
            label="Login"
            backgroundColor={(errorInput || input.length < 4) ? mainColors.inputBorder : mainColors.mainButton}
            disabled={(errorInput || input.length < 4) ? true : false}
            extraStyle={styles.loginStyle}
            onPress={() => navigation.navigate('HomeTab')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default OtpScreen;
