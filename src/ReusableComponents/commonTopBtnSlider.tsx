import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontFamily, mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import { MainStackScreenProps } from '../Navigation/NavigationTypes/screenTypes';
type CommonTopBtnSliderProps = {
    navigation?: MainStackScreenProps<'HomeTab' | 'Algo' | 'WatchList' | 'MarketPlace'>['navigation'];
}
const CommonTopBtnSlider = ({ navigation }: CommonTopBtnSliderProps) => {
    const horidata = [
        {
            label: 'NIFTY 50',
            value: '25944.75',
            percent: '87.45(0.34%)',
            color: mainColors.green,
        },
        {
            label: 'SENSEX',
            value: '84977.45',
            percent: '-287.45(0.34%)',
            color: mainColors.red,
        },
        {
            label: 'NIFTY Bank',
            value: '2594434.75',
            percent: '8734.45(0.64%)',
            color: mainColors.green,
        },
    ];
    return (
        <View style={styles.mainView}>
            <FlatList
                horizontal
                data={horidata}
                keyExtractor={(item, index) => item.label + index}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.innerBoxView} onPress={() => navigation?.navigate('Instrument')}>
                        <Text style={styles.textNifty}>{item.label}</Text>
                        <Text style={styles.textNiftyValue}>
                            {item.value}{'  '}
                            <Text style={{ color: item.color }}>{item.percent}</Text>
                        </Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default CommonTopBtnSlider

const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: scaler(10),
    },
    innerBoxView: {
        paddingHorizontal: scaler(20),
        paddingVertical: scaler(10),
        borderRadius: 10,
        borderColor: mainColors.niftyBorder,
        borderWidth: 1,
        marginRight: scaler(10)
    },
    textNifty: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(12),
    },
    textNiftyValue: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(10),
    },
})