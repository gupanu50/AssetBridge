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
type Props = MainStackScreenProps<'AlgoMain'>;
const AlgoMainScreen = ({ navigation }: Props) => {
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

      <View style={[styles.flexView, { marginHorizontal: scaler(15) }]}>
        <IconButton vectorType="MaterialCommunityIcons"
          name="keyboard-backspace"
          onPress={() => navigation.goBack()}
          backgroundColor={mainColors.black}
          color={mainColors.white} />
        <Text style={styles.headerTitle}>My Algo Main Page</Text>
        <View style={[styles.actionPill, styles.actionPillGreen]}>
          <Image
            source={Images.swiperRunning}
            resizeMode="contain"
            style={styles.inInsRunImg}
          />
          <Text style={[styles.actionText, { color: mainColors.white }]}>
            Running
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaler(30) }}
      >
        <View style={styles.main}>
          <View style={styles.boxView}>
            <View style={styles.innerBoxView}>
              <Image source={Images.comLogo} resizeMode='contain' style={styles.imgView} />
              <View style={styles.headingView}>
                <Text style={styles.companyNameText}>TradeMilaan Sensex Buying DTE 0,1,2,3,4...</Text>
                <Text style={styles.deployedText}>Deployed Capital: <Text style={{ color: mainColors.swiperPnl }}>₹ 1,000,00</Text></Text>
              </View>
              <IconButton
                name="chevron-right"
                color={mainColors.white}
                style={{ paddingBottom: scaler(22) }}
                vectorType="MaterialCommunityIcons"
              />
            </View>
            <View style={styles.innerBoxView1}>
              <View style={[styles.pnlView, { width: scaler(140) }]}>
                <Text style={styles.todayText}>Today’s PnL</Text>
                <Text style={styles.todayValueText}>₹ 5,235,00</Text>
              </View>
              <View style={styles.pnlView}>
                <Text style={styles.todayText}>Overall PnL</Text>
                <Text style={styles.todayValueText}>₹ 2,0321,00 <Text>(+12.25%)</Text></Text>
              </View>
            </View>
          </View>
          <View style={styles.innerBoxView2}>
            <Text style={styles.unrealText}>Unrealized PnL</Text>
            <Text style={styles.unrealValueText}>₹ 8,589,00 <Text>(+08.36%)</Text></Text>
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
        {activeTopTab === 'Orders' && <OrderComponent />}
        {activeTopTab === 'Opened Positions' && <PositionsOpenComponent />}
        {activeTopTab === 'Closed Positions' && <PositionsClosedComponent />}
        {activeTopTab === 'Overview' && <OverviewComponent />}
      </ScrollView>
    </View>
  )
}

export default AlgoMainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColors.black
  },
  main: {
    marginHorizontal: scaler(10)
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaler(10)
  },
  headerTitle: {
    color: mainColors.white,
    fontSize: scaler(15),
    marginRight: scaler(70),
    fontFamily: fontFamily.poppinsMedium
  },
  actionPill: {
    paddingRight: scaler(15),
    paddingVertical: scaler(5),
    flexDirection: 'row',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    alignItems: 'center',
  },
  inInsRunImg: {
    height: scaler(20),
    width: scaler(20),
    marginLeft: scaler(2),
  },
  actionPillGreen: {
    marginRight: 0,
    backgroundColor: mainColors.swiperPnl,
    borderColor: 'transparent',
  },
  actionText: {
    fontFamily: fontFamily.poppinsRegular,
    color: mainColors.white,
    fontSize: scaler(10),
    opacity: 0.9,
    marginLeft: scaler(4),
  },
  boxView: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: mainColors.moversCards,
    borderColor: mainColors.inputBorder,
    marginTop: scaler(15),
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(10),
  },
  innerBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerBoxView1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaler(15),
    justifyContent: 'space-between',
  },
  innerBoxView2: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: mainColors.moversCards,
    borderColor: mainColors.inputBorder,
    marginTop: scaler(15),
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgView: {
    height: scaler(30),
    width: scaler(30),
  },
  companyNameText: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: scaler(12),
    color: mainColors.white,
  },
  deployedText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(10),
    color: mainColors.inputLabel,
  },
  headingView: {
    marginLeft: scaler(5),
    width: scaler(260),
  },
  todayText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(12),
    color: mainColors.headingTextColor,
  },
  todayValueText: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: scaler(14),
    color: mainColors.swiperPnl,
  },
  pnlView: {
    borderWidth: 1,
    borderColor: mainColors.inputBorder,
    borderRadius: 10,
    backgroundColor: mainColors.pnlCard,
    paddingHorizontal: scaler(10),
    paddingVertical: scaler(5),
  },
  unrealText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: scaler(12),
    color: mainColors.white,
  },
  unrealValueText: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: scaler(14),
    color: mainColors.swiperPnl,
  },
  topTabsWrap: {
    marginTop: scaler(15),
    paddingTop: scaler(5),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: mainColors.inputBorder,
  },
  topTabsContent: {
    paddingRight: scaler(10),
  },
})