import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
    Modal,
    Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import scaler from '../../Utils/scaler';
import { getApiErrorMessage, mainColors } from '../../Utils/helper';
import { Images } from '../../Assets';
import IconButton from '../../ReusableComponents/iconButton';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { logout } from '../../Redux/authSlice';
import { useDispatch } from 'react-redux';
import useProfileQuery from './Hooks/useProfileQuery';
import useMedia from './Hooks/useMedia';
import useProfilePhotoMutation from './Hooks/useProfilePhotoMutation';
import snackbarHandler from '../../Utils/snackbarHandler';
import useIIFLLoginQuery from './Hooks/useIIFLLoginMutation';
import { useIsFocused } from '@react-navigation/native';
type Props = MainStackScreenProps<'Profile'>;
const ProfileScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const logoutUser = () => {
        console.log('runningProfileLogout')
        dispatch(logout());
        navigation.reset({
            index: 0,
            routes: [
                { name: 'Login' }
            ]
        })
    };
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
    const isFocused = useIsFocused();
    const { data, refetch } = useProfileQuery();
    const profileData = data?.data?.data[0]
    const { data: IIFLData } = useIIFLLoginQuery();
    // console.log('ProfileData', profileData);
    // console.log('ProfileDataIIFLData', IIFLData, error);
    const iiflURL = IIFLData?.data?.data?.data?.login_url;
    const [showTooltip, setShowTooltip] = useState(false);
    const [image, setImage] = useState<any>('');
    const { mutate } = useProfilePhotoMutation();
    useEffect(() => { refetch() }, [isFocused]);
    const { launchGallery } = useMedia((imageData) => {
        const encodedImage = imageData;
        // console.log('EncodedImage', encodedImage);
        if (Array.isArray(imageData)) {
            // setEventImage(encodedImage);
        } else {
            setImage(encodedImage);
            mutate({ encodedImage }, {
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
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
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
                        <IconButton name="upload" vectorType="AntDesign" size={scaler(15)} color={mainColors.white} />
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
                                    : { top: scaler(90), right: scaler(12) },
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

            {/* Trading Balance Card */}
            <LinearGradient
                colors={['#0A2A3A', '#071F2C', '#061A25']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.balanceCard}
            >
                <View style={styles.balanceTopRow}>
                    <View>
                        <Text style={styles.balanceLabel}>Trading Balance</Text>
                        <Text style={styles.balanceValue}>₹ {profileData?.portfolio_balance}</Text>
                    </View>
                    {/* <Ionicons name="chevron-forward" size={scaler(18)} color={mainColors.white} /> */}
                </View>
            </LinearGradient>

            {/* Divider */}
            <View style={[styles.hr, { marginTop: scaler(20) }]} />

            {/* Menu */}
            <MenuItem icon={Images.tabProfile} label="Profile Settings" onPress={() => navigation.navigate('ProfileSettings', { profileData: profileData })} />
            <View style={styles.hr} />
            {/* <MenuItem icon={Images.profilePayment} label="Payment Methods" onPress={() => navigation.navigate('PaymentMethod')} /> */}
            <MenuItem icon={Images.profileHistory} label="Transaction History" onPress={() => navigation.navigate('TransactionHistory')} />
            <View style={styles.hr} />
            <MenuItem icon={Images.profileContact} label="Contact Us" onPress={() => navigation.navigate('ContactUs')} />
            <View style={styles.hr} />
            <MenuItem icon={Images.profileLogout} label="Logout" onPress={() => logoutUser()} />
            <View style={styles.hr} />
            {/* Refer Card
            <View style={styles.referCard}>
                <View style={styles.referLeft}>
                    <View style={styles.referIconCircle}>
                        <Image source={Images.profileHandCoin} style={styles.imgView} resizeMode='contain' />
                    </View>
                </View>
                <View style={styles.referMid}>
                    <Text style={styles.referTitle}>Refer & Earn ₹ 500</Text>
                    <Text style={styles.referSub}>Refer & Earn ₹ 500</Text>
                </View>
                <Ionicons name="chevron-forward" size={scaler(18)} color={mainColors.white} />
            </View> */}

            {/* Footer Logo */}
            <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                <View style={styles.footer}>
                    <Image source={Images.profileLogo} style={styles.imgView} resizeMode='contain' />
                </View>
                <View style={[styles.hr, { marginBottom: scaler(0) }]} />
                {/* App Version */}
                {/* <View style={styles.versionRow}>
                    <Text style={styles.versionText}>App Ver : 0.1.1.13</Text>
                    <CommonButton label='Update' backgroundColor={mainColors.black} textColor={mainColors.mainButton} />
                </View> */}
            </View>
        </ScrollView>
    );
};


const MenuItem = ({ icon, label, onPress }: { icon: ImageSourcePropType; label: string, onPress?: () => void }) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuLeft}>
                <Image source={icon} style={styles.menuIcon} resizeMode='contain' tintColor={mainColors.white} />
                <Text style={styles.menuLabel}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProfileScreen;
