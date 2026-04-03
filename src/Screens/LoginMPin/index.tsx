import { Image, ImageBackground, View } from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../Assets';
import scaler from '../../Utils/scaler';
import { getApiErrorMessage, mainColors } from '../../Utils/helper';
import { Text } from 'react-native-gesture-handler';
import { OtpInput } from 'react-native-otp-entry';
import CommonButton from '../../ReusableComponents/commonButton';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { styles } from './styles';
import IconButton from '../../ReusableComponents/iconButton';
import snackbarHandler from '../../Utils/snackbarHandler';
import useLoginMPinMutation from './Hooks/useaLoginMPinMutation';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUserData } from '../../Redux/authSlice';
type Props = MainStackScreenProps<'LoginMPin'>;
const MPinLoginScreen = ({ navigation }: Props) => {
    const [input, setInput] = useState('');
    const userData = useSelector(selectUserData);
    const contact = userData?.user?.contact;
    const dispatch = useDispatch();
    const [errorInput, setErrorInput] = useState('');
    const { mutate } = useLoginMPinMutation();
    const loginMpin = () => {
        mutate({
            contact: contact,
            mpin: input
        }, {
            onSuccess: (res) => {
                dispatch(login(res?.data?.data));
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'HomeTab'
                    }]
                })
            },
            onError: (err) => {
                const message = getApiErrorMessage(err);
                snackbarHandler.errorToast(message);
            }
        })
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
                    <Text style={styles.headingText}>Login with MPIN</Text>
                    <Text style={styles.subHeadingText}>
                        Please login with MPIN.
                    </Text>
                    <Text style={[styles.subHeadingText, { marginTop: scaler(20) }]}>
                        Enter MPIN
                    </Text>
                    <View style={styles.flexView}>
                        <OtpInput
                            numberOfDigits={4}
                            onFilled={(text) => { setInput(text); }}
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
                        {errorInput && <Text style={styles.errorText}>{errorInput}</Text>}
                    </View>
                    <CommonButton
                        label="Login"
                        backgroundColor={(errorInput || input.length < 4) ? mainColors.inputBorder : mainColors.mainButton}
                        disabled={(errorInput || input.length < 4) ? true : false}
                        extraStyle={[styles.loginStyle, { marginTop: errorInput ? scaler(15) : scaler(25) }]}
                        onPress={() => loginMpin()}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default MPinLoginScreen;
