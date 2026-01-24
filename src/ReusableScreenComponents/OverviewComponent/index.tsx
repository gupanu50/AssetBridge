import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { Images } from '../../Assets';
import { OverviewDataProps } from './types';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import IconButton from '../../ReusableComponents/iconButton';

const OverviewComponent = () => {
    const moversDataGrid = useMemo<OverviewDataProps[]>(
        () => [
            {
                id: 'm1',
                name: 'Sharpe Ratio',
                price: '3.12',
                logo: Images.shapeRatio,
                isUp: true,
            },
            {
                id: 'm2',
                name: 'Max Drawdown',
                price: '₹ 78,666,00',
                logo: Images.maxDropDown,
                isUp: false,
            },
            {
                id: 'm3',
                name: 'Win Rate',
                price: '3.12%',
                logo: Images.winRate,
                isUp: false,
            },
            {
                id: 'm4',
                name: 'Recovery Factor',
                price: '6.9',
                logo: Images.recoveryFactory,
                isUp: true,
            },
            {
                id: 'm5',
                name: 'Taxes',
                price: '₹ 7,364,00',
                logo: Images.tax,
                isUp: true,
            },
            {
                id: 'm6', name: 'Taxes',
                price: '₹ 7,364,00',
                logo: Images.tax,
                isUp: true,
            },
        ],
        [],
    );
    const renderMoverGridCard = ({ item }: { item: OverviewDataProps }) => {

        return (
            <TouchableOpacity style={styles.moverCard}>
                <Image source={item.logo} resizeMode="contain" style={styles.logoImg} />
                <Text style={styles.moverName} numberOfLines={1}>
                    {item.name}
                </Text>
                <Text style={[styles.moverPrice, { color: item?.name === 'Max Drawdown' ? mainColors.redText : mainColors.greenText }]}>{item.price}</Text>
                {item.name === 'Win Rate' && <IconButton
                    vectorType='MaterialCommunityIcons'
                    name='arrow-top-right'
                    size={scaler(14)}
                    color={mainColors.greenText}
                    style={styles.arrowIcon}
                />
                }
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.moversGridWrap}>
            <FlatList
                data={moversDataGrid}
                keyExtractor={item => item.id}
                renderItem={renderMoverGridCard}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={false}
            />
        </View>
    )
}

export default OverviewComponent

const styles = StyleSheet.create({
    moverCard: {
        width: '48.5%',
        borderRadius: scaler(12),
        height: scaler(125),
        paddingHorizontal: scaler(12),
        borderWidth: 1,
        backgroundColor: mainColors.moversCards,
        borderColor: mainColors.inputBorder,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: scaler(12),
    },
    moverName: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.headingTextColor,
        paddingTop: scaler(8),
        fontSize: scaler(12),
    },
    moverPrice: {
        marginTop: scaler(8),
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(16),
    },
    moverChg: {
        marginTop: scaler(4),
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
    },
    moversGridWrap: {
        marginTop: scaler(12),
    },
    logoImg: {
        height: scaler(40),
        width: scaler(40),
        marginRight: scaler(5),
        marginTop: scaler(5),
        tintColor: mainColors.headingTextColor
    },
    arrowIcon: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: scaler(15),
        left: scaler(60)
    }
})