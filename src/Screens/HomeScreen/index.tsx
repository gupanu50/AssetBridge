import { View, ScrollView, FlatList } from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import CommonHeader from '../../ReusableComponents/commonHeader';
import scaler from '../../Utils/scaler';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { styles } from './styles';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { TopTab } from './types';
import ExploreComponent from '../../ReusableScreenComponents/ExploreComponent';
import PositionsOpenComponent from '../../ReusableScreenComponents/PositionsOpenComponent';
import PositionsClosedComponent from '../../ReusableScreenComponents/PositionsClosedComponent';
import CommonTopBtnSlider from '../../ReusableComponents/commonTopBtnSlider';
import NotificationsModal from '../NotificationScreen';
import useOptionChainDatesDataQuery from '../OptionsChainScreen/Hooks/useGetOptionDatesDataQuery';
import { useDispatch } from 'react-redux';
import { expiry50Data, expiryBankData } from '../../Redux/optionChainExpirySlice';

type Props = MainStackScreenProps<'HomeTab'>;
const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  // -------------------- STATE --------------------
  const [activeTopTab, setActiveTopTab] = useState('Explore');
  const { data: optionChain50DatesData } = useOptionChainDatesDataQuery({
    symbol: String('Nifty50'),
  })
  const nifty50Data = useMemo(() => optionChain50DatesData?.data?.data?.data, [optionChain50DatesData]);
  const { data: optionChainBankDatesData } = useOptionChainDatesDataQuery({
    symbol: String('NiftyBank'),
  });
  const niftyBankData = useMemo(() => optionChainBankDatesData?.data?.data?.data, [optionChainBankDatesData]);

  // Dispatch data to Redux when it changes
  useEffect(() => {
    if (nifty50Data) {
      dispatch(expiry50Data(nifty50Data));
    }
  }, [nifty50Data, dispatch]);

  useEffect(() => {
    if (niftyBankData) {
      dispatch(expiryBankData(niftyBankData));
    }
  }, [niftyBankData, dispatch]);

  // refs to keep tab visible while sliding
  const topTabListRef: any = useRef(null);

  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Explore' },
      { id: 't2', label: 'Positions Opened' },
      { id: 't3', label: 'Positions Closed' },
    ],
    [],
  );
  // -------------------- RENDERERS --------------------
  const renderTopTab = ({ item, index }: { item: TopTab; index: number }) => {
    const isActive = activeTopTab === item.label;
    return (
      <CommonTabSlider
        activeTab="Explore"
        index={index}
        label={item?.label}
        isActive={isActive}
        setIsActive={setActiveTopTab}
      />
    );
  };

  // Top Movers grid cards (kept)
  const [showNoti, setShowNoti] = useState(false);
  return (
    <View style={styles.container}>
      <CommonHeader onPressBell={() => setShowNoti(!showNoti)} navigation={navigation} />
      <NotificationsModal
        visible={showNoti}
        onClose={() => setShowNoti(!showNoti)}
        topOffset={scaler(80)}          // tweak: header height + margin
        arrowRightOffset={scaler(35)}   // tweak: align under bell icon
      />
      <CommonTopBtnSlider navigation={navigation} />

      {/* -------------------- SLIDABLE TOP TABS (LIKE IMAGE) -------------------- */}
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
        contentContainerStyle={{ paddingBottom: scaler(30) }}
      >
        {activeTopTab === 'Explore' && (
          <ExploreComponent navigation={navigation} />
        )}
        {activeTopTab === 'Positions Opened' && <PositionsOpenComponent />}
        {activeTopTab === 'Positions Closed' && <PositionsClosedComponent />}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
