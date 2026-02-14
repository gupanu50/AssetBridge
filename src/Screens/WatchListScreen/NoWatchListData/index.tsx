import { Image, Text, View } from 'react-native'
import React from 'react'
import { Images } from '../../../Assets'
import { styles } from './styles'
const NoWatchListData = () => {
    return (
        <View style={styles.container}>
            <Image source={Images.noAlgoData} resizeMode='contain' style={styles.img} />
            <Text style={styles.head}>You don't have any watchlist on your account.</Text>
        </View>
    )
}

export default NoWatchListData