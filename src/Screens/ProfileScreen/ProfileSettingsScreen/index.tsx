import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconButton from '../../../ReusableComponents/iconButton'
import { Images } from '../../../Assets'
import scaler from '../../../Utils/scaler'
import { fontFamily, mainColors } from '../../../Utils/helper'

const ProfileSettingsScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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
        </ScrollView>
    )
}

export default ProfileSettingsScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scaler(16),
        paddingTop: scaler(8),
        backgroundColor: mainColors.black,
        paddingBottom: scaler(22),
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(6),
    },
    avatarWrap: {
        width: scaler(90),
        height: scaler(90),
        borderRadius: scaler(26),
        overflow: 'hidden',
        marginRight: scaler(12),
    },
    avatar: {
        width: scaler(90),
        height: scaler(90),
        borderRadius: scaler(26),
    },
    avatarDownBtn: {
        position: 'absolute',
        right: scaler(2),
        bottom: scaler(2),
        width: scaler(20),
        height: scaler(20),
        borderRadius: scaler(10),
        backgroundColor: mainColors.appColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: scaler(2),
    },

    headerMid: {
        flex: 1,
    },
    headerId: {
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(16),
        lineHeight: scaler(18),
    },
    headerName: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(16),
        lineHeight: scaler(18),
        marginTop: scaler(2),
    },
    headerPhone: {
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(13),
        lineHeight: scaler(16),
        marginTop: scaler(2),
    },
    headerGearBtn: {
        width: scaler(50),
        height: scaler(50),
    },
    imgView: {
        height: '100%',
        width: '100%',
    },
})