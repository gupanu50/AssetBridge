import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../Assets'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import IconButton from '../../ReusableComponents/iconButton'
import scaler from '../../Utils/scaler'
import CommonButton from '../../ReusableComponents/commonButton'
import { styles } from './styles'

const ChangePasswordScreen = () => {
    const [secureText, setSecureText] = useState(false);
    const [secureText1, setSecureText1] = useState(false);
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loader, setLoader] = useState(false);
    const onBtnPressed = () => {
        setLoader(true);
        if (!password) {
            setPasswordError('Please enter password');
            return;
        } else if (!password1) {
            setConfirmPasswordError('Please enter confirm password');
            return;
        } else if (password1 !== password) {
            setConfirmPasswordError('Confirm Password does not match with password');
            return;
        }
        //   mutate({
        //     contact: `+91${email}`,
        //     country_code: "+91",
        //     password: password
        //   },
        //     {
        //       onSuccess: response => {
        //         snackbarHandler.successToast('Register')
        //         setLoader(false)
        //       },
        //       onError: er => {
        //         setLoader(false);
        //         snackbarHandler.errorToast('Invalid mobile number or Password');
        //       },
        //     },)
    }
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
                            <Text style={styles.inputLable}>Enter your password</Text>
                            <CommonTextInput
                                value={password}
                                setValue={(text) => { setPasswordError(''), setPassword(text) }}
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
                                            color="#999"
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
                                            color="#999"
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                    </KeyboardAwareScrollView>
                    <CommonButton
                        label="Change Password"
                        extraStyle={styles.buttonStyle}
                        onPress={() => onBtnPressed()}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default ChangePasswordScreen