/* eslint-disable react/no-unstable-nested-components */
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import scaler from '../../Utils/scaler';
import CommonHeader from '../../ReusableComponents/commonHeader';
import { Images } from '../../Assets';
import { TopTab, TopTabApi, WatchRow } from './type';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import CommonTopBtnSlider from '../../ReusableComponents/commonTopBtnSlider';
import CommonKababMenu from '../../ReusableComponents/commonKababMenu';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import WatchRowItem from './watchRowItem';
import useWatchlistQuery from './Hooks/useWatchlistQuery';
type Props = MainStackScreenProps<'WatchList'>;
type AnchorRect = { x: number; y: number; width: number; height: number };
const WatchListScreen = ({ navigation }: Props) => {
  const topTabListRef: any = useRef<FlatList<TopTab>>(null);
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const { data } = useWatchlistQuery();
  console.log('WatchData', data)
  const [activeTopTab, setActiveTopTab] = useState(null);
  const watchListApiData = data?.data?.data;
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  useEffect(() => {
    if (watchListApiData?.length && !activeTopTab) {
      setActiveTopTab(watchListApiData[0].name);
    }
  }, [watchListApiData, activeTopTab]);
  const renderTopTab = ({ item, index }: { item: TopTabApi; index: number }) => {
    const isActive = activeTopTab === item.name;
    return (
      <CommonTabSlider
        activeTab={item?.name}
        index={index}
        label={item?.name}
        isActive={isActive}
        setIsActive={setActiveTopTab}
      />
    );
  };
  const openMenuAt = (rect: AnchorRect) => {
    setAnchor(rect);
    setVisible(true);
  };
  // ✅ NEW: row UI
  const renderWatchRow = ({ item }: { item: WatchRow }) => {
    return (
      <WatchRowItem
        item={item?.items[0]}
        onPressRow={() => navigation.navigate('Instrument')}
        onOpenMenu={openMenuAt}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CommonHeader navigation={navigation} />
      <View style={styles.mainView}>
        <CommonTopBtnSlider navigation={navigation} />
      </View>
      <View style={styles.topTabsWrap}>
        <FlatList
          ref={topTabListRef}
          data={watchListApiData}
          keyExtractor={item => item.name}
          renderItem={renderTopTab}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topTabsContent}
          onScrollToIndexFailed={() => { }}
        />
      </View>
      <View style={styles.mainView}>
        <View style={styles.flexView}>
          <CommonTextInput
            value={input}
            setValue={setInput}
            leftImage={
              <View style={styles.searchView}>
                <Image source={Images.search} resizeMode='contain' style={styles.searchLogo} />
              </View>
            }
            containerStyle={{ height: scaler(38), marginTop: scaler(15), borderRadius: 25, borderColor: '#202020' }}
            style={{ fontSize: scaler(11) }}
          />
          <TouchableOpacity style={styles.settingsTouch}>
            <Image
              source={Images.settingsWatchlist}
              resizeMode="contain"
              style={styles.settingsImg}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.watchListWrap}>
          <FlatList
            data={watchListApiData}
            keyExtractor={item => item.items[0].symbol}
            renderItem={renderWatchRow}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={styles.watchSeparator} />
            )}
            contentContainerStyle={{ paddingBottom: scaler(10) }}
          />
        </View>
      </View>
      <CommonKababMenu visible={visible} setVisible={setVisible} anchor={anchor} />
    </View>
  );
};

export default WatchListScreen;
