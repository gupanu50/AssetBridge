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
type Props = MainStackScreenProps<'Algo' | 'AlgoMain'>;
const AlgoScreen = ({ navigation }: Props) => {
  const topTabListRef = useRef(null);
  const [activeTopTab, setActiveTopTab] = useState('My Algo');
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
      <CommonHeader navigation={navigation as MainStackScreenProps<'Algo'>['navigation']} />
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
        {activeTopTab === 'My Algo' && <NoAlgoData navigation={navigation as MainStackScreenProps<'Algo'>['navigation']} />}
        {activeTopTab === 'Market Place' && <AlgoMarketPlaceComponent navigation={navigation as MainStackScreenProps<'AlgoMain'>['navigation']} />}
      </ScrollView>
    </View>
  );
};

export default AlgoScreen;
