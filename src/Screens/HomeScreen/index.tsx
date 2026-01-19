import { View, ScrollView, FlatList, Text } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import CommonHeader from '../../ReusableComponents/commonHeader';
import { mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { styles } from './styles';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { TopTab } from './types';
import ExploreComponent from '../../ReusableScreenComponents/ExploreComponent';
import PositionsOpenComponent from '../../ReusableScreenComponents/PositionsOpenComponent';
import PositionsClosedComponent from '../../ReusableScreenComponents/PositionsClosedComponent';

type Props = MainStackScreenProps<'HomeTab'>;
const HomeScreen = ({ navigation }: Props) => {
  // -------------------- STATE --------------------
  const [activeTopTab, setActiveTopTab] = useState('Explore');

  // refs to keep tab visible while sliding
  const topTabListRef: any = useRef(null);

  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Explore' },
      { id: 't2', label: 'Positions Open(23)' },
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

  return (
    <View style={styles.container}>
      <CommonHeader navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaler(30) }}
      >
        <View style={styles.mainView}>
          {/* -------------------- Header Boxes -------------------- */}
          <View style={styles.flexMainView}>
            <View style={styles.innerBoxView}>
              <Text style={styles.textNifty}>NIFTY 50</Text>
              <Text style={styles.textNiftyValue}>
                25944.75{' '}
                <Text style={{ color: mainColors.green }}>87.45(0.34%)</Text>
              </Text>
            </View>

            <View style={styles.innerBoxView}>
              <Text style={styles.textNifty}>SENSEX</Text>
              <Text style={styles.textNiftyValue}>
                84977.45{' '}
                <Text style={{ color: mainColors.red }}>-287.45(0.34%)</Text>
              </Text>
            </View>
          </View>
        </View>

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
        {activeTopTab === 'Explore' && <ExploreComponent />}
        {activeTopTab === 'Positions Open(23)' && <PositionsOpenComponent />}
        {activeTopTab === 'Positions Closed' && <PositionsClosedComponent />}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
