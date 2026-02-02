import { Image, Text, View } from 'react-native'
import React from 'react'
import { Images } from '../../../Assets'
import { MainStackScreenProps } from '../../../Navigation/NavigationTypes/screenTypes'
import CommonButton from '../../../ReusableComponents/commonButton'
import { styles } from './styles'
type MyAlgoProps = {
    navigation?: MainStackScreenProps<'Algo'>['navigation'];
}
const NoAlgoData = ({ navigation }: MyAlgoProps) => {
    return (
        <View style={styles.container}>
            <Image source={Images.noAlgoData} resizeMode='contain' style={styles.img} />
            <Text style={styles.head}>You don't have any bots subscribed on your portfolio.</Text>
            <Text style={styles.descText}>Get started with subscribing to a Bot.</Text>
            <View style={styles.btnView}>
                <CommonButton label='Subscribe to a Bot' />
            </View>
        </View>
    )
}

export default NoAlgoData