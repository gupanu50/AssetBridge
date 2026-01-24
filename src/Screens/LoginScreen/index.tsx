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
import { mainColors } from '../../Utils/helper';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconButton from '../../ReusableComponents/iconButton';
import CommonButton from '../../ReusableComponents/commonButton';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { styles } from './styles';
type Props = MainStackScreenProps<'Login'>;
const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [secureText, setSecureText] = useState(false);
  const [password, setPassword] = useState('');
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
                setValue={setEmail}
                keyboardType='numeric'
                max={10}
                rightImage={
                  <TouchableOpacity
                    testID="togglePasswordIcon"
                    style={styles.eyeIcon}
                  >
                    <IconButton
                      onPress={() => { }}
                      name={email ? 'close' : 'phone'}
                      vectorType="MaterialCommunityIcons"
                      size={scaler(28)}
                      color="#999"
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
                setValue={setPassword}
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
                      color="#999"
                    />
                  </TouchableOpacity>
                }
              />
            </View>
          </KeyboardAwareScrollView>
          <CommonButton
            label="Login"
            extraStyle={styles.buttonStyle}
            onPress={() => navigation.navigate('Otp')}
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
    </View>
  );
};

export default LoginScreen;
