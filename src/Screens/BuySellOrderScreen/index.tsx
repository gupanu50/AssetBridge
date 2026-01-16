import { FlatList, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { fontFamily, mainColors } from '../../Utils/helper'
import IconButton from '../../ReusableComponents/iconButton'
import scaler from '../../Utils/scaler'
import CommonTabSlider from '../../ReusableComponents/commonTabSlider'
import { TopTabProps } from '../../ReusableComponents/commonTypes'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import { Images } from '../../Assets'
import { Dropdown } from 'react-native-element-dropdown';
import { horizontalFlatDataType } from './types'
import CommonButton from '../../ReusableComponents/commonButton'
const BuySellOrderScreen = () => {
    const [activeTopTab, setActiveTopTab] = useState('Delivery');
    const [valueShares, setValueShares] = useState('');
    const [marketPrice, setMarketPrice] = useState('200');
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>('day');
    const horFlatData = [{ id: 1, name: '+2.5%' }, { id: 2, name: '+5%' }, { id: 3, name: '+10%' }, { id: 4, name: '+15%' }, { id: 5, name: 'Custom' }];
    const renderHoriFlatData = ({ item }: { item: horizontalFlatDataType }) => (
        <TouchableOpacity style={styles.flatItem}>
            <Text style={styles.flatItemText}>{item.name}</Text>
        </TouchableOpacity>
    );
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const dropDownData = [
        { label: 'Day', value: 'day' },
        { label: 'IOC', value: 'ioc' },
    ];
    const renderTopTab = ({ item, index }: { item: TopTabProps; index: number }) => {
        const isActive = activeTopTab === item.label;
        return (
            <CommonTabSlider
                activeTab="Delivery"
                index={index}
                label={item?.label}
                style={styles.sliderView}
                isRightText={item?.isRightText}
                isActive={isActive}
                setIsActive={setActiveTopTab}
            />
        );
    };
    const topTabListRef: any = useRef(null);

    // -------------------- DATA --------------------
    // Tabs exactly like image (slidable) + counts
    const topTabs = useMemo(
        () => [
            { id: 't1', label: 'Delivery', isRightText: false },
            { id: 't2', label: 'Intraday', isRightText: true },
        ],
        [],
    );
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.flexView}>
                    <IconButton
                        vectorType="MaterialCommunityIcons"
                        name="keyboard-backspace"
                        backgroundColor={mainColors.black}
                        color={mainColors.white}
                    />
                    <View style={styles.niftyView}>
                        <Text style={styles.niftyText}>NIFTY 50</Text>
                        <Text style={styles.dateText}>08-JAN-26 25900 CE</Text>
                    </View>
                    <View>
                        <View style={styles.innerFlexView}>
                            <Text style={styles.niftyValueText}>₹100.25</Text>
                            <IconButton
                                vectorType="MaterialCommunityIcons"
                                name="arrow-bottom-left"
                                size={scaler(15)}
                                backgroundColor={mainColors.black}
                                color={mainColors.red}
                            />
                        </View>
                        <Text style={styles.niftyChangeText}>-256.36(-85.54%)</Text>
                    </View>
                </View>
                <View style={styles.resultsBasedView}>
                    <View style={styles.redIconView}>
                        <IconButton
                            vectorType="MaterialCommunityIcons"
                            name="information-outline"
                            color={mainColors.red}
                            backgroundColor={mainColors.swiperMaxDDbg}
                        />
                    </View>
                    <Text style={styles.redIconText}>
                        This security under surveillance measure
                    </Text>
                </View>
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
                <ScrollView style={{ height: scaler(600) }}>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ flexGrow: 1 }}
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={[styles.labelFlexView]}>
                            <Text style={styles.noSharesText}>No. of Shares</Text>
                            <Text style={styles.maxQText}>Max Qty. - 5</Text>
                        </View>
                        <CommonTextInput
                            value={valueShares}
                            setValue={setValueShares}
                            style={styles.onlyWidth1}
                            rightImage={
                                <View style={styles.innerFlexViewInput}>
                                    <Text style={styles.lotText}>1 Lot Size - 75</Text>
                                    <IconButton
                                        vectorType="MaterialCommunityIcons"
                                        name="information-outline"
                                        size={scaler(16)}
                                        color={mainColors.blue}
                                        backgroundColor={mainColors.black} />
                                </View>
                            }
                        />
                        <View style={styles.lineView} />
                        <Text style={styles.noSharesText}>Limit Price</Text>
                        <View style={styles.imgView}>
                            <Image source={Images.increase} resizeMode='contain' style={styles.img} />
                            <CommonTextInput
                                value={marketPrice}
                                setValue={setMarketPrice}
                                style={styles.onlyWidth}
                                containerStyle={styles.inputContainerStyle}
                                max={3}
                            />
                            <Image source={Images.decrease} resizeMode='contain' style={styles.img} />
                            <View style={styles.limitMarketView}>
                                <View style={styles.limitView}>
                                    <Text style={styles.limitText}>Limit</Text>
                                </View>
                                <View style={styles.marketView}>
                                    <Text style={styles.limitText}>Market</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.lineView} />
                        <View style={styles.innerFlexValidityView}>
                            <View>
                                <Text style={styles.validityText}>Validity of Orders</Text>
                                <Dropdown
                                    data={dropDownData}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select"
                                    value={selectedValue}
                                    containerStyle={{ borderRadius: 10, borderWidth: 1, borderColor: mainColors.inputBorder, overflow: 'hidden' }}
                                    selectedTextStyle={{ color: mainColors.white, fontFamily: fontFamily.poppinsRegular, fontSize: scaler(12) }}
                                    style={{ borderWidth: 1, borderColor: mainColors.inputBorder, height: scaler(50), width: scaler(160), borderRadius: 15, paddingHorizontal: scaler(10) }}
                                    itemTextStyle={{ color: mainColors.white, fontFamily: fontFamily.poppinsRegular, fontSize: scaler(12) }}
                                    itemContainerStyle={{ backgroundColor: mainColors.black }}
                                    onChange={item => setSelectedValue(item.value)}
                                    activeColor={mainColors.inputBorder}
                                />
                            </View>
                            <View>
                                <Text style={styles.validityText}>Disclosed Quantity</Text>
                                <CommonTextInput value="0" setValue={() => { }} containerStyle={{ width: scaler(160) }} />
                            </View>
                        </View>
                        <View style={styles.lineView} />
                        <View style={[styles.labelFlexView, { marginVertical: scaler(0) }]}>
                            <View style={styles.innerFlexView}>
                                <Text style={styles.stopLossText}>Stop Loss Order</Text>
                                <IconButton
                                    vectorType="MaterialCommunityIcons"
                                    name="information-outline"
                                    color={mainColors.blue}
                                    size={scaler(16)}
                                    backgroundColor={mainColors.black} />
                            </View>
                            <Switch
                                trackColor={{ false: '#767577', true: 'green' }}
                                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <Text style={styles.noSharesText}>Trigger Price</Text>
                        <View style={styles.imgView}>
                            <Image source={Images.increase} resizeMode='contain' style={styles.img} />
                            <CommonTextInput
                                value={marketPrice}
                                setValue={setMarketPrice}
                                style={styles.onlyWidth}
                                containerStyle={styles.inputContainerStyle1}
                            />
                            <Image source={Images.decrease} resizeMode='contain' style={styles.img} />
                        </View>
                        <FlatList data={horFlatData} renderItem={renderHoriFlatData} showsHorizontalScrollIndicator={false} horizontal />
                        <View style={[styles.labelFlexView, { marginVertical: scaler(0), marginTop: scaler(15) }]}>
                            <View style={styles.innerFlexView}>
                                <Text style={styles.stopLossText}>Add Trailing Stop Loss</Text>
                                <IconButton
                                    vectorType="MaterialCommunityIcons"
                                    name="information-outline"
                                    color={mainColors.blue}
                                    size={scaler(16)}
                                    backgroundColor={mainColors.black} />
                            </View>
                            <TouchableOpacity>
                                <Image source={Images.add} resizeMode='contain' style={styles.plusImg} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Image source={Images.bannerBuy} resizeMode='contain' style={styles.bannerImg} />
                        </TouchableOpacity>
                        <View style={styles.lineView} />
                        <View style={[styles.labelFlexView, { marginVertical: scaler(0) }]}>
                            <View style={styles.innerFlexView}>
                                <Text style={styles.stopLossText}>Create GTT</Text>
                                <IconButton
                                    vectorType="MaterialCommunityIcons"
                                    name="information-outline"
                                    color={mainColors.blue}
                                    size={scaler(16)}
                                    backgroundColor={mainColors.black} />
                            </View>
                            <Switch
                                trackColor={{ false: '#767577', true: 'green' }}
                                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={styles.lineView} />
                        <View style={[styles.innerFlexValidityView, { marginBottom: scaler(20) }]}>
                            <View>
                                <Text style={styles.validityText}>Margin Required (Approx)</Text>
                                <Text style={styles.valueText}>₹0.00</Text>
                            </View>
                            <View>
                                <Text style={styles.validityText}>Available Margin</Text>
                                <View style={styles.innerFlexView}>
                                    <Text style={styles.valueText}>₹86,56,896,56</Text>
                                    <IconButton
                                        vectorType="MaterialCommunityIcons"
                                        name="information-outline"
                                        color={mainColors.blue}
                                        size={scaler(16)}
                                        backgroundColor={mainColors.black}
                                    />
                                </View>
                            </View>
                        </View>
                        <CommonButton label='Place Buy Order' />
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        </View>
    )
}

export default BuySellOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.black
    },
    main: {
        marginHorizontal: scaler(10),
    },
    flexView: {
        flexDirection: 'row',
        marginTop: scaler(5)
    },
    labelFlexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: scaler(10)
    },
    innerFlexView: {
        flexDirection: 'row',
    },
    innerFlexViewInput: {
        flexDirection: 'row',
    },
    niftyText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white
    },
    dateText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        color: mainColors.headingTextColor
    },
    niftyValueText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        marginLeft: scaler(15),
        color: mainColors.red
    },
    niftyChangeText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        color: mainColors.headingTextColor,
    },
    niftyView: {
        width: scaler(225),
        paddingLeft: scaler(15)
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
    resultsBasedView: {
        borderRadius: 10,
        marginTop: scaler(15),
        paddingHorizontal: scaler(12),
        paddingVertical: scaler(5),
        alignItems: 'center',
        backgroundColor: mainColors.swiperMaxDDbg,
        flexDirection: 'row',
    },
    redIconView: {
        height: scaler(30),
        justifyContent: 'center',
        width: scaler(30),
    },
    redIconText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(13),
        paddingLeft: scaler(5),
        color: mainColors.white,
    },
    noSharesText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.inputLabel,
    },
    maxQText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
        color: mainColors.headingTextColor,
    },
    img: {
        height: scaler(50),
        width: scaler(60)
    },
    plusImg: {
        height: scaler(20),
        width: scaler(20)
    },
    bannerImg: {
        height: scaler(80),
        width: '100%'
    },
    imgView: {
        flexDirection: 'row'
    },
    onlyWidth: {
        width: '100%',
    },
    onlyWidth1: {
        width: '70%',
    },
    inputContainerStyle: {
        height: scaler(50),
        width: scaler(70),
        marginHorizontal: scaler(5)
    },
    inputContainerStyle1: {
        height: scaler(50),
        width: scaler(220),
        marginHorizontal: scaler(5)
    },
    limitView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: scaler(15),
        backgroundColor: mainColors.inputBorder,
    },
    limitText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
    },
    marketView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: scaler(10),
        backgroundColor: mainColors.mainButton
    },
    limitMarketView: {
        width: scaler(112),
        flexDirection: 'row',
        marginLeft: scaler(20)
    },
    lineView: {
        borderBottomWidth: 1,
        borderBottomColor: mainColors.inputBorder,
        marginTop: scaler(15),
        marginBottom: scaler(8)
    },
    sliderView: {
        width: scaler(185),
        marginRight: 0,
    },
    innerFlexValidityView: {
        flexDirection: 'row',
        marginTop: scaler(10),
        justifyContent: 'space-between',
    },
    validityText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.inputLabel,
    },
    stopLossText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        marginRight: scaler(5),
        alignSelf: 'center',
        color: mainColors.white,
    },
    lotText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
        alignSelf: 'center',
        marginRight: scaler(7),
        color: mainColors.headingTextColor,
    },
    flatItem: {
        justifyContent: 'center',
        backgroundColor: mainColors.inputBorder,
        alignItems: 'center',
        borderWidth: 1,
        marginTop: scaler(10),
        borderColor: mainColors.inputBorder,
        borderRadius: 10,
        paddingHorizontal: scaler(10),
        paddingVertical: scaler(5),
        marginRight: scaler(16)
    },
    flatItemText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
    },
    valueText: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white,
        marginRight: scaler(5)
    },
})