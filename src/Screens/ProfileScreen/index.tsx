import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import scaler from '../../Utils/scaler';
import { mainColors } from '../../Utils/helper';
import { Images } from '../../Assets';
import IconButton from '../../ReusableComponents/iconButton';
import CommonButton from '../../ReusableComponents/commonButton';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { logout } from '../../Redux/authSlice';
import { useDispatch } from 'react-redux';
type Props = MainStackScreenProps<'Profile'>;
const ProfileScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const logoutUser = () => {
        dispatch(logout());
        navigation.reset({
            index: 0,
            routes: [
                { name: 'Login' }
            ]
        })
    }
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.headerRow}>
                <View style={styles.avatarWrap}>
                    <Image
                        source={Images.dummyProfile}
                        style={styles.avatar}
                    />
                    <TouchableOpacity activeOpacity={0.85} style={styles.avatarDownBtn}>
                        <IconButton name="upload" vectorType="AntDesign" size={scaler(10)} color={mainColors.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerMid}>
                    <Text style={styles.headerId}>AB12345</Text>
                    <Text style={styles.headerName}>David John Smith</Text>
                    <Text style={styles.headerPhone}>+1-212-555-0132</Text>
                </View>

                <TouchableOpacity activeOpacity={0.85} style={styles.headerGearBtn}>
                    <Image source={Images.profileBadge} resizeMode='contain' style={styles.imgView} />
                </TouchableOpacity>
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
                        <Text style={styles.balanceValue}>₹ 36,23,005,69</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={scaler(18)} color={mainColors.white} />
                </View>
            </LinearGradient>

            {/* Divider */}
            <View style={[styles.hr, { marginTop: scaler(20) }]} />

            {/* Menu */}
            <MenuItem icon={Images.tabProfile} label="Profile Settings" onPress={() => navigation.navigate('ProfileSettings')} />
            <View style={styles.hr} />
            <MenuItem icon={Images.profilePayment} label="Payment Methods" onPress={() => navigation.navigate('PaymentMethod')} />
            <View style={styles.hr} />
            <MenuItem icon={Images.profileHistory} label="Transaction History" onPress={() => navigation.navigate('TransactionHistory')} />
            <View style={styles.hr} />
            <MenuItem icon={Images.profileStatement} label="Statement (Ledger)" onPress={() => navigation.navigate('Statement')} />
            <View style={styles.hr} />
            <MenuItem icon={Images.profileContact} label="Contact Us" onPress={() => navigation.navigate('ContactUs')} />
            <View style={styles.hr} />
            <MenuItem icon={Images.profileLogout} label="Logout" onPress={() => logoutUser()} />
            <View style={styles.hr} />
            {/* Refer Card */}
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
            </View>

            {/* Footer Logo */}
            <View style={styles.footer}>
                <Image source={Images.profileLogo} style={styles.imgView} resizeMode='contain' />
            </View>
            <View style={[styles.hr, { marginBottom: scaler(0) }]} />
            {/* App Version */}
            <View style={styles.versionRow}>
                <Text style={styles.versionText}>App Ver : 0.1.1.13</Text>
                <CommonButton label='Update' backgroundColor={mainColors.black} textColor={mainColors.mainButton} />
            </View>
        </ScrollView>
    );
};

const Chip = ({ label, active }: { label: string; active?: boolean }) => {
    return (
        <TouchableOpacity style={styles.chip} >
            <Text style={styles.chipText}>{label}</Text>
        </TouchableOpacity>
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
