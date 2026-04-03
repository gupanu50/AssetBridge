/* eslint-disable react/no-unstable-nested-components */
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import scaler from '../../Utils/scaler';
import CommonHeader from '../../ReusableComponents/commonHeader';
import { Images } from '../../Assets';
import { AddWatchlistItemProps, TopTab, TopTabApi, WatchRow } from './type';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import CommonTopBtnSlider from '../../ReusableComponents/commonTopBtnSlider';
import CommonKababMenu from '../../ReusableComponents/commonKababMenu';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import WatchRowItem from './watchRowItem';
import useWatchlistQuery from './Hooks/useWatchlistQuery';
import NotificationsModal from '../NotificationScreen';
import { getLastByKey, onWsMessage, pauseMarketFeed, registerSubscription, resumeMarketFeed, SubscribePayload, unregisterSubscription } from '../../Utils/ws/marketSocket';
import { computeChange, makeKey } from '../../Utils/ws/commonWebSocketFunctions';
import { buildWsKey, mapApiToWsSegment } from '../../Utils/ws/wsSegmentMapper';
import { fontFamily, getApiErrorMessage, isMarketOpenIST, mainColors } from '../../Utils/helper';
import NoWatchListData from './NoWatchListData';
import { buildSearchIndex, searchItems, useDebounce } from '../../ReusableComponents/commonFunctions';
import useCompressQuery from '../HomeScreen/Hooks/useCompressQuery';
import { ContractsObj } from '../../ReusableComponents/commonTypes';
import IconButton from '../../ReusableComponents/iconButton';
import useAddItemsWatchlistMutation from './Hooks/useAddWatchlistItemsMutation';
// import { addApiData } from './Hooks/types';
import snackbarHandler from '../../Utils/snackbarHandler';
import WatchlistSkeleton from './SkeletonLoading/WatchlistSkeleton';
type Props = MainStackScreenProps<'WatchList'>;
type AnchorRect = { x: number; y: number; width: number; height: number };
const WatchListScreen = ({ navigation }: Props) => {
  const topTabListRef: any = useRef<FlatList<TopTab>>(null);
  const [input, setInput] = useState('');
  const OWNER_ID = "watchlist";
  const [visible, setVisible] = useState(false);
  const [selectedWatchItem, setSelectedWatchItem] = useState<WatchRow | null>(null);
  const { data, refetch, isLoading: watchlistLoading } = useWatchlistQuery();
  // const [watchlistId, setWatchlistId] = useState<number>();
  const [activeTopTab, setActiveTopTab] = useState(null);
  const watchListApiData = data?.data?.data;
  // console.log('WatchListData', watchListApiData)
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const [showNoti, setShowNoti] = useState(false);
  const [tick, setTick] = useState(0);
  const debouncedValue = useDebounce(input, 300);
  const { data: compressData } = useCompressQuery();
  const { mutate } = useAddItemsWatchlistMutation();
  const contracts: ContractsObj | undefined = compressData?.data?.data?.contracts;
  // ✅ build flattened list once per API update
  const searchIndex = useMemo(() => buildSearchIndex(contracts), [contracts]);
  // console.log('ContractsObjWatchlist', contracts, debouncedValue);

  // ✅ compute results only after debounce
  const results = useMemo(() => {
    return searchItems(searchIndex, debouncedValue, 30);
  }, [searchIndex, debouncedValue]);
  // console.log('ResultsWatchlist', results, watchListApiData);
  useEffect(() => {
    if (watchListApiData?.length && !activeTopTab) {
      setActiveTopTab(watchListApiData[0].name);
    }
  }, [watchListApiData, activeTopTab]);
  const selectedWatchlist = useMemo(() => {
    if (!watchListApiData?.length || !activeTopTab) return null;
    return watchListApiData.find((item: any) => item?.name === activeTopTab) || null;
  }, [watchListApiData, activeTopTab]);

  const watchlistId = selectedWatchlist?.id;
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
  const openMenuAt = (rect: AnchorRect, item: WatchRow) => {
    setAnchor(rect);
    setSelectedWatchItem(item);
    setVisible(true);
  };

  const addItemsWatchlist = async (item: AddWatchlistItemProps) => {
    mutate({
      watchlist: watchlistId || 0,
      symbol: item?.symbol || '',
      exchange: item?.segment || '',
      segment: item?.segment || '',
    }, {
      onSuccess: () => {
        snackbarHandler.successToast('Item added to watchlist');
        setInput('');
        refetch();
      },
      onError: (err) => {
        const msg = getApiErrorMessage(err)
        snackbarHandler.errorToast(msg);
      }
    })
  }
  const wsPayload: SubscribePayload | null = useMemo(() => {
    if (!Array.isArray(watchListApiData) || !watchListApiData.length) return null;

    // seg__type -> symbols set
    const bucket = new Map<string, { segment: string; subscription_type: string; symbols: Set<string> }>();

    for (const wl of watchListApiData) {
      const items = wl?.items || [];
      for (const it of items) {
        const seg = String(it?.segment || "").trim();
        const sym = String(it?.symbol || "").trim();
        const wsSeg = mapApiToWsSegment(it?.segment, it?.exchange);
        if (!seg || !sym) continue;

        const typ = "contract";
        const key = `${wsSeg}__${typ}`;

        if (!bucket.has(key)) {
          bucket.set(key, { segment: wsSeg, subscription_type: typ, symbols: new Set() });
        }
        bucket.get(key)!.symbols.add(sym);
      }
    }

    const dataArr = Array.from(bucket.values()).map((b) => ({
      segment: b.segment,
      subscription_type: b.subscription_type,
      symbols: Array.from(b.symbols),
    }));
    if (!dataArr.length) return null;
    // console.log('DataArr', dataArr)
    return { type: "subscribe", data: dataArr };
  }, [watchListApiData]);
  useEffect(() => {
    if (!wsPayload) return;

    // already registering
    registerSubscription(OWNER_ID, wsPayload);

    // ✅ If market is closed, do one-shot snapshot so cache fills
    if (!isMarketOpenIST()) {
      resumeMarketFeed();

      const needed = new Set<string>();
      wsPayload.data.forEach(it => {
        const seg = String(it.segment).toUpperCase();
        it.symbols.forEach(sym => needed.add(`${seg}:${String(sym).toUpperCase()}`));
      });

      const got = new Set<string>();
      let timeoutId: any;

      const off = onWsMessage((msg) => {
        // console.log('WatchListWSMessage', msg)
        if (msg?.type !== "snapshot" && msg?.type !== "update") return;
        if (!msg?.data || typeof msg.data !== "object") return;

        Object.keys(msg.data).forEach(k => {
          const kk = String(k).toUpperCase(); // update already includes NSE:INFY
          if (needed.has(kk)) got.add(kk);
        });

        const done = Array.from(needed).every(k => got.has(k));
        if (done) {
          pauseMarketFeed();     // stop streaming again
          off();
          clearTimeout(timeoutId);
        }
      });

      timeoutId = setTimeout(() => {
        pauseMarketFeed();
        off();
      }, 4000);
    }

    return () => {
      unregisterSubscription(OWNER_ID);
    };
  }, [wsPayload]);

//   useEffect(() => {
//     const off = onWsMessage((msg) => {
//       if (msg?.type !== "snapshot" && msg?.type !== "update") return;
//       if (!msg?.data || typeof msg.data !== "object") return;
//       setTick((t) => t + 1);
//     });
//     return () => off();
//   }, []);

  const activeWatchRows: WatchRow[] = useMemo(() => {
    if (!Array.isArray(watchListApiData) || !watchListApiData.length) return [];

    const wl = watchListApiData.find((x: any) => x?.name === activeTopTab) || watchListApiData[0];
    const items = wl?.items || [];
    return items.map((it: any) => ({ items: [it] }));
  }, [watchListApiData, activeTopTab]);
  // ✅ NEW: row UI
  const renderWatchRow = ({ item }: { item: WatchRow }) => {
    const base = item?.items?.[0];
    if (!base) return null;
    const sym = String(base?.symbol || "").trim();
    const wsSeg = mapApiToWsSegment(base?.segment, base?.exchange);
    const cacheKey = buildWsKey(wsSeg, base?.symbol);
    const payload = getLastByKey(cacheKey);
    const { ltp, abs, pct } = computeChange(payload);
    const hydratedItem = {
      ...base,
      price: ltp ?? null,
      change:
        abs != null && pct != null
          ? `${abs >= 0 ? "+" : ""}${abs.toFixed(2)} (${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%)`
          : base?.change ?? "",
      isUp: (abs ?? base?.absolute_change ?? 0) >= 0,
      current_price: ltp ?? base?.current_price,
      absolute_change: abs ?? base?.absolute_change,
      percentage_change: pct ?? base?.percentage_change,
      wsKey: cacheKey,
      index: 'equity',
    };
    return (
      <WatchRowItem
        item={hydratedItem}
        onPressRow={() => navigation.navigate('Instrument', { item: hydratedItem })}
        onOpenMenu={openMenuAt}
      />
    );
  };
  const areActiveRowsHydrated = useMemo(() => {
    if (activeWatchRows.length === 0) return true; // <-- treat empty list as hydrated

    return activeWatchRows.every((row) => {
      const base = row?.items?.[0];
      if (!base) return false;

      const wsSeg = mapApiToWsSegment(base?.segment, base?.exchange);
      const cacheKey = buildWsKey(wsSeg, base?.symbol);
      const payload = getLastByKey(cacheKey);
      const { ltp } = computeChange(payload);

      return ltp != null || base?.current_price != null;
    });
  }, [activeWatchRows, tick]);

    //const showWatchlistSkeleton = watchlistLoading || (!activeTopTab || (activeWatchRows.length > 0 && !areActiveRowsHydrated));
    const showWatchlistSkeleton = watchlistLoading || !activeTopTab;
  return (
    <View style={styles.container}>
      <CommonHeader onPressBell={() => setShowNoti(!showNoti)} navigation={navigation} />
      <NotificationsModal
        visible={showNoti}
        onClose={() => setShowNoti(!showNoti)}
        topOffset={scaler(80)}          // tweak: header height + margin
        arrowRightOffset={scaler(35)}   // tweak: align under bell icon
      />
      <View style={styles.mainView}>
        <CommonTopBtnSlider navigation={navigation} />
      </View>
      {/* {watchListApiData?.length > 0 ? (
        showWatchlistSkeleton ? (
          <WatchlistSkeleton />
        ) :
          (
            <View>
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
                    placeholder="Search here"
                    leftImage={
                      <View style={styles.searchView}>
                        <Image source={Images.search} resizeMode="contain" style={styles.searchLogo} />
                      </View>
                    }
                    containerStyle={{
                      height: scaler(38),
                      marginTop: scaler(15),
                      borderRadius: 25,
                      borderColor: '#202020',
                    }}
                    style={{ fontSize: scaler(11) }}
                  />
                </View>

                {debouncedValue.trim().length > 0 && (
                  <View style={styles.dropdown}>
                    {results.length === 0 ? (
                      <Text style={styles.noResult}>No match found</Text>
                    ) : (
                      <FlatList
                        data={results}
                        keyExtractor={(it) => `${it.segment}:${it.symbol}:${it.fullName}`}
                        keyboardShouldPersistTaps="handled"
                        initialNumToRender={15}
                        maxToRenderPerBatch={20}
                        windowSize={7}
                        removeClippedSubviews
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => (
                          <TouchableOpacity style={styles.row} onPress={() => { }}>
                            <View>
                              <Text style={styles.fullName}>{item.fullName}</Text>
                              <Text style={styles.subText}>
                                {item.symbol} • {item.segment}
                              </Text>
                            </View>
                            <IconButton
                              vectorType="MaterialIcons"
                              name="add-circle-outline"
                              size={scaler(24)}
                              color={mainColors.white}
                              onPress={() => addItemsWatchlist(item)}
                            />
                          </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                      />
                    )}
                  </View>
                )}

                <View style={styles.watchListWrap}>
                  <FlatList
                    data={activeWatchRows}
                    keyExtractor={(x: any, idx) => `${x?.items?.[0]?.symbol || 'row'}-${idx}`}
                    renderItem={renderWatchRow}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.watchSeparator} />}
                    contentContainerStyle={{ paddingBottom: scaler(10) }}
                    extraData={tick}
                  />
                </View>
              </View>
            </View>
          )
      ) : (
        <NoWatchListData />
      )} */}
      {watchListApiData?.length > 0 ? (
        showWatchlistSkeleton ? (
          <WatchlistSkeleton />
        ) : (
          <>
            {/* Top tabs */}
            <View style={styles.topTabsWrap}>
              <FlatList
                ref={topTabListRef}
                data={watchListApiData}
                keyExtractor={(item) => item.name}
                renderItem={renderTopTab}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.topTabsContent}
                onScrollToIndexFailed={() => { }}
              />
            </View>

            {/* Search input */}
            <View style={styles.mainView}>
              <View style={styles.flexView}>
                <CommonTextInput
                  value={input}
                  setValue={setInput}
                  placeholder="Search here"
                  leftImage={
                    <View style={styles.searchView}>
                      <Image source={Images.search} resizeMode="contain" style={styles.searchLogo} />
                    </View>
                  }
                  containerStyle={{
                    height: scaler(38),
                    marginTop: scaler(15),
                    borderRadius: 25,
                    borderColor: '#202020',
                  }}
                  style={{ fontSize: scaler(11) }}
                />
              </View>

              {/* Search results */}
              {debouncedValue.trim().length > 0 && (
                <View style={styles.dropdown}>
                  {results.length === 0 ? (
                    <Text style={styles.noResult}>No match found</Text>
                  ) : (
                    <FlatList
                      data={results}
                      keyExtractor={(it) => `${it.segment}:${it.symbol}:${it.fullName}`}
                      keyboardShouldPersistTaps="handled"
                      initialNumToRender={15}
                      maxToRenderPerBatch={20}
                      windowSize={7}
                      removeClippedSubviews
                      style={styles.list}
                      contentContainerStyle={styles.listContent}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.row} onPress={() => { }}>
                          <View>
                            <Text style={styles.fullName}>{item.fullName}</Text>
                            <Text style={styles.subText}>
                              {item.symbol} • {item.segment}
                            </Text>
                          </View>
                          <IconButton
                            vectorType="MaterialIcons"
                            name="add-circle-outline"
                            size={scaler(24)}
                            color={mainColors.white}
                            onPress={() => addItemsWatchlist(item)}
                          />
                        </TouchableOpacity>
                      )}
                      ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                  )}
                </View>
              )}

              {/* Watchlist content */}
              {activeWatchRows.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: scaler(50) }}>
                  <Text style={{ color: mainColors.white, fontSize: scaler(14), fontFamily: fontFamily.poppinsMedium }}>
                    No items in this watchlist
                  </Text>
                </View>
              ) : (
                <View style={styles.watchListWrap}>
                  <FlatList
                    data={activeWatchRows}
                    keyExtractor={(x: any, idx) => `${x?.items?.[0]?.symbol || 'row'}-${idx}`}
                    renderItem={renderWatchRow}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.watchSeparator} />}
                    contentContainerStyle={{ paddingBottom: scaler(10) }}
                  />
                </View>
              )}
            </View>
          </>
        )
      ) : (
        <NoWatchListData />
      )}
      <CommonKababMenu visible={visible} setVisible={setVisible} anchor={anchor} item={selectedWatchItem} navigation={navigation} refetch={refetch} />
    </View>
  );
};

export default WatchListScreen;
