import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconButton from './iconButton'
import { fontFamily, mainColors } from '../Utils/helper'
import scaler from '../Utils/scaler'
import { DrawerBackHeaderProps } from './commonTypes'

const CommonDrawerBackHeader = (props: DrawerBackHeaderProps) => {
    return (
        <View style={styles.flexView}>
            <IconButton
                vectorType="MaterialCommunityIcons"
                name="keyboard-backspace"
                backgroundColor={mainColors.black}
                color={mainColors.white}
            />
            <Text style={props.isShowInfoIcon ? styles.contactUsTextWithInfo : styles.contactUsText}>{props.title}</Text>
            {props.isShowInfoIcon && <IconButton
                vectorType="MaterialCommunityIcons"
                name="information-outline"
                size={scaler(18)}
                style={styles.infoIcon}
                backgroundColor={mainColors.black}
                color={mainColors.white}
            />}
            <IconButton
                vectorType="MaterialCommunityIcons"
                name="close"
                size={scaler(18)}
                backgroundColor={mainColors.black}
                color={mainColors.white}
            />
        </View>
    )
}

export default CommonDrawerBackHeader

const styles = StyleSheet.create({
    flexView: {
        flexDirection: 'row',
        marginTop: scaler(5)
    },
    contactUsText: {
        color: mainColors.white,
        marginLeft: scaler(10),
        width: scaler(285),
        fontSize: scaler(14),
        fontFamily: fontFamily.poppinsSemiBold
    },
    contactUsTextWithInfo: {
        color: mainColors.white,
        marginLeft: scaler(10),
        width: scaler(265),
        fontSize: scaler(14),
        fontFamily: fontFamily.poppinsSemiBold
    },
    infoIcon: {
        marginRight: scaler(10)
    }
})