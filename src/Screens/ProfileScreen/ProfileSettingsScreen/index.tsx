import { Image, Linking, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../../../ReusableComponents/iconButton'
import { Images } from '../../../Assets'
import scaler from '../../../Utils/scaler'
import { getApiErrorMessage, mainColors } from '../../../Utils/helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextInput from '../../../ReusableComponents/commonTextInput'
import CommonButton from '../../../ReusableComponents/commonButton'
import { styles } from './styles'
import CommonDrawerBackHeader from '../../../ReusableComponents/commonDrawerBackHeader'
import { MainStackScreenProps } from '../../../Navigation/NavigationTypes/screenTypes'
import useChangePasswordProfileMutation from '../Hooks/useChangePasswordMutation'
import snackbarHandler from '../../../Utils/snackbarHandler'
import useUpdateProfileMutation from '../Hooks/useUpdateProfileMutation'
import useIIFLLoginQuery from '../Hooks/useIIFLLoginMutation'
import useProfilePhotoMutation from '../Hooks/useProfilePhotoMutation'
import useMedia from '../Hooks/useMedia'
type Props = MainStackScreenProps<'ProfileSettings'>;
const ProfileSettingsScreen = ({ navigation, route }: Props) => {
    const [mail, setMail] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [errorOld, setErrorOld] = useState('');
    const [errornew, setErrorNew] = useState('');
    const [errorCon, setErrorCon] = useState('');
    const [newPass, setNewPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const { mutate } = useChangePasswordProfileMutation();
    const { mutate: updateMutate } = useUpdateProfileMutation();
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
    const profileData = route?.params?.profileData;
    const { data: IIFLData } = useIIFLLoginQuery();
    // console.log('ProfileData', profileData);
    // console.log('ProfileDataIIFLData', IIFLData, error);
    const iiflURL = IIFLData?.data?.data?.data?.login_url;
    const [image, setImage] = useState<any>('');
    const { mutate: photoMutate } = useProfilePhotoMutation();
    const { launchGallery } = useMedia((imageData) => {
        const encodedImage = imageData;
        // console.log('EncodedImage', encodedImage);
        if (Array.isArray(imageData)) {
            // setEventImage(encodedImage);
        } else {
            setImage(encodedImage);
            photoMutate({ encodedImage }, {
                onSuccess: (res) => {
                    // console.log('Res', res)
                    snackbarHandler.successToast(res?.data?.data?.message)
                },
                onError: (err) => {
                    const message = getApiErrorMessage(err);
                    snackbarHandler.errorToast(message)
                }
            })
        }
    });
    const onBtnPressed = () => {
        if (!oldPass) {
            setErrorOld('Please enter Old Password');
            return;
        } if (!newPass) {
            setErrorNew('Please enter new password');
            return;
        } else if (!rePass) {
            setErrorCon('Please enter confirm password');
            return;
        } else if (newPass !== rePass) {
            setErrorCon('Confirm Password does not match with password');
            return;
        }
        mutate({
            old_password: oldPass,
            new_password: newPass,
        },
            {
                onSuccess: response => {
                    snackbarHandler.successToast(response?.data?.data?.message)
                    setOldPass('');
                    setNewPass('');
                    setRePass('');
                },
                onError: er => {
                    const msg = getApiErrorMessage(er)
                    snackbarHandler.errorToast(msg);
                },
            },)
    }
    const onUpdateBtnPressed = () => {
        if (!mail) {
            snackbarHandler.errorToast('Please enter email');
            return;
        }
        updateMutate({
            email: mail,
        },
            {
                onSuccess: () => {
                    snackbarHandler.successToast('Email Update Successfully')
                    setMail('');
                },
                onError: er => {
                    const msg = getApiErrorMessage(er)
                    snackbarHandler.errorToast(msg);
                },
            },)
    }
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <CommonDrawerBackHeader title='Profile Settings' navigation={navigation} />
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.avatarWrap}
                    onPress={() => launchGallery({
                        mediaType: 'photo',
                        compressImageMaxHeight: 800,
                        compressImageMaxWidth: 800,
                    })}
                >
                    {image ?
                        <Image
                            source={{ uri: image?.path }}
                            style={styles.avatar}
                            borderRadius={100 / 2}
                        /> :
                        profileData?.profile_picture_url ?
                            <Image
                                source={{ uri: profileData?.profile_picture_url }}
                                style={styles.avatar}
                                borderRadius={100 / 2}
                            /> :
                            < Image
                                source={Images.dummyProfile}
                                style={styles.avatar}
                                borderRadius={100 / 2}
                            />}
                    <View style={styles.avatarDownBtn}>
                        <IconButton name="upload" vectorType="AntDesign" size={scaler(13)} color={mainColors.white} />
                    </View>
                </TouchableOpacity>

                <View style={styles.headerMid}>
                    <Text style={styles.headerId}>{profileData?.username}</Text>
                    <Text style={styles.headerName}>{`${profileData?.first_name} ${profileData?.last_name}`}</Text>
                    <Text style={styles.headerPhone}>{`${profileData?.contact}`}</Text>
                </View>

                <TouchableOpacity activeOpacity={0.85} style={styles.headerGearBtn} onPress={() => { iiflURL ? Linking.openURL(iiflURL) : setShowTooltip(true) }}>
                    <Image source={Images.profileBadge} resizeMode='contain' style={styles.imgView} tintColor={profileData?.broker_auth?.color} />
                </TouchableOpacity>
                {showTooltip && <Modal
                    visible={showTooltip}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowTooltip(false)}
                >
                    {/* Backdrop (click outside to close) */}
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowTooltip(false)}>
                        {/* Stop closing when clicking tooltip itself */}
                        <TouchableOpacity
                            onPress={() => { }}
                            style={[
                                {
                                    position: 'absolute',
                                    maxWidth: scaler(220),
                                    paddingVertical: scaler(10),
                                    paddingHorizontal: scaler(12),
                                    borderRadius: scaler(10),
                                    backgroundColor: mainColors.black,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255,255,255,0.12)',
                                },
                                tooltipPos
                                    ? {
                                        // show below the badge (you can adjust offsets)
                                        top: tooltipPos.y + tooltipPos.h + scaler(8),
                                        left: Math.max(scaler(12), tooltipPos.x - scaler(160)),
                                    }
                                    : { top: scaler(120), right: scaler(12) },
                            ]}
                        >
                            <Text style={{ color: mainColors.white, fontSize: scaler(12), lineHeight: scaler(16) }}>
                                {profileData?.broker_auth?.message}
                            </Text>

                            {/* Optional: small arrow */}
                            {tooltipPos && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -scaler(6),
                                        left: scaler(170),
                                        width: 0,
                                        height: 0,
                                        borderLeftWidth: scaler(6),
                                        borderRightWidth: scaler(6),
                                        borderBottomWidth: scaler(6),
                                        borderLeftColor: 'transparent',
                                        borderRightColor: 'transparent',
                                        borderBottomColor: '#0B2230',
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
                }
            </View>
            <View style={styles.lineHeight} />
            <Text style={styles.addAddress}>Add Mailing Address</Text>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLable}>Enter your Mailing Address</Text>
                    <CommonTextInput
                        value={mail}
                        setValue={setMail}
                        placeholder='example@yourmail.com'
                        rightImage={
                            <TouchableOpacity
                                testID="togglePasswordIcon"
                                style={styles.eyeIcon}
                            >
                                <IconButton
                                    onPress={() => { mail ? setMail('') : null }}
                                    name={mail ? 'close' : 'email-outline'}
                                    vectorType="MaterialCommunityIcons"
                                    size={scaler(28)}
                                    color="#999"
                                />
                            </TouchableOpacity>
                        }
                    />
                    <CommonButton label='Save Changes' extraStyle={styles.saveBtn} onPress={() => onUpdateBtnPressed()} />
                    <View style={[styles.lineHeight, { height: scaler(35) }]} />
                    <Text style={styles.addAddress}>Manage Password</Text>
                </View>
                <View style={styles.flexView}>
                    <Text style={styles.inputLable}>Old Password</Text>
                    <CommonButton
                        label="Forget?"
                        onPress={() => navigation.navigate('Forget')}
                        backgroundColor="transparent"
                        textColor={mainColors.mainButton}
                        extraStyle={styles.forgetBtn}
                    />
                </View>
                <CommonTextInput
                    value={oldPass}
                    setValue={(text) => { setErrorOld(''); setOldPass(text) }}
                    secure={secureText}
                    errorMessage={errorOld}
                    containerStyle={{ marginBottom: errorOld ? scaler(5) : scaler(20) }}
                    placeholder='Enter Password'
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
                                color={errorOld ? mainColors.redText : mainColors.inputLabel}
                            />
                        </TouchableOpacity>
                    }
                />
                <Text style={styles.inputLable}>Enter New Password</Text>
                <CommonTextInput
                    value={newPass}
                    setValue={(text) => { setErrorNew(''); setNewPass(text) }}
                    secure={secureText1}
                    errorMessage={errornew}
                    containerStyle={{ marginBottom: errornew ? scaler(5) : scaler(20) }}
                    placeholder='Enter Password'
                    rightImage={
                        <TouchableOpacity
                            testID="togglePasswordIcon"
                            onPress={() => setSecureText1(!secureText1)}
                            style={styles.eyeIcon}
                        >
                            <IconButton
                                onPress={() => setSecureText1(!secureText1)}
                                name={secureText1 ? 'eye-off-outline' : 'eye'}
                                vectorType="MaterialCommunityIcons"
                                size={scaler(28)}
                                color={errornew ? mainColors.redText : mainColors.inputLabel}
                            />
                        </TouchableOpacity>
                    }
                />
                <View style={styles.flexView}>
                    <Text style={styles.inputLable}>Confirm Password</Text>
                </View>
                <CommonTextInput
                    value={rePass}
                    secure={secureText2}
                    setValue={(text) => { setErrorCon(''); setRePass(text) }}
                    containerStyle={{ marginBottom: errorCon ? scaler(5) : scaler(20) }}
                    errorMessage={errorCon}
                    placeholder='Confirm Password'
                    rightImage={
                        <TouchableOpacity
                            testID="togglePasswordIcon"
                            style={styles.eyeIcon}
                        >
                            <IconButton
                                onPress={() => setSecureText2(!secureText2)}
                                name={secureText2 ? 'eye-off-outline' : 'eye'}
                                vectorType="MaterialCommunityIcons"
                                size={scaler(28)}
                                color={errorCon ? mainColors.redText : mainColors.inputLabel}
                            />
                        </TouchableOpacity>
                    }
                />
                <View style={[styles.lineHeight, { height: scaler(15) }]} />
                <CommonButton label='Save Changes' extraStyle={styles.saveBtn} onPress={() => onBtnPressed()} />
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

export default ProfileSettingsScreen