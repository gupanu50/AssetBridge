import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import scaler from '../../Utils/scaler'
import IconButton from '../../ReusableComponents/iconButton'
import { fontFamily, mainColors } from '../../Utils/helper'
import { Images } from '../../Assets'
import CommonTabSlider from '../../ReusableComponents/commonTabSlider'
import { TopTabProps } from '../../ReusableComponents/commonTypes'
import PositionsOpenComponent from '../../ReusableScreenComponents/PositionsOpenComponent'
import PositionsClosedComponent from '../../ReusableScreenComponents/PositionsClosedComponent'
import OrderComponent from '../../ReusableScreenComponents/OrdersComponent'
import { styles } from './styles'

const PortfolioScreen = () => {
    // -------------------- STATE --------------------
    const [activeTopTab, setActiveTopTab] = useState('Opened Positions');

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
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.flexView}>
                        <IconButton
                            vectorType="MaterialCommunityIcons"
                            name="keyboard-backspace"
                            backgroundColor={mainColors.black}
                            color={mainColors.white}
                        />
                        <Text style={[styles.srnTitle, { width: scaler(200) }]}>Portfolio</Text>
                        {activeTopTab === 'Orders' && (
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
                        )}
                    </View>
                    <View style={styles.boxView}>
                        <View style={styles.innerBoxView}>
                            <Text style={styles.amtText}>₹23,22,574,11</Text>
                            <TouchableOpacity>
                                <Image
                                    source={Images.swiperView}
                                    resizeMode="contain"
                                    style={styles.swiperViewImg}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.innerBoxView1}>
                            <Image
                                source={Images.swiperDown}
                                resizeMode="contain"
                                style={styles.swiperUpImg}
                            />
                            <Text style={styles.overallText}>Overall Loss <Text style={styles.overallText1}>-₹23, 22,574,11</Text> (-25.56%)</Text>
                        </View>
                        <View style={[styles.innerBoxView1, { marginTop: scaler(10) }]}>
                            <View style={[styles.pnlView, { width: scaler(130), marginRight: scaler(10) }]}>
                                <Text style={styles.todayText}>Invested Value</Text>
                                <Text style={styles.todayValueText}>₹ 5,235,00</Text>
                            </View>
                            <View style={styles.pnlView}>
                                <Text style={styles.todayText}>Today’s Gain</Text>
                                <Text style={styles.todayValueText}>₹ 2,0321,00 <Text>(+12.25%)</Text></Text>
                            </View>
                        </View>
                        <View style={styles.belowBox}>
                            <Image source={Images.portfolioCard} resizeMode='contain' style={styles.img} />
                            <Text style={styles.analyzeText}>Analyze</Text>
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
                {activeTopTab === 'Opened Positions' && (
                    <PositionsOpenComponent isShow={false} />
                )}
                {activeTopTab === 'Closed Positions' && <PositionsClosedComponent isShow={false} />}
                {activeTopTab === 'Orders' && <OrderComponent isShow={false} />}
            </View>
        </ScrollView>
    )
}

export default PortfolioScreen