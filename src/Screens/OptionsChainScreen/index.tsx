/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { fontFamily, isMarketOpenIST, mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import { styles } from './styles';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { onWsMessage, pauseMarketFeed, registerSubscription, resumeMarketFeed, unregisterSubscription } from '../../Utils/ws/marketSocket';
import { Dropdown } from 'react-native-element-dropdown';
import scaler from '../../Utils/scaler';
import useOptionChainDatesDataQuery from './Hooks/useGetOptionDatesDataQuery';
import useOptionChainDataQuery from './Hooks/useGetOptionsDataQuery';
import OptionChainSkeletonList, { OptionChainCenterBoxSkeleton, OptionChainHeaderSkeleton, OptionChainRowSkeleton, OptionChainTableHeaderSkeleton } from './SkLoading/OptionChainSkeleton';

const fmtMoney = (v: number) => `${v?.toFixed(2)}`;
type Props = MainStackScreenProps<'OptionsChain'>;
export default function OptionsChainScreen({ navigation, route }: Props) {
  // console.log('RouteOptionsChaain', route?.params?.segment, route?.params?.symbol, route?.params);
  // Extracting segment and symbol dynamically from route params
  // const segment = route?.params?.segment;
  const flatListRef = React.useRef<FlatList>(null);
  const symbol = route?.params?.symbol.replace(" ", "");
  const { data: optionChainDatesData } = useOptionChainDatesDataQuery({
    symbol: String(symbol),
  })
  // console.log('OptionChainDatesData', optionChainDatesData?.data?.data?.data);
  const dropDownData = useMemo(() => {
    if (!optionChainDatesData?.data?.data?.data) return [];
    return optionChainDatesData?.data?.data?.data.map((date: string) => ({
      label: date,
      value: date,
    }));
  }, [optionChainDatesData]);
  const [selectedExpiry, setSelectedExpiry] = useState<string>("");
  const [dataReady, setDataReady] = useState(false);
  const [live, setLive] = useState<Record<string, any>>({});
  const normalizeWsSymbol = (raw: any): string => {
    return String(raw ?? "").trim().toUpperCase();
  };
  const normalizedSymbol = normalizeWsSymbol(symbol);
  const fmtPct = (v: number) => `${v >= 0 ? "" : ""}${v?.toFixed(2)}%`;
  useEffect(() => {
    const first = optionChainDatesData?.data?.data?.data?.[0];
    if (first && !selectedExpiry) setSelectedExpiry(first);
  }, [optionChainDatesData, selectedExpiry]);
  const { data: optionChainData } = useOptionChainDataQuery({
    symbol: String(symbol),
    expiry: String(selectedExpiry),
  })
  // console.log('OptionChainData', selectedExpiry, optionChainData?.data?.data);
  type StrikeApi = { strike: number; symbols: string[] };

  const strikes: StrikeApi[] = optionChainData?.data?.data?.data?.strikes ?? [];

  const rows: any = useMemo(() => {
    return strikes.map((s) => {
      const callSym = s.symbols.find((x: any) => x.symbol.endsWith("CE")) ?? s.symbols[0];
      const putSym = s.symbols.find((x: any) => x.symbol.endsWith("PE")) ?? s.symbols[1];
      return {
        strike: s.strike,
        callSymbol: callSym,
        putSymbol: putSym,
      };
    });
  }, [strikes]);
  // const wsSeg = useMemo(() => mapApiToWsSegment(segment, "NSE"), [segment]);

  const wsSymbols = useMemo(() => {
    const list: string[] = [];
    for (const r of rows) {
      // console.log('RWsSymbol', r)
      if (r.callSymbol) list.push(r.callSymbol?.symbol);
      if (r.putSymbol) list.push(r.putSymbol?.symbol);
    }
    // unique
    return Array.from(new Set(list));
  }, [rows]);

  const [wsPrices, setWsPrices] = useState<Record<string, any>>({});
  const wsSeg = "NFO-OPT";
  const keyFor = (sym: string) => `${wsSeg}:${String(sym).toUpperCase()}`;
  const wsSegIndices = "INDICES";
  const keyForIndices = (sym: string) => `${wsSegIndices}:${String(sym).toUpperCase()}`;
  // const [wsPrices, setWsPrices] = useState<Record<string, any>>({});

  // const [snapshotDone, setSnapshotDone] = useState(false);

  useEffect(() => {
    // setSnapshotDone(false);
    setWsPrices({});
    // do NOT clear cache here if you want old values while loading new expiry
  }, [selectedExpiry]);
  useEffect(() => {
    setWsPrices({}); // reset prices when expiry changes (optional)
  }, [selectedExpiry]);

  useEffect(() => {
    if (!wsSymbols.length) return;
    let timeoutId: any;
    // Always clean old subscription first (expiry/symbols changed)
    unregisterSubscription("optionChainOwner");

    const payload = {
      type: "subscribe" as const,
      data: [
        {
          segment: wsSeg,
          symbols: wsSymbols.map(s => String(s).toUpperCase()),
          subscription_type: "option_chain",
        },
      ],
    };

    console.log("SUB_PAYLOAD", payload);
    registerSubscription("optionChainOwner", payload);

    if (!isMarketOpenIST()) {
      resumeMarketFeed();
      timeoutId = setTimeout(() => {
        pauseMarketFeed();
        off();
      }, 2000);
    }

    const off = onWsMessage((msg) => {
      if (msg?.type !== "snapshot" && msg?.type !== "update") return;
      if (!msg?.data || typeof msg.data !== "object") return;
      // console.log("WS_MSGOptionChain", msg);
      // Normalize keys to match keyFor()
      const normalized: Record<string, any> = {};
      for (const rawKey of Object.keys(msg.data)) {
        const k = String(rawKey).toUpperCase();
        normalized[k] = msg.data[rawKey];
      }
      // console.log('Normalised', normalized);
      // console.log('KeyFor', keyForIndices(normalizedSymbol));
      // console.log('LiveValue', normalized[keyForIndices(normalizedSymbol)])
      const liveLtp = normalized[keyForIndices(normalizedSymbol)]?.ltp;
      const liveClose = normalized[keyForIndices(normalizedSymbol)]?.close;
      if (liveLtp !== undefined && liveClose !== undefined) {
        setDataReady(true);
      }
      setWsPrices(prev => ({ ...prev, ...normalized }));
      setLive((prev) => ({
        ...prev, ltp: liveLtp,
        close: liveClose,
      }));
    });
    clearTimeout(timeoutId);
    return () => {
      off();
      unregisterSubscription("optionChainOwner");
    };

  }, [wsSymbols]); // keep open; only re-run when symbol list changes
  type RowItem = { type: "row"; strike: number; callSymbol: string; putSymbol: string };
  type BoxItem = {
    type: "box";
    id: string;
    strike: number;
    ltp: number;
    close: number;
  };
  // type DividerItem = { type: "divider"; id: string; strike: number };
  type ListItem = RowItem | BoxItem;

  const CenterBoxRow = ({ ltp, close }: { ltp: number, close: number }) => {
    if (ltp === undefined || close === undefined) return <OptionChainCenterBoxSkeleton />;
    const absChange = ltp - close; // absolute change
    const pctChange = close ? (absChange / close) * 100 : 0;
    const displayLtp = `${fmtMoney(ltp)} | ${fmtMoney(absChange)} | ${fmtPct(pctChange)}`;

    return (
      <View style={styles.centerDividerRow}>
        <View style={styles.centerDividerLine} />
        <View style={styles.centerDividerPill}>
          <Text style={styles.centerDividerText}>{displayLtp}</Text>
        </View>
        <View style={styles.centerDividerLine} />
      </View>
    );
  };
  const findClosestStrike = (ltp: number, strikes: number[]): number => {
    let closest = strikes[0];
    let diff = Math.abs(ltp - closest);
    strikes.forEach((strike) => {
      const newDiff = Math.abs(ltp - strike);
      if (newDiff < diff) {
        closest = strike;
        diff = newDiff;
      }
    });

    return closest

  };
  const listWithBox: ListItem[] = useMemo(() => {
    if (!rows.length) return [];
    const out: ListItem[] = [];
    // const normalized: Record<string, any> = {};
    // const afterOfficeLtp = normalized[keyForIndices(normalizedSymbol)]?.ltp;
    // console.log('LiveListWithBox', live)
    const strikesList = rows.map((r: any) => r.strike); // List of all strikes
    const closestStrike = findClosestStrike(live.ltp, strikesList); // Find closest strike to LTP
    // @ts-ignore
    rows.forEach((r, idx) => {
      // push row
      out.push({
        type: "row",
        strike: r.strike,
        callSymbol: r.callSymbol,
        putSymbol: r.putSymbol,
      });

      // Add CenterBoxRow below the closest strike
      if (r.strike === closestStrike) {
        out.push({
          type: "box",
          id: `box - ${r.strike} -${idx} `,
          strike: r.strike,
          ltp: live.ltp, // Pass LTP here
          close: live.close,
        });
      }
    });

    return out;

  }, [rows, live]);

  const atmIndex = useMemo(() => {
    if (!listWithBox.length || !live?.ltp) return 0;

    return listWithBox.findIndex(
      (item) =>
        item.type === "row" &&
        item.strike === findClosestStrike(
          live.ltp,
          rows.map((r: any) => r.strike)
        )
    );
  }, [listWithBox, live]);

  useEffect(() => {
    if (atmIndex > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: atmIndex,
          animated: false, // first load pe smooth nahi, direct jump
        });
      }, 100); // wait for render
    }
  }, [atmIndex]);

  const OptionRow = React.memo(
    ({ item, call, put, navigation }: any) => {
      if (call?.ltp === undefined || put?.ltp === undefined) {
        return <OptionChainRowSkeleton />;
      }

      const fmtMoney = (v: number) => `${v?.toFixed(2)}`;
      const fmtPct = (v: number) => `${v?.toFixed(2)}%`;

      const pctFromLtpClose = (ltp?: number, close?: number) => {
        const l = Number(ltp ?? 0);
        const c = Number(close ?? 0);
        if (!c) return 0;
        return ((l - c) / c) * 100;
      };

      const callLtp = call?.ltp;
      const putLtp = put?.ltp;

      const callPct = pctFromLtpClose(call?.ltp, call?.close);
      const putPct = pctFromLtpClose(put?.ltp, put?.close);

      const clamp = (n: number, min: number, max: number) =>
        Math.max(min, Math.min(max, n));

      const callStrength = clamp(Math.abs(callPct), 0, 10);
      const putStrength = clamp(Math.abs(putPct), 0, 10);

      const sum = callStrength + putStrength || 1;

      const leftPct = (putStrength / sum) * 50;
      const rightPct = (callStrength / sum) * 50;

      return (
        <View style={styles.rowWrap}>
          {/* LEFT: CALL */}
          <TouchableOpacity
            style={styles.cellLeft}
            onPress={() =>
              navigation.navigate("Instrument", {
                symbol: item.callSymbol.symbol,
                ltp: callLtp,
                abs: callPct,
              })
            }
          >
            <Text style={styles.moneyText}>{fmtMoney(callLtp)}</Text>
            <Text
              style={[
                styles.pctText,
                callPct >= 0 ? styles.green : styles.red,
              ]}
            >
              {fmtPct(callPct)}
            </Text>
          </TouchableOpacity>

          {/* MIDDLE: STRIKE + BAR */}
          <View style={styles.cellMid}>
            <Text style={styles.strikeText}>{item.strike}</Text>

            <View style={styles.tickTrack2}>
              <View
                style={[styles.tickLeftRed, { width: `${leftPct}%` }]}
              />
              <View
                style={[styles.tickRightGreen, { width: `${rightPct}%` }]}
              />
            </View>
          </View>

          {/* RIGHT: PUT */}
          <TouchableOpacity
            style={styles.cellRight}
            onPress={() =>
              navigation.navigate("Instrument", {
                symbol: item.putSymbol.symbol,
                ltp: putLtp,
                abs: putPct,
              })
            }
          >
            <Text style={styles.moneyText}>{fmtMoney(putLtp)}</Text>
            <Text
              style={[
                styles.pctText,
                putPct >= 0 ? styles.green : styles.red,
              ]}
            >
              {fmtPct(putPct)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  );
  const isDatesLoading = !optionChainDatesData?.data?.data?.data?.length;
  const isRowsLoading = !rows?.length;
  const showSkeleton = !dataReady || isDatesLoading || isRowsLoading;
  return (
    <View style={styles.container}>
      {/* Top bar */}
      {showSkeleton ? (
        <>
          <OptionChainHeaderSkeleton />
          <OptionChainTableHeaderSkeleton />
          <OptionChainSkeletonList />
        </>
      ) :
        (
          <>
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
              < Text style={styles.title}>{symbol}</Text>
              <Dropdown
                data={dropDownData}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={selectedExpiry}
                containerStyle={{ borderRadius: 10, borderWidth: 1, borderColor: mainColors.inputBorder, overflow: 'hidden' }}
                selectedTextStyle={{ color: mainColors.white, fontFamily: fontFamily.poppinsRegular, fontSize: scaler(10) }}
                style={{ borderWidth: 1, borderColor: mainColors.inputBorder, height: scaler(25), width: scaler(110), borderRadius: 15, paddingHorizontal: scaler(10) }}
                itemTextStyle={{ color: mainColors.white, fontFamily: fontFamily.poppinsRegular, fontSize: scaler(8) }}
                itemContainerStyle={{ backgroundColor: mainColors.black }}
                onChange={item => setSelectedExpiry(item.value)}
                activeColor={mainColors.inputBorder}
              />
            </View >

            {/* Column headers */}
            < View style={styles.headerRow} >
              <Text style={[styles.headerText, styles.headerLeft]}>Call LTP</Text>
              <Text style={[styles.headerText, styles.headerMid]}>Strike</Text>
              <Text style={[styles.headerText, styles.headerRight]}>Put LTP</Text>
            </View >

            {/* List */}
            < FlatList
              data={listWithBox}
              keyExtractor={(item, index) =>
                item.type === "box" ? item.id : `${item.strike}-${index}`
              }
              renderItem={({ item }: any) => {
                if (item.type === "box") {
                  return <CenterBoxRow ltp={item.ltp} close={item?.close} />;
                }
                const callKey = keyFor(item.callSymbol.symbol);
                const putKey = keyFor(item.putSymbol.symbol);

                return (
                  <OptionRow
                    item={item}
                    call={wsPrices[callKey]}
                    put={wsPrices[putKey]}
                    navigation={navigation}
                  />
                );
              }}
              initialNumToRender={20}
              windowSize={10}
              removeClippedSubviews={true}

              getItemLayout={(data, index) => ({
                length: 60, // approx row height (adjust if needed)
                offset: 60 * index,
                index,
              })}
            />
          </>
        )}
      {/* Bottom */}
      {/* <View style={styles.bottomArea}>
    <Text style={styles.bottomLabel}>Max Pain</Text>
    <Text style={styles.bottomValue}>260000</Text>
  </View> */}
    </View >

  );
}
