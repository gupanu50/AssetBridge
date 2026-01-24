import { Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../../ReusableComponents/iconButton'
import scaler from '../../Utils/scaler'
import { mainColors } from '../../Utils/helper'
import { styles } from './styles'

const MtfStatement = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.container}>
            <View style={styles.flexView}>
                <View style={styles.innerFlexView}>
                    <Text style={styles.mtfText}>MTF Ledger Balance</Text>
                    <IconButton
                        vectorType="MaterialCommunityIcons"
                        name="information-outline"
                        size={scaler(18)}
                        backgroundColor={mainColors.black}
                        color={mainColors.mainButton}
                    />
                </View>
                <Text style={[styles.mtfText, { marginRight: scaler(0) }]}>₹0.00</Text>
            </View>
            <View style={[styles.lineView, { height: scaler(15) }]} />
            <View style={[styles.flexView, { marginTop: scaler(15) }]}>
                <View style={styles.innerFlexView}>
                    <Text style={styles.autuText}>Auto Convert to Delivery is on </Text>
                    <IconButton
                        vectorType="MaterialCommunityIcons"
                        name="information-outline"
                        size={scaler(18)}
                        backgroundColor={mainColors.black}
                        color={mainColors.mainButton}
                    />
                </View>
                <Switch
                    trackColor={{ false: '#767577', true: 'green' }}
                    thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={[styles.lineView, { height: scaler(15) }]} />
            <Text style={styles.noText}>No transaction found for this period. Transactions done today will reflect tomorrow.</Text>
        </View>
    )
}

export default MtfStatement