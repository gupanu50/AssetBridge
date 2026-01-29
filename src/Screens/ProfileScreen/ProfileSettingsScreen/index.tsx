import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../../../ReusableComponents/iconButton'
import { Images } from '../../../Assets'
import scaler from '../../../Utils/scaler'
import { mainColors } from '../../../Utils/helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextInput from '../../../ReusableComponents/commonTextInput'
import CommonButton from '../../../ReusableComponents/commonButton'
import { styles } from './styles'
import CommonDrawerBackHeader from '../../../ReusableComponents/commonDrawerBackHeader'
import { MainStackScreenProps } from '../../../Navigation/NavigationTypes/screenTypes'
type Props = MainStackScreenProps<'ProfileSettings'>;
const ProfileSettingsScreen = ({ navigation }: Props) => {
    const [mail, setMail] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [secureText, setSecureText] = useState(false)
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <CommonDrawerBackHeader title='Profile Settings' navigation={navigation} />
            <View style={styles.headerRow}>
                <View style={styles.avatarWrap}>
                    <Image
                        source={Images.dummyProfile}
                        style={styles.avatar}
                    />
                    <TouchableOpacity activeOpacity={0.85} style={styles.avatarDownBtn}>
                        <IconButton name="upload" vectorType="AntDesign" size={scaler(13)} color={mainColors.white} />
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
                                    onPress={() => { }}
                                    name={mail ? 'close' : 'email-outline'}
                                    vectorType="MaterialCommunityIcons"
                                    size={scaler(28)}
                                    color="#999"
                                />
                            </TouchableOpacity>
                        }
                    />
                    <View style={[styles.lineHeight, { height: scaler(35) }]} />
                    <Text style={styles.addAddress}>Manage Password</Text>
                </View>
                <View style={styles.flexView}>
                    <Text style={styles.inputLable}>Old Password</Text>
                    <CommonButton
                        label="Forget?"
                        backgroundColor="transparent"
                        textColor={mainColors.mainButton}
                        extraStyle={styles.forgetBtn}
                    />
                </View>
                <CommonTextInput
                    value={oldPass}
                    setValue={setOldPass}
                    secure={secureText}
                    containerStyle={styles.input}
                    placeholder='Enter Password'
                    rightImage={
                        <TouchableOpacity
                            testID="togglePasswordIcon"
                            style={styles.eyeIcon}
                        >
                            <IconButton
                                onPress={() => { }}
                                name={oldPass ? 'close' : 'eye'}
                                vectorType="MaterialCommunityIcons"
                                size={scaler(28)}
                                color="#999"
                            />
                        </TouchableOpacity>
                    }
                />
                <Text style={styles.inputLable}>Enter New Password</Text>
                <CommonTextInput
                    value={newPass}
                    setValue={setNewPass}
                    containerStyle={styles.input}
                    placeholder='Enter Password'
                    rightImage={
                        <TouchableOpacity
                            testID="togglePasswordIcon"
                            style={styles.eyeIcon}
                        >
                            <IconButton
                                onPress={() => { }}
                                name={newPass ? 'close' : 'eye'}
                                vectorType="MaterialCommunityIcons"
                                size={scaler(28)}
                                color="#999"
                            />
                        </TouchableOpacity>
                    }
                />
                <View style={styles.flexView}>
                    <Text style={styles.inputLable}>Confirm Password</Text>
                </View>
                <CommonTextInput
                    value={rePass}
                    setValue={setRePass}
                    secure={secureText}
                    containerStyle={styles.input}
                    placeholder='Confirm Password'
                    rightImage={
                        <TouchableOpacity
                            testID="togglePasswordIcon"
                            style={styles.eyeIcon}
                        >
                            <IconButton
                                onPress={() => { }}
                                name={rePass ? 'close' : 'eye'}
                                vectorType="MaterialCommunityIcons"
                                size={scaler(28)}
                                color="#999"
                            />
                        </TouchableOpacity>
                    }
                />
                <View style={[styles.lineHeight, { height: scaler(15) }]} />
                <CommonButton label='Save Changes' extraStyle={styles.saveBtn} />
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

export default ProfileSettingsScreen