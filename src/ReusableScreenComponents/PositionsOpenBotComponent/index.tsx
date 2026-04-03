/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { getApiErrorMessage, isMarketOpenIST, mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import { styles } from './styles';
import scaler from '../../Utils/scaler';
import { FlatItem } from './types';
import { Images } from '../../Assets';
import moment from 'moment';
import { getLastByKey, onWsMessage, pauseMarketFeed, registerSubscription, resumeMarketFeed, SubscribePayload, unregisterSubscription } from '../../Utils/ws/marketSocket';
import { buildWsKey, mapApiToWsSegment } from '../../Utils/ws/wsSegmentMapper';
import { computeChange } from '../../Utils/ws/commonWebSocketFunctions';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import { downloadExcelToDownloads, formatAmount } from '../../ReusableComponents/commonFunctions';
import snackbarHandler from '../../Utils/snackbarHandler';
import usePostionsBotOpenQuery from './Hooks/usePostionsBotOpenQuery';
import useExitBotPostionsMutation from './Hooks/useExitBotPostionsMutation';

const PositionsOpenBotComponent = (bot_id: any) => {
  const { data, refetch } = usePostionsBotOpenQuery('open', bot_id);
  const flatData = data?.data?.data?.results;
  const totalData = data?.data?.data?.total_invested_value;
  // console.log('DataAllOpenPositions', data?.data?.data)
  // console.log('dataOpenPostions', flatData, totalData);
  const ORDER_OWNER_ID = "openBotPostions";
  const [tick, setTick] = useState(0);
  const [input, setInput] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { mutate } = useExitBotPostionsMutation();
  const exitPositions = async () => {
    const ids = Array.from(selectedIds);

    // console.log('SelectedIds Array', ids);
    // console.log('SelectedIds', selectedIds)
    mutate({
      position_ids: ids
    }, {
      onSuccess: (res) => {
        snackbarHandler.successToast('Exit order placed successfully');
        refetch();
      },
      onError: (err) => {
        console.log('ErrorExitPositions', err);
        const message = getApiErrorMessage(err);
        snackbarHandler.errorToast(message);
      }
    })
  };
  const wsPayload: SubscribePayload | null = useMemo(() => {
    if (!Array.isArray(flatData) || !flatData.length) return null;

    // seg__type -> symbols set
    const bucket = new Map<string, { segment: string; subscription_type: string; symbols: Set<string> }>();

    for (const order of flatData) {
      const seg = String(order?.segment || "NSE").trim();
      const sym = String(order?.symbol || "").trim();
      const wsSeg = mapApiToWsSegment(order?.segment, order?.exchange); // Map API segment to WS segment

      if (!seg || !sym) continue;

      const typ = "contract";
      const key = `${wsSeg}__${typ}`;

      if (!bucket.has(key)) {
        bucket.set(key, { segment: wsSeg, subscription_type: typ, symbols: new Set() });
      }
      bucket.get(key)!.symbols.add(sym);
    }

    const dataArr = Array.from(bucket.values()).map((b) => ({
      segment: b.segment,
      subscription_type: b.subscription_type,
      symbols: Array.from(b.symbols),
    }));
    if (!dataArr.length) return null;
    return { type: "subscribe", data: dataArr };
  }, [flatData]);
  // console.log('WS Payload', wsPayload);

  const handleDownload = async (item: any) => {
    if (item && Array.isArray(item) && item.length > 0) {
      const res = await downloadExcelToDownloads(item, 'openPositions');
      if (res) {
        snackbarHandler.successToast('File is downloaded successfully');
      } else {
        snackbarHandler.errorToast('Failed to download file');
      }
    } else {
      Alert.alert('No data to download');
    }
  };
  useEffect(() => {
    if (!wsPayload) return;

    // Register this subscription for orders
    registerSubscription(ORDER_OWNER_ID, wsPayload);

    // Market closed: fetch once (snapshot)
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
        if (msg?.type !== "snapshot" && msg?.type !== "update") return;
        if (!msg?.data || typeof msg.data !== "object") return;

        Object.keys(msg.data).forEach(k => {
          const kk = String(k).toUpperCase();
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
      unregisterSubscription(ORDER_OWNER_ID);
    };
  }, [wsPayload]);

  // Handle updates and snapshots from WebSocket
  useEffect(() => {
    const off = onWsMessage((msg) => {
      if (msg?.type !== "snapshot" && msg?.type !== "update") return;
      if (!msg?.data || typeof msg.data !== "object") return;
      setTick((t) => t + 1); // Trigger re-render when the data changes
    });

    return () => off();
  }, []);
  const toggleRow = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isAllSelected = useMemo(() => {
    return flatData?.length > 0 && selectedIds.size === flatData.length;
  }, [selectedIds, flatData]);

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(flatData.map((x: any) => x.id)));
    }
  };
  const filteredOrderData = useMemo(() => {
    if (!input.trim()) {
      return flatData; // If input is empty, return all orders
    }
    return flatData?.filter((order: any) =>
      order.symbol.toLowerCase().includes(input.toLowerCase()) ||
      order.symbol.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, flatData]);
  const renderCardData = ({ item }: { item: FlatItem }) => {
    const checked = selectedIds.has(item.id);
    const statusColor =
      item.unrealized_pnl > 0
        ? mainColors.green
        : item.unrealized_pnl < 0
          ? mainColors.redText
          : mainColors.descText;
    const wsSeg = mapApiToWsSegment('NSE', item.exchange);
    const cacheKey = buildWsKey(wsSeg, item.symbol);
    const payload = getLastByKey(cacheKey); // Retrieve cached data from WebSocket
    const { ltp } = computeChange(payload);
    return (
      <View style={styles.orderCard}>
        {/* Top row: checkbox + Name + Exchange badge */}
        <View style={[styles.cardTopRow, { justifyContent: 'space-between' }]}>
          <View style={styles.cardTopRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => toggleRow(item.id)}
              style={styles.checkboxHit}
            >
              <IconButton
                vectorType="MaterialCommunityIcons"
                onPress={() => toggleRow(item.id)}
                name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                backgroundColor={mainColors.black}
                color={checked ? mainColors.mainButton : mainColors.transactionTime}
              />
            </TouchableOpacity>

            <Text style={styles.cardTitle}>{item.symbol}</Text>

            <View style={styles.exchangeBadge}>
              <Text style={styles.exchangeBadgeText}>{item.exchange}</Text>
            </View>
          </View>
          <View style={styles.pillManAut}>
            <Text style={styles.pillText}>{item.source_type}</Text>
          </View>
        </View>

        {/* Buy/Sell + DateTime */}
        <View style={styles.cardSubRow}>
          <Text style={styles.dateText}>{moment(item.entry_time).format('DDMMMYY')}</Text>
        </View>

        {/* Two columns like screenshot */}
        <View style={styles.cardGrid}>
          {/* Left column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Qty </Text>
              <Text style={styles.kValue}>: {item.quantity}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Entry price Avg </Text>
              <Text style={styles.kValue}>: {item.entry_price}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Product</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{item.product_type.toUpperCase()}</Text>
              </View>
            </View>
          </View>

          {/* Right column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Unrealized PnL :</Text>
              <Text style={[styles.kValue, { color: statusColor }]}>
                {' '}{formatAmount(item.unrealized_pnl)}
              </Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>LTP </Text>
              <Text style={styles.kValue}>: {ltp}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Direction</Text>
              <View
                style={[
                  styles.pillDirection,
                  {
                    backgroundColor:
                      item.direction === 'long'
                        ? mainColors.swiperBgPnl
                        : mainColors.swiperMaxDDbg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pillDirectionText,
                    {
                      color:
                        item.direction === 'long'
                          ? mainColors.swiperPnl
                          : mainColors.swiperMaxDD,
                    },
                  ]}
                >
                  {item.direction}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>No Data Found</Text>
      </View>
    )
  }
  return (
    <View style={styles.main}>
      {filteredOrderData?.length > 0 && <View style={[styles.flexView, styles.lineView]}>
        <IconButton
          vectorType="MaterialCommunityIcons"
          name={isAllSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
          backgroundColor={mainColors.black}
          color={isAllSelected ? mainColors.mainButton : mainColors.transactionTime}
          onPress={() => toggleSelectAll()}
        />
        <Text style={styles.selectText}>Select All</Text>
        <View style={styles.searchBox}>
          <CommonTextInput
            value={input}
            setValue={setInput}
            placeholder='Search'
            containerStyle={{ height: scaler(38), width: scaler(65), borderWidth: 0 }}
            style={{ fontSize: scaler(11) }}
          />
          <Image source={Images.search} resizeMode='contain' style={styles.searchLogo} />
        </View>
        <IconButton
          vectorType="AntDesign"
          name="download"
          onPress={() => handleDownload(flatData)}
          color={mainColors.mainButton}
          backgroundColor={mainColors.black}
        />
      </View>}
      <FlatList
        data={filteredOrderData}
        renderItem={renderCardData}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        scrollEnabled={false}
      />
      {filteredOrderData?.length > 0 && <View style={styles.itemSeperator} />}
      <View
        style={[
          styles.buttonFlexView,
          { marginBottom: scaler(10), alignItems: 'center' },
        ]}
      >
        {selectedIds.size ? <TouchableOpacity style={styles.exitView} onPress={() => exitPositions()}>
          <Text style={styles.exitText}>{`Exit ${selectedIds.size} Positions`}</Text>
        </TouchableOpacity> : <View style={{ width: scaler(100) }} />}
        {filteredOrderData?.length > 0 && <><Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalValueText}>{formatAmount(totalData)}</Text></>}
      </View>
      {/* <View style={styles.itemSeperator} /> */}
    </View>
  );
};

export default PositionsOpenBotComponent;
