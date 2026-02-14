/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { isMarketOpenIST, mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { mapApiToWsSegment } from '../../Utils/ws/wsSegmentMapper';
import { onWsMessage, pauseMarketFeed, registerSubscription, resumeMarketFeed, unregisterSubscription } from '../../Utils/ws/marketSocket';

type Row = {
  id: string;
  callLtp: number;
  callChgPct: number;
  strike: number;
  putLtp: number;
  putChgPct: number;
  midTick: 'green' | 'red' | 'none';
};

const fmtMoney = (v: number) => `₹${v.toFixed(2)}`;
const fmtPct = (v: number) => `${v >= 0 ? '' : ''}${v.toFixed(2)}%`;
type Props = MainStackScreenProps<'OptionsChain'>;
export default function OptionsChainScreen({ navigation, route }: Props) {
  console.log('RouteOptionsChaain', route?.params?.segment, route?.params?.symbol);
  // Extracting segment and symbol dynamically from route params
  const segment = route?.params?.segment;
  const symbol = route?.params?.symbol;

  // Fix the WebSocket payload to match the SubscribePayload type
  const wsPayload = useMemo(() => {
    if (!segment || !symbol) return null;

    const wsSeg = mapApiToWsSegment(segment, "NSE"); // Ensure exchange is correct (NSE)

    // Now explicitly set the `type` to "subscribe" to match the SubscribePayload type
    return {
      type: "subscribe" as const,  // Using 'as const' to specify the exact string literal type
      data: [
        {
          segment: wsSeg,
          symbols: [symbol],
          subscription_type: "option_chain", // Ensure this is correct as per your WebSocket API
        },
      ],
    };
  }, [segment, symbol]);

  useEffect(() => {
    if (!wsPayload) return;

    console.log('WsPayloadOptionChain', JSON.stringify(wsPayload?.data[0], null, 2)); // Log the payload for debugging

    // Register the subscription for WebSocket
    registerSubscription('optionChainOwner', wsPayload);

    // Market closed: fetch once (snapshot) and pause the feed
    if (!isMarketOpenIST()) {
      resumeMarketFeed();

      const needed = new Set<string>();
      wsPayload.data.forEach(it => {
        const wsSeg = String(it.segment).toUpperCase();
        it.symbols.forEach(sym => needed.add(`${wsSeg}:${String(sym).toUpperCase()}`));
      });

      const got = new Set<string>();
      let timeoutId: any;

      const off = onWsMessage((msg) => {
        console.log('WSMessageOptionChain', msg);
        if (msg?.type !== "snapshot" && msg?.type !== "update") return;
        if (!msg?.data || typeof msg.data !== "object") return;

        Object.keys(msg.data).forEach(k => {
          const kk = String(k).toUpperCase();
          if (needed.has(kk)) got.add(kk);
        });

        const done = Array.from(needed).every(k => got.has(k));
        if (done) {
          pauseMarketFeed();     // stop streaming after receiving snapshot
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
      unregisterSubscription('optionChainOwner');
    };
  }, [wsPayload]);

  const data = useMemo<Row[]>(
    () => [
      {
        id: '1',
        callLtp: 1990.55,
        callChgPct: 1.43,
        strike: 23950,
        putLtp: 20.9,
        putChgPct: -30.77,
        midTick: 'green',
      },
      // add more rows like your screenshot
      ...Array.from({ length: 12 }).map((_, i) => ({
        id: `x${i}`,
        callLtp: 1990.55,
        callChgPct: 1.43,
        strike: 23950,
        putLtp: 20.9,
        putChgPct: -30.77,
        midTick: (i % 3 === 0 ? 'red' : 'green') as 'red' | 'green',
      })),
    ],
    [],
  );

  const renderItem = ({ item }: { item: Row }) => {
    return (
      <Pressable style={styles.rowWrap}>
        {/* Left: Call LTP */}
        <View style={styles.cellLeft}>
          <Text style={styles.moneyText}>{fmtMoney(item.callLtp)}</Text>
          <Text
            style={[
              styles.pctText,
              item.callChgPct >= 0 ? styles.green : styles.red,
            ]}
          >
            {fmtPct(item.callChgPct)}
          </Text>
        </View>

        {/* Middle: Strike */}
        <View style={styles.cellMid}>
          <Text style={styles.strikeText}>{item.strike}</Text>
          <View
            style={[
              styles.midTick,
              item.midTick === 'green'
                ? styles.tickGreen
                : item.midTick === 'red'
                  ? styles.tickRed
                  : styles.tickNone,
            ]}
          />
        </View>

        {/* Right: Put LTP */}
        <View style={styles.cellRight}>
          <Text style={styles.moneyText}>{fmtMoney(item.putLtp)}</Text>
          <Text
            style={[
              styles.pctText,
              item.putChgPct >= 0 ? styles.green : styles.red,
            ]}
          >
            {fmtPct(item.putChgPct)}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { }}>
          <IconButton
            vectorType="MaterialCommunityIcons"
            name="keyboard-backspace"
            onPress={() => navigation.goBack()}
            color={mainColors.white}
            backgroundColor={mainColors.black}
          />
        </TouchableOpacity>

        <Text style={styles.title}>HDFC</Text>

        <TouchableOpacity style={styles.datePill} onPress={() => { }}>
          <Text style={styles.dateText}>25 Dec</Text>
          <Text style={styles.caret}>▾</Text>
        </TouchableOpacity>
      </View>

      {/* Column headers */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.headerLeft]}>Call LTP</Text>
        <Text style={[styles.headerText, styles.headerMid]}>Strike</Text>
        <Text style={[styles.headerText, styles.headerRight]}>Put LTP</Text>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={x => x.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom */}
      <View style={styles.bottomArea}>
        <Text style={styles.bottomLabel}>Max Pain</Text>
        <Text style={styles.bottomValue}>260000</Text>
      </View>
    </View>
  );
}
