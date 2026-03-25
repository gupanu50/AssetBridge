import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { fontFamily, mainColors } from '../../Utils/helper'
import scaler from '../../Utils/scaler'
import IconButton from '../../ReusableComponents/iconButton'
import { Images } from '../../Assets'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { TopTabProps } from '../../ReusableComponents/commonTypes'
import CommonTabSlider from '../../ReusableComponents/commonTabSlider'
import OrderComponent from '../../ReusableScreenComponents/OrdersComponent'
import PositionsOpenComponent from '../../ReusableScreenComponents/PositionsOpenComponent'
import PositionsClosedComponent from '../../ReusableScreenComponents/PositionsClosedComponent'
import OverviewComponent from '../../ReusableScreenComponents/OverviewComponent'
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes'
import { styles } from './styles'
import { formatAmount } from '../../ReusableComponents/commonFunctions'
import PositionsOpenBotComponent from '../../ReusableScreenComponents/PositionsOpenBotComponent'
import PositionsBotClosedComponent from '../../ReusableScreenComponents/PositionsClosedBotComponent'
import OrderBotComponent from '../../ReusableScreenComponents/OrdersBotComponent'
type Props = MainStackScreenProps<'AlgoMain'>;
const AlgoMainScreen = ({ navigation, route }: Props) => {
  console.log('RouteAlgomainScreen', route?.params?.item);
  const routeParams = route?.params?.item;
  const [activeTopTab, setActiveTopTab] = useState('Opened Positions');
  const topTabListRef: any = useRef(null);

  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Opened Positions' },
      { id: 't2', label: 'Closed Positions' },
      { id: 't3', label: 'Orders' },
      { id: 't4', label: 'Overview' },
    ],
    [],
  );
  const todayPnl = routeParams?.backtest_results?.daily_pnl[routeParams?.backtest_results?.daily_pnl?.length - 1]?.pnl;
  const unrealPnl = routeParams?.backtest_results?.daily_pnl[routeParams?.backtest_results?.daily_pnl?.length - 1]?.cumulative_pnl;
  const todayPnlString = todayPnl?.toString();
  const unrealPnlString = unrealPnl?.toString();
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
  const getInitials = (name?: string) => {
    const n = (name || '').trim();
    if (!n) return '?';

    const parts = n.split(/\s+/).filter(Boolean);

    // If multiple words => first char of first + first char of last
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    // Single word => first 2 chars
    const word = parts[0];
    return word.slice(0, 2).toUpperCase();
  };
  return (
    <View style={styles.container}>

      <View style={[styles.flexView, { marginHorizontal: scaler(15) }]}>
        <View style={[styles.flexView, { justifyContent: 'center' }]}>
          <IconButton vectorType="MaterialCommunityIcons"
            name="keyboard-backspace"
            onPress={() => navigation.goBack()}
            backgroundColor={mainColors.black}
            color={mainColors.white} />
          <Text style={styles.headerTitle}>My Algo Main Page</Text>
        </View>
        <View style={[styles.actionPill, styles.actionPillGreen]}>
          {(routeParams?.running_status === 'pause') ?
            <Image
              source={Images.pausedBtn}
              resizeMode="contain"
              style={styles.imgView}
            /> :

            <Image
              source={Images.runningBtn}
              resizeMode="contain"
              style={styles.imgView}
            />
          }
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaler(30) }}
      >
        <View style={styles.main}>
          <View style={styles.boxView}>
            <View style={styles.innerBoxView}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoInitials}>{getInitials(routeParams?.name)}</Text>
              </View>
              <View style={styles.headingView}>
                <Text style={styles.companyNameText}>{routeParams?.name}</Text>
                <Text style={styles.deployedText}>Deployed Capital: <Text style={{ color: mainColors.greenText }}>₹ {formatAmount(routeParams?.price)}</Text></Text>
              </View>
              {/* <IconButton
                name="chevron-right"
                color={mainColors.white}
                style={{ paddingBottom: scaler(22) }}
                vectorType="MaterialCommunityIcons"
              /> */}
            </View>
            <View style={styles.innerBoxView1}>
              <View style={[styles.pnlView, { width: scaler(150) }]}>
                <Text style={styles.todayText}>Today’s PnL</Text>
                <Text style={[styles.todayValueText, { color: todayPnlString.includes('-') ? mainColors.redText : mainColors.greenText }]}>₹ {formatAmount(todayPnlString)}</Text>
              </View>
              <View style={[styles.pnlView, { width: scaler(160) }]}>
                <Text style={styles.todayText}>Overall PnL</Text>
                <Text style={styles.todayValueText}>₹ {formatAmount(routeParams?.backtest_results?.summary?.net_pnl)} <Text>({routeParams?.backtest_results?.summary?.win_rate}%)</Text></Text>
              </View>
            </View>
          </View>
          <View style={styles.innerBoxView2}>
            <Text style={styles.unrealText}>Unrealized PnL</Text>
            <Text style={styles.unrealValueText}>₹ {formatAmount(unrealPnl)} <Text>({routeParams?.backtest_results?.summary?.win_rate}%)</Text></Text>
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
        {activeTopTab === 'Orders' && <OrderBotComponent bot_id={routeParams?.bot_id} />}
        {activeTopTab === 'Opened Positions' && <PositionsOpenBotComponent bot_id={routeParams?.bot_id} />}
        {activeTopTab === 'Closed Positions' && <PositionsBotClosedComponent bot_id={routeParams?.bot_id} />}
        {activeTopTab === 'Overview' && <OverviewComponent overViewData={routeParams?.backtest_results?.summary} />}
      </ScrollView>
    </View>
  )
}

export default AlgoMainScreen