import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconButton from '../../ReusableComponents/iconButton'
import { mainColors } from '../../Utils/helper'
import scaler from '../../Utils/scaler'
import CommonButton from '../../ReusableComponents/commonButton'
import { styles } from './styles'
import { Images } from '../../Assets'

const FundsWithdrawalComponent = () => {
    return (
        <View>
            <Text style={styles.timeText}>13 January 2026 at 07 : 03 pm</Text>
            <View style={styles.flexView}>
                <Image source={Images.bankLogo} resizeMode="contain" style={styles.bankLogo} />
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>HDFC Bank LTD</Text>
                    <Text style={styles.accountText}>**25**6399</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.valueText}>₹10,36,259,44</Text>
                    <View style={styles.approvedView}>
                        <IconButton
                            vectorType='MaterialCommunityIcons'
                            name='check-circle-outline'
                            color={mainColors.greenText}
                            size={scaler(16)}
                        />
                        <Text style={styles.approvedText}>Approved</Text>
                    </View>
                </View>
            </View>
            <View style={styles.unusedView}>
                <Image source={Images.check} resizeMode='contain' style={styles.checkImg} />
                <View>
                    <Text style={styles.unUsedText}>Your unused funds have been refunded to your account, as per SEBI regulations.</Text>
                    <TouchableOpacity style={styles.knowView}>
                        <Text style={styles.knowText}>Know more</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CommonButton
                label='View All Transactions'
                backgroundColor={mainColors.black}
                textColor={mainColors.mainButton}
                extraStyle={{ marginTop: scaler(20) }} />
        </View>
    )
}

export default FundsWithdrawalComponent