import { FlatList, ScrollView, Text, View } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import CommonHeader from '../../ReusableComponents/commonHeader';
import { mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { styles } from './styles';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import MyAlgoComponent from '../../ReusableScreenComponents/MyAlgoComponent';
import AlgoMarketPlaceComponent from '../../ReusableScreenComponents/AlgoMarketPlaceComponent';

const AlgoScreen = () => {
  const topTabListRef: any = useRef(null);
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
      <CommonHeader />

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
            onScrollToIndexFailed={() => {}}
          />
        </View>
        {activeTopTab === 'My Algo' && <MyAlgoComponent />}
        {activeTopTab === 'Market Place' && <AlgoMarketPlaceComponent />}
      </ScrollView>
    </View>
  );
};

export default AlgoScreen;
