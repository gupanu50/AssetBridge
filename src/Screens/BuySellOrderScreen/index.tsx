import { FlatList, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { fontFamily, getApiErrorMessage, isMarketOpenIST, mainColors } from '../../Utils/helper'
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
import { styles } from './styles'
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes'
import useTopMoversPercentageQuery from '../HomeScreen/Hooks/useTopMoversPercentQuery'
import moment from 'moment'
import useBuySellMutation from './Hooks'
import snackbarHandler from '../../Utils/snackbarHandler'
import { getLastByKey, onWsMessage } from '../../Utils/ws/marketSocket'
import { computeChange, formatChange, lastPart } from '../../Utils/ws/commonWebSocketFunctions'
type Props = MainStackScreenProps<'BuySellOrder'>;
const BuySellOrderScreen = ({ navigation, route }: Props) => {
    const [activeTopTab, setActiveTopTab] = useState('Carry Forward');
    const [valueShares, setValueShares] = useState(0);
    const [marketPrice, setMarketPrice] = useState(200);
    const [stopLossvalue, setStopLossValue] = useState(0);
    const [limitMarket, setLimitMarket] = useState('market')
    const { mutate } = useBuySellMutation();
    const [isEnabled, setIsEnabled] = useState(false);
    const isMarketHours = isMarketOpenIST();
    console.log('routeParamsBuySell', route?.params?.buySelldata);
    const buySellParams = route?.params?.buySelldata;
    const [selectedValue, setSelectedValue] = useState<string | null>('day');
    const buySell = () => {
        mutate({
            exchange: buySellParams?.paramItem?.segment || 'indices',
            is_automated: false,
            segment: buySellParams?.paramItem?.segment || 'indices',
            order_tag: 'MANUAL_TRADE_01',
            //@ts-ignore
            quantity: parseInt(valueShares),
            side: buySellParams?.buynav,
            order_type: limitMarket,
            product_type: 'mis',
            take_profit: 2600,
            symbol: buySellParams?.paramItem?.symbol,
            time_in_force: 'day',
            //@ts-ignore
            limit_price: parseInt(marketPrice),
            //@ts-ignore
            stop_loss: parseInt(stopLossvalue)
        },
            {
                onSuccess: response => {
                    console.log('Response', response)
                    snackbarHandler.successToast('Your order has been placed')
                },
                onError: er => {
                    const msg = getApiErrorMessage(er)
                    snackbarHandler.errorToast(msg);
                },
            },)
    }
    let moversDetails;
    if (buySellParams?.paramItem?.segment) {
        const { data: moversPercentageData } = useTopMoversPercentageQuery({
            exchange: buySellParams?.nav === 'movers' ? buySellParams?.paramItem?.segment : buySellParams?.paramItem?.exchange,
            name: buySellParams?.paramItem?.symbol
        },
            {
                queryKey: ['/price/market/move', 'NSE', buySellParams?.paramItem?.symbol],
                refetchInterval: isMarketHours ? 10 : false,
            }
        )
        const moverPercentageDataDetails = moversPercentageData?.data?.data
        moversDetails = React.useMemo(() => {
            return moverPercentageDataDetails
        }, [moverPercentageDataDetails]);
    }
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
                activeTab="Carry Forward"
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
            { id: 't1', label: 'Carry Forward', isRightText: false },
            { id: 't2', label: 'Intraday', isRightText: true },
        ],
        [],
    );
    function normalizeWsSymbol(raw: any): string {
        const s = String(raw ?? "").trim().toUpperCase();

        if (s === "NIFTY 50" || s === "NIFTY50") return "NIFTY50";
        if (s === "NIFTY BANK" || s === "NIFTYBANK") return "NIFTYBANK";
        if (s === "SENSEX") return "SENSEX";

        // generic fallback: remove spaces
        return s.replace(/\s+/g, "");
    }
    const rawSymbol =
        buySellParams?.paramItem?.symbol
    const symbol = normalizeWsSymbol(rawSymbol);

    const [live, setLive] = useState(() => {
        const payload =
            getLastByKey(`INDICES:${symbol}`) ||
            getLastByKey(symbol); // snapshot cache key
        const { ltp, abs, pct } = computeChange(payload);
        return { ltp, abs, pct };
    });

    useEffect(() => {
        if (!symbol) return;

        const off = onWsMessage((msg) => {
            if (msg?.type !== "snapshot" && msg?.type !== "update") return;
            if (!msg?.data || typeof msg.data !== "object") return;

            let payload: any;

            if (msg.type === "snapshot") {
                payload = msg.data?.[symbol]; // { NIFTY50: {...} }
            } else {
                // { "INDICES:NIFTY50": {...} }
                for (const [k, v] of Object.entries(msg.data)) {
                    if (lastPart(k) === symbol) {
                        payload = v;
                        break;
                    }
                }
            }

            // fallback: match by payload.symbol
            if (!payload) {
                for (const v of Object.values(msg.data)) {
                    const sym = String((v as any)?.symbol ?? "").toUpperCase();
                    if (sym === symbol) {
                        payload = v;
                        break;
                    }
                }
            }

            if (!payload) return;

            const { ltp, abs, pct } = computeChange(payload);
            setLive((prev) =>
                prev.ltp === ltp && prev.abs === abs && prev.pct === pct
                    ? prev
                    : { ltp, abs, pct }
            );
        });

        return () => off();
    }, [symbol]);
    // add this helper
    const bumpMarketPrice = (delta: number) => {
        setMarketPrice((prev: any) => {
            const n =
                typeof prev === 'number'
                    ? prev
                    : parseFloat(String(prev).replace(/[^\d.]/g, '')) || 0;

            const next = n + delta;
            return next < 0 ? 0 : next; // prevent negative
        });
    };
    const bumpMarketPrice1 = (delta: number) => {
        setStopLossValue((prev: any) => {
            const n =
                typeof prev === 'number'
                    ? prev
                    : parseFloat(String(prev).replace(/[^\d.]/g, '')) || 0;

            const next = n + delta;
            return next < 0 ? 0 : next; // prevent negative
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.flexView}>
                    <IconButton
                        vectorType="MaterialCommunityIcons"
                        onPress={() => navigation.goBack()}
                        name="keyboard-backspace"
                        backgroundColor={mainColors.black}
                        color={mainColors.white}
                    />
                    <View style={styles.niftyView}>
                        <Text style={styles.niftyText}>{buySellParams?.paramItem?.symbol}</Text>
                        <Text style={styles.dateText}>{moment().format('DD-MMM-YY')}</Text>
                    </View>
                    {buySellParams?.paramItem?.segment ? <View>
                        <View style={styles.innerFlexView}>
                            <Text style={styles.niftyValueText}>₹ {moversDetails?.current_price}</Text>
                            <IconButton
                                vectorType="MaterialCommunityIcons"
                                name={moversDetails?.absolute_change < 0 ? "arrow-bottom-left" : "arrow-bottom-right"}
                                size={scaler(15)}
                                backgroundColor={mainColors.black}
                                color={moversDetails?.absolute_change < 0 ? mainColors.redText : mainColors.greenText}
                            />
                        </View>
                        <Text style={styles.niftyChangeText}>{moversDetails?.absolute_change}({moversDetails?.percentage_change}%)</Text>
                    </View> :
                        <View>
                            <View style={styles.innerFlexView}>
                                <Text style={styles.niftyValueText}>₹ {buySellParams?.paramItem?.current_price}</Text>
                                <IconButton
                                    vectorType="MaterialCommunityIcons"
                                    name={formatChange(live.abs, live.pct).includes('-') ? "arrow-bottom-left" : "arrow-bottom-right"}
                                    size={scaler(15)}
                                    backgroundColor={mainColors.black}
                                    color={formatChange(live.abs, live.pct).includes('-') ? mainColors.redText : mainColors.greenText}
                                />
                            </View>
                            <Text style={styles.niftyChangeText}>{formatChange(live.abs, live.pct)}%</Text>
                        </View>
                    }
                </View>
                <View style={styles.resultsBasedView}>
                    <View style={styles.redIconView}>
                        <IconButton
                            vectorType="MaterialCommunityIcons"
                            name="information-outline"
                            color={mainColors.red}
                            size={scaler(18)}
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
                <ScrollView style={{ height: scaler(580) }}>
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
                            <TouchableOpacity onPress={() => bumpMarketPrice(+1)}>
                                <Image source={Images.increase} resizeMode='contain' style={styles.img} />
                            </TouchableOpacity>
                            <CommonTextInput
                                value={String(marketPrice)}
                                setValue={setMarketPrice}
                                keyboardType='numeric'
                                style={styles.onlyWidth}
                                containerStyle={styles.inputContainerStyle}
                                max={3}
                            />
                            <TouchableOpacity onPress={() => bumpMarketPrice(-1)}>
                                <Image source={Images.decrease} resizeMode='contain' style={styles.img} />
                            </TouchableOpacity>
                            <View style={styles.limitMarketView}>
                                <TouchableOpacity style={[styles.limitView, { backgroundColor: limitMarket === 'limit' ? mainColors.mainButton : mainColors.googleButton }]} onPress={() => setLimitMarket('limit')}>
                                    <Text style={styles.limitText}>Limit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.marketView, { backgroundColor: limitMarket === 'market' ? mainColors.mainButton : mainColors.googleButton }]} onPress={() => setLimitMarket('market')}>
                                    <Text style={styles.limitText}>Market</Text>
                                </TouchableOpacity>
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
                            <TouchableOpacity onPress={() => bumpMarketPrice1(+1)}>
                                <Image source={Images.increase} resizeMode='contain' style={styles.img} />
                            </TouchableOpacity>
                            <CommonTextInput
                                value={String(stopLossvalue)}
                                setValue={setStopLossValue}
                                keyboardType='numeric'
                                style={styles.onlyWidth}
                                containerStyle={styles.inputContainerStyle1}
                            />
                            <TouchableOpacity onPress={() => bumpMarketPrice1(-1)}>
                                <Image source={Images.decrease} resizeMode='contain' style={styles.img} />
                            </TouchableOpacity>
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
                        <CommonButton label='Place Buy Order' extraStyle={{ marginBottom: scaler(15) }} onPress={() => buySell()} />
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        </View>
    )
}

export default BuySellOrderScreen