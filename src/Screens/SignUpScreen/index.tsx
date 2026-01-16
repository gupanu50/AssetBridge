import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../Assets'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import IconButton from '../../ReusableComponents/iconButton'
import scaler from '../../Utils/scaler'
import CommonButton from '../../ReusableComponents/commonButton'
import { mainColors } from '../../Utils/helper'
import { styles } from './styles'

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [secureText, setSecureText] = useState(false);
  const [secureText1, setSecureText1] = useState(false);
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground source={Images.onboardBg} style={styles.backgroundImg}>
        <View style={styles.logoView}>
          <Image
            source={Images.logo}
            style={styles.logoImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.main}>
          <Text style={styles.headingText}>Hello, Welcome back!</Text>
          <Text style={styles.headingText}>Join us in just a few steps</Text>
          <Text style={styles.subHeadingText}>
            Your email is safe with us — just enter it to continue.
          </Text>
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
                righImage={
                  <TouchableOpacity
                    testID="togglePasswordIcon"
                    style={styles.eyeIcon}
                  >
                    <IconButton
                      onPress={() => { }}
                      name={'email-outline'}
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
                <TouchableOpacity
                  style={styles.eyeIcon}
                >
                  <IconButton
                    name={'information-outline'}
                    vectorType="MaterialCommunityIcons"
                    size={scaler(15)}
                    color={mainColors.blue}
                  />
                </TouchableOpacity>
              </View>
              <CommonTextInput
                value={password}
                setValue={setPassword}
                secure={secureText}
                righImage={
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
              <View style={{ height: scaler(20) }} />
              <Text style={styles.inputLable}>Confirm password</Text>
              <CommonTextInput
                value={password1}
                setValue={setPassword1}
                secure={secureText1}
                righImage={
                  <TouchableOpacity
                    testID="togglePasswordIcon"
                    style={styles.eyeIcon}
                  >
                    <IconButton
                      onPress={() => setSecureText1(!secureText1)}
                      name={secureText1 ? 'eye-off-outline' : 'eye'}
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
            label="Create an Account"
            extraStyle={styles.buttonStyle}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

export default SignUpScreen