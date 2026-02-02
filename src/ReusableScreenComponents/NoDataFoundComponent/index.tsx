import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NoDataProps } from './types'
import CommonHeader from '../../ReusableComponents/commonHeader'
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes'
import scaler from '../../Utils/scaler'
import { fontFamily, mainColors } from '../../Utils/helper'
import CommonButton from '../../ReusableComponents/commonButton'
import { Images } from '../../Assets'
type Props = MainStackScreenProps<'NoData'>;
const NoDataFoundComponent = ({ navigation, route }: Props) => {
    return (
        <View style={styles.container}>
            <CommonHeader navigation={navigation} />
            <Image source={route?.params?.image} resizeMode='contain' style={styles.img} />
            <Text style={styles.head}>{route?.params?.heading}</Text>
            <Text style={styles.desc}>{route?.params?.descText}</Text>
            <Text style={styles.redText}>{route?.params?.redText}</Text>
            <CommonButton label={route?.params?.btnLable} extraStyle={{ marginHorizontal: scaler(15) }} />
            <Image source={Images.line} resizeMode='contain' style={styles.line} />
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Terms and Privacy Policy {' | '} Trust &amp; Security {' | '} Careers
                </Text>
                <Text style={styles.footerText}>
                    Investor {' | '}  Lorem Ipsum1 {' | '}  Lorem Ipsum2  {' | '}  Lorem
                </Text>
                <Text style={styles.footerText}>
                    Lorem Ipsum4 {' | '}  Lorem Ipsum5  {' | '}  Lorem Ipsum6
                </Text>
            </View>
        </View>
    )
}

export default NoDataFoundComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.black,
    },
    img: {
        alignSelf: 'center',
        width: scaler(200),
        height: scaler(250)
    },
    head: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(20),
        textAlign: 'center',
        textAlignVertical: 'center',
        color: mainColors.white
    },
    desc: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(14),
        textAlign: 'center',
        color: mainColors.headingTextColor
    },
    redText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(14),
        color: mainColors.noRed,
        marginTop: scaler(15),
        marginBottom: scaler(60),
        textAlign: 'center',
    },
    footer: {
        alignItems: 'center',
        marginTop: scaler(45),
        paddingBottom: scaler(10),
    },
    footerText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.descText,
        fontSize: scaler(12),
        textAlign: 'center',
    },
    line: { alignSelf: 'center', height: scaler(50), width: scaler(80) }
})