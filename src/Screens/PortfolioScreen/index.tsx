import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import scaler from '../../Utils/scaler'
import { mainColors } from '../../Utils/helper'
import { Images } from '../../Assets'
import CommonTabSlider from '../../ReusableComponents/commonTabSlider'
import { TopTabProps } from '../../ReusableComponents/commonTypes'
import PositionsOpenComponent from '../../ReusableScreenComponents/PositionsOpenComponent'
import PositionsClosedComponent from '../../ReusableScreenComponents/PositionsClosedComponent'
import OrderComponent from '../../ReusableScreenComponents/OrdersComponent'
import { styles } from './styles'
import usePostionsOpenQuery from '../../ReusableScreenComponents/PositionsOpenComponent/Hooks/usePostionsOpenQuery'
import { formatAmount } from '../../ReusableComponents/commonFunctions'

const PortfolioScreen = () => {
    // -------------------- STATE --------------------
    const [activeTopTab, setActiveTopTab] = useState('Opened Positions');
    const { data } = usePostionsOpenQuery('open');
    const totalData = data?.data?.data?.total_invested_value;
    const totalPnl = data?.data?.data?.total_pnl;
    const unrealPnl = data?.data?.data?.total_unrealized_pnl;
    const currentValue = totalData + unrealPnl;

    // ✅ Is overall a gain or loss?
    const isOverallLoss = totalPnl < 0;
    const isGain = unrealPnl >= 0;
    // console.log('DataAllOpenPositions', data?.data?.data)
    // console.log('dataOpenPostions', totalData);
    // refs to keep tab visible while sliding
    const topTabListRef: any = useRef(null);

    // -------------------- DATA --------------------
    // Tabs exactly like image (slidable) + counts
    const topTabs = useMemo(
        () => [
            { id: 't1', label: 'Opened Positions' },
            { id: 't2', label: 'Closed Positions' },
            { id: 't3', label: 'Orders' },
        ],
        [],
    );
    // -------------------- RENDERERS --------------------
    const renderTopTab = ({ item, index }: { item: TopTabProps; index: number }) => {
        const isActive = activeTopTab === item.label;
        return (
            <CommonTabSlider
                activeTab="Opened Positions"
                index={index}
                label={item?.label}
                isActive={isActive}
                setIsActive={setActiveTopTab}
            />
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.flexView}>
                    {/* <IconButton
                        vectorType="MaterialCommunityIcons"
                        name="keyboard-backspace"
                        backgroundColor={mainColors.black}
                        color={mainColors.white}
                    /> */}
                    <Text style={[styles.srnTitle, { width: scaler(200) }]}>Portfolio</Text>
                    {/* {activeTopTab === 'Orders' && (
                        <View style={[styles.actionPill, styles.actionPillGreen]}>
                            <Image
                                source={Images.swiperRunning}
                                resizeMode="contain"
                                style={styles.inInsRunImg}
                            />
                            <Text style={[styles.actionText, { color: mainColors.white }]}>
                                RUNNING
                            </Text>
                        </View>
                    )} */}
                </View>
                <View style={styles.boxView}>
                    <View style={styles.innerBoxView}>
                        <Text style={styles.amtText}>₹{formatAmount(currentValue)}</Text>
                        {/* <TouchableOpacity>
                            <Image
                                source={Images.swiperView}
                                resizeMode="contain"
                                style={styles.swiperViewImg}
                            />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.innerBoxView1}>
                        <Image
                            source={isOverallLoss ? Images.swiperDown : Images.swiperUp}
                            resizeMode="contain"
                            style={styles.swiperUpImg}
                        />
                        <Text style={styles.overallText}>
                            {isOverallLoss ? 'Overall Loss ' : 'Overall Gain '}
                            <Text style={[
                                styles.overallText1,
                                { color: isOverallLoss ? mainColors.redText : mainColors.greenText }
                            ]}>
                                {isOverallLoss ? '-' : '+'}₹{formatAmount(Math.abs(totalPnl))}
                            </Text>
                        </Text>
                    </View>
                    <View style={[styles.innerBoxView1, { marginTop: scaler(10) }]}>
                        <View style={[styles.pnlView, { width: scaler(145), marginRight: scaler(15) }]}>
                            <Text style={styles.todayText}>Invested Value</Text>
                            <Text style={styles.todayValueText}>₹ {formatAmount(totalData)}</Text>
                        </View>
                        <View style={[styles.pnlView, { width: scaler(145) }]}>
                            <Text style={styles.todayText}>Today’s Gain</Text>
                            <Text style={[
                                styles.todayValueText,
                                { color: isGain ? mainColors.greenText : mainColors.redText }
                            ]}>
                                {isGain ? '+' : '-'}₹ {formatAmount(Math.abs(unrealPnl))}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.belowBox}>
                        {/* <Image source={Images.portfolioCard} resizeMode='contain' style={styles.img} />
                        <Text style={styles.analyzeText}>Analyze</Text> */}
                    </View>
                </View>
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {activeTopTab === 'Opened Positions' && (
                    <PositionsOpenComponent />
                )}
                {activeTopTab === 'Closed Positions' && <PositionsClosedComponent />}
                {activeTopTab === 'Orders' && <OrderComponent />}

            </ScrollView>
        </View>
    )
}

export default PortfolioScreen