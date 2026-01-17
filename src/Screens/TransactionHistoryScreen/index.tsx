import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import CommonDrawerBackHeader from '../../ReusableComponents/commonDrawerBackHeader'
import { fontFamily, mainColors } from '../../Utils/helper'
import scaler from '../../Utils/scaler'
import { TopTabProps } from '../../ReusableComponents/commonTypes'
import CommonTabSlider from '../../ReusableComponents/commonTabSlider'
import IconButton from '../../ReusableComponents/iconButton'
import { Images } from '../../Assets'

const TransactionHistoryScreen = () => {
    const [activeTopTab, setActiveTopTab] = useState('Funds Added');
    const topTabListRef: any = useRef(null);
    const renderTopTab = ({ item, index }: { item: TopTabProps; index: number }) => {
        const isActive = activeTopTab === item.label;
        return (
            <CommonTabSlider
                activeTab="Funds Added"
                index={index}
                label={item?.label}
                style={styles.sliderView}
                isRightText={item?.isRightText}
                isActive={isActive}
                setIsActive={setActiveTopTab}
            />
        );
    };
    const topTabs = useMemo(
        () => [
            { id: 't1', label: 'Funds Added', isRightText: false },
            { id: 't2', label: 'Funds Withdrawal', isRightText: false },
        ],
        [],
    );
    return (
        <View style={styles.conatiner}>
            <View style={styles.main}>
                <CommonDrawerBackHeader title='Transaction History' isShowInfoIcon={true} />
                <View style={styles.topTabsWrap}>
                    <FlatList
                        ref={topTabListRef}
                        data={topTabs}
                        keyExtractor={item => item.id}
                        renderItem={renderTopTab}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.topTabsContent}
                        onScrollToIndexFailed={() => { }}
                    />
                </View>
                <View style={styles.searchView}>
                    <IconButton
                        vectorType="MaterialIcons"
                        name="search"
                        color={mainColors.white}
                    />
                    <TouchableOpacity style={styles.settingsTouch}>
                        <Image
                            source={Images.settingsWatchlist}
                            resizeMode="contain"
                            style={styles.settingsImg}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.timeText}>13 January 2026 at 07 : 03 pm</Text>
                <View style={styles.flexView}>
                    <Image source={Images.bankLogo} resizeMode="contain" style={styles.bankLogo} />
                    <View>
                        <Text>HDFC Bank LTD</Text>
                        <Text>**25**6399</Text>
                    </View>
                    <View>
                        <Text>₹10,36,259,44</Text>
                        <View>
                            <Text>Approved</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TransactionHistoryScreen
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: mainColors.black
    },
    main: {
        marginHorizontal: scaler(10)
    },
    sliderView: {
        width: scaler(185),
        marginRight: 0,
    },
    topTabsWrap: {
        marginTop: scaler(15),
        paddingTop: scaler(5),
        borderBottomWidth: 1,
        borderColor: mainColors.inputBorder,
    },
    topTabsContent: {
        paddingRight: scaler(10),
    },
    searchView: {
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: scaler(5),
        paddingHorizontal: scaler(10),
        borderColor: mainColors.inputBorder,
        marginTop: scaler(15),
    },
    settingsImg: {
        height: scaler(20),
        width: scaler(20),
        alignSelf: 'center',
        marginLeft: scaler(10),
    },
    settingsTouch: {
        marginTop: scaler(5),
    },
    timeText: {
        color: mainColors.transactionTime,
        fontSize: scaler(10),
        fontFamily: fontFamily.poppinsRegular,
        marginTop: scaler(20)
    },
    flexView: {
        flexDirection: 'row',
    },
    bankLogo: {
        height: scaler(40),
        width: scaler(40),
        marginTop: scaler(10)
    }
})