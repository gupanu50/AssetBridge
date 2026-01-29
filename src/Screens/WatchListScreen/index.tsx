/* eslint-disable react/no-unstable-nested-components */
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import CommonHeader from '../../ReusableComponents/commonHeader';
import IconButton from '../../ReusableComponents/iconButton';
import { Images } from '../../Assets';
import { TopTab, WatchRow } from './type';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import CommonTopBtnSlider from '../../ReusableComponents/commonTopBtnSlider';
import CommonKababMenu from '../../ReusableComponents/commonKababMenu';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import WatchRowItem from './watchRowItem';
type Props = MainStackScreenProps<'WatchList'>;
type AnchorRect = { x: number; y: number; width: number; height: number };
const WatchListScreen = ({ navigation }: Props) => {
  const topTabListRef = useRef<FlatList<TopTab>>(null);
  const [activeTopTab, setActiveTopTab] = useState('Watchlist');
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const renderTopTab = ({ item, index }: { item: TopTab; index: number }) => {
    const isActive = activeTopTab === item.label;
    return (
      <CommonTabSlider
        activeTab="Watchlist"
        index={index}
        label={item?.label}
        isActive={isActive}
        setIsActive={setActiveTopTab}
      />
    );
  };
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Watchlist' },
      { id: 't2', label: 'WatchList 1' },
      { id: 't3', label: 'WatchList 2' },
      // if later you want more tabs, add here (it will remain slidable)
      // {id:'t4', label:'Watchlist'}
    ],
    [],
  );
  const watchRows = useMemo(
    () => [
      {
        id: 'w1',
        name: 'GOLDBEES',
        exch: 'NFO',
        price: '106.45',
        change: '0.82(0.78%)',
        isUp: true,
      },
      {
        id: 'w2',
        name: 'HDFCBANK',
        exch: 'NSE',
        price: '1000.00',
        change: '10.80(1.09%)',
        isUp: true,
      },
      {
        id: 'w3',
        name: 'HINDUNILVR',
        exch: 'NFO',
        price: '2444.40',
        change: '-33.40(-1.35%)',
        isUp: false,
      },
      {
        id: 'w4',
        name: 'NIFTY 25000 CE',
        exch: 'BSE',
        price: '1575.40',
        change: '14.40(0.92%)',
        isUp: true,
      },
      {
        id: 'w5',
        name: 'ONGC',
        exch: 'INDICES',
        price: '240.03',
        change: '-3.51(-1.44%)',
        isUp: false,
      },
      {
        id: 'w6',
        name: 'TCS',
        exch: 'NFO',
        price: '3175.90',
        change: '41.20(1.31%)',
        isUp: true,
      },
      {
        id: 'w7',
        name: 'RELIANCE',
        exch: 'NFO',
        price: '359.63',
        change: '-116.40(-3.35%)',
        isUp: false,
      },
      {
        id: 'w8',
        name: 'KOTAKBANK',
        exch: 'BSE',
        price: '1575.40',
        change: '-8.40(-0.97%)',
        isUp: false,
      },
      {
        id: 'w9',
        name: 'NIFTY PR LEV',
        exch: 'INDICES',
        price: '240.03',
        change: '-3.51(-1.44%)',
        isUp: false,
      },
      {
        id: 'w10',
        name: 'NIFTY 50',
        exch: 'INDICES',
        price: '489.65',
        change: '21.20(1.31%)',
        isUp: true,
      },
    ],
    [],
  );
  const openMenuAt = (rect: AnchorRect) => {
    setAnchor(rect);
    setVisible(true);
  };
  // ✅ NEW: row UI
  const renderWatchRow = ({ item }: { item: WatchRow }) => {
    return (
      <WatchRowItem
        item={item}
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
          data={topTabs}
          keyExtractor={item => item.id}
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
            containerStyle={{ height: scaler(38), marginTop: scaler(15), borderRadius: 25 }}
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
            data={watchRows}
            keyExtractor={item => item.id}
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
