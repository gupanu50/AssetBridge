import { FlatList, ScrollView, Text, View } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import CommonHeader from '../../ReusableComponents/commonHeader';
import scaler from '../../Utils/scaler';
import { styles } from './styles';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import MyAlgoComponent from '../../ReusableScreenComponents/MyAlgoComponent';
import AlgoMarketPlaceComponent from '../../ReusableScreenComponents/AlgoMarketPlaceComponent';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import CommonTopBtnSlider from '../../ReusableComponents/commonTopBtnSlider';
import NoAlgoData from '../../ReusableScreenComponents/MyAlgoComponent/NoAlgoData';
import NotificationsModal from '../NotificationScreen';
import useSubscribeBotsQuery from './Hooks/useSubscribeBotsQuery';
type Props = MainStackScreenProps<'Algo' | 'AlgoMain'>;
const AlgoScreen = ({ navigation }: Props) => {
  const topTabListRef = useRef(null);
  const [activeTopTab, setActiveTopTab] = useState('My Algo');
  const { data } = useSubscribeBotsQuery();
  console.log('DataUserBots', data?.data?.data);
  const subsData = data?.data?.data;
  const [showNoti, setShowNoti] = useState(false);
  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'My Algo' },
      { id: 't2', label: 'Market Place' },
    ],
    [],
  );

  // -------------------- RENDERERS --------------------
  const renderTopTab = ({ item, index }: any) => {
    const isActive = activeTopTab === item.label;
    return (
      <CommonTabSlider
        activeTab="My Algo"
        index={index}
        label={item?.label}
        isActive={isActive}
        setIsActive={setActiveTopTab}
        style={styles.sliderView}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CommonHeader onPressBell={() => setShowNoti(!showNoti)} navigation={navigation as MainStackScreenProps<'Algo'>['navigation']} />
      <NotificationsModal
        visible={showNoti}
        onClose={() => setShowNoti(!showNoti)}
        topOffset={scaler(80)}          // tweak: header height + margin
        arrowRightOffset={scaler(35)}   // tweak: align under bell icon
      />
      <CommonTopBtnSlider navigation={navigation as MainStackScreenProps<'Algo'>['navigation']} />
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
        {(activeTopTab === 'My Algo' && subsData?.length == 0) && <NoAlgoData onPress={() => setActiveTopTab('Market Place')} />}
        {(activeTopTab === 'My Algo' && subsData?.length > 0) && <MyAlgoComponent navigation={navigation as MainStackScreenProps<'Algo'>['navigation']} subsData={subsData} />}
        {activeTopTab === 'Market Place' && <AlgoMarketPlaceComponent navigation={navigation as MainStackScreenProps<'AlgoMain'>['navigation']} />}
      </ScrollView>
    </View>
  );
};

export default AlgoScreen;
