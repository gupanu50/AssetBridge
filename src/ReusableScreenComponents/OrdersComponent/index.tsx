/* eslint-disable react/no-unstable-nested-components */
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatItem } from './types';
import { isMarketOpenIST, mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import scaler from '../../Utils/scaler';
import CommonButton from '../../ReusableComponents/commonButton';
import { styles } from './styles';
import { Images } from '../../Assets';
import useOrdersQuery from './Hooks/useOrdersQuery';
import moment from 'moment';
import { getLastByKey, onWsMessage, pauseMarketFeed, registerSubscription, resumeMarketFeed, SubscribePayload, unregisterSubscription } from '../../Utils/ws/marketSocket';
import { buildWsKey, mapApiToWsSegment } from '../../Utils/ws/wsSegmentMapper';
import { computeChange } from '../../Utils/ws/commonWebSocketFunctions';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import { downloadExcelToDownloads } from '../../ReusableComponents/commonFunctions';
import snackbarHandler from '../../Utils/snackbarHandler';

const OrderComponent = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { data, error } = useOrdersQuery();
  const orderData = data?.data?.data?.results;
  console.log('OrderData', orderData);
  const ORDER_OWNER_ID = "orderComponent"; // Use a unique ID for this screen
  const [tick, setTick] = useState(0);
  const [input, setInput] = useState('');
  const wsPayload: SubscribePayload | null = useMemo(() => {
    if (!Array.isArray(orderData) || !orderData.length) return null;

    // seg__type -> symbols set
    const bucket = new Map<string, { segment: string; subscription_type: string; symbols: Set<string> }>();

    for (const order of orderData) {
      const seg = String(order?.segment || "").trim();
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
  }, [orderData]);

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
  // Filter orderData based on search input
  const filteredOrderData = useMemo(() => {
    if (!input.trim()) {
      return orderData; // If input is empty, return all orders
    }
    return orderData?.filter((order: any) =>
      order.symbol.toLowerCase().includes(input.toLowerCase()) ||
      order.symbol.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, orderData]);
  const isAllSelected = useMemo(() => {
    return orderData?.length > 0 && selectedIds.size === orderData.length;
  }, [selectedIds, orderData]);

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(orderData.map((x: any) => x.id)));
    }
  };
  const renderCardData = ({ item }: { item: FlatItem }) => {
    const checked = selectedIds.has(item.id);
    const statusColor =
      item.status?.toLowerCase() === "submitted"
        ? mainColors.green
        : item.status?.toLowerCase() === 'pending'
          ? '#F5A524' // orange-ish like screenshot
          : mainColors.descText;

    const bsColor = item.side === 'buy' ? mainColors.green : mainColors.red;
    // Map API data to WebSocket segment and symbol
    const wsSeg = mapApiToWsSegment(item.segment, item.exchange);
    const cacheKey = buildWsKey(wsSeg, item.symbol);
    const payload = getLastByKey(cacheKey); // Retrieve cached data from WebSocket
    const { ltp } = computeChange(payload);
    return (
      <View style={styles.orderCard}>
        {/* Top row: checkbox + Name + Exchange badge */}
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

        {/* Buy/Sell + DateTime */}
        <View style={styles.cardSubRow}>
          <Text style={[styles.bsText, { color: bsColor }]}>{item.side}</Text>
          <Text style={styles.dateText}>{moment(item.submitted_at).format('DD/MM/YYYY hh:mm:ss')}</Text>
        </View>

        {/* Two columns like screenshot */}
        <View style={styles.cardGrid}>
          {/* Left column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Qty.t</Text>
              <Text style={styles.kValue}>: {item.quantity}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>LTP</Text>
              <Text style={styles.kValue}>: {ltp}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Product</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{item.product_type}</Text>
              </View>
            </View>
          </View>

          {/* Right column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Status</Text>
              <Text style={[styles.kValue, { color: statusColor }]}>
                : {item.status}
              </Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Price</Text>
              <Text style={styles.kValue}>: {item.average_price}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Source</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{item.Source}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const handleDownload = async (item: any) => {
    if (item && Array.isArray(item) && item.length > 0) {
      const res = await downloadExcelToDownloads(item, 'orders');
      if (res) {
        snackbarHandler.successToast('File is downloaded successfully');
      } else {
        snackbarHandler.errorToast('Failed to download file');
      }
    } else {
      Alert.alert('No data to download');
    }
  };
  return (
    <View style={styles.main}>
      <View style={[styles.flexView, styles.lineView]}>
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
          onPress={() => handleDownload(orderData)}
          name="download"
          color={mainColors.mainButton}
          backgroundColor={mainColors.black}
        />
      </View>
      <FlatList
        data={filteredOrderData}
        renderItem={renderCardData}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        scrollEnabled={false}
        extraData={tick}
      />
    </View>
  );
};

export default OrderComponent;
