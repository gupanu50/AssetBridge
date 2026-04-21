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
import {
  onWsMessage,
  pauseMarketFeed,
  registerSubscription,
  resumeMarketFeed,
  unregisterSubscription,
} from '../../Utils/ws/marketSocket';
import { Dropdown } from 'react-native-element-dropdown';
import scaler from '../../Utils/scaler';
import useOptionChainDataQuery from './Hooks/useGetOptionsDataQuery';
import OptionChainSkeletonList, {
  OptionChainCenterBoxSkeleton,
  OptionChainHeaderSkeleton,
  OptionChainTableHeaderSkeleton,
} from './SkLoading/OptionChainSkeleton';
import { useSelector } from 'react-redux';

const fmtMoney = (v?: number) => `${Number(v ?? 0).toFixed(2)}`;
const fmtPct = (v?: number) => `${Number(v ?? 0).toFixed(2)}%`;

type Props = MainStackScreenProps<'OptionsChain'>;

type ApiSymbolData = {
  symbol: string;
  absolute_change?: number;
  current_price?: number;
  ltp?: number;
  percentage_change?: number;
  previous_close?: number;
};

type StrikeApi = {
  strike: number;
  symbols: ApiSymbolData[];
};

type RowData = {
  strike: number;
  callSymbol: ApiSymbolData | null;
  putSymbol: ApiSymbolData | null;
};

type RowItem = {
  type: 'row';
  strike: number;
  callSymbol: ApiSymbolData;
  putSymbol: ApiSymbolData;
};

type BoxItem = {
  type: 'box';
  id: string;
  strike: number;
  ltp: number;
  close: number;
};

type ListItem = RowItem | BoxItem;

export default function OptionsChainScreen({ navigation, route }: Props) {
  const flatListRef = React.useRef<FlatList>(null);
  const symbol = route?.params?.symbol.replace(' ', '');

  const optionChainDatesData =
    symbol === 'NIFTY50'
      ? useSelector((state: any) => state.expiryData.expiry50Data)
      : useSelector((state: any) => state.expiryData.expiryBankData);

  const dropDownData = useMemo(() => {
    if (!optionChainDatesData) return [];
    return optionChainDatesData.map((date: string) => ({
      label: date,
      value: date,
    }));
  }, [optionChainDatesData]);

  const [selectedExpiry, setSelectedExpiry] = useState<string>('');
  const [live, setLive] = useState<Record<string, any>>({});
  const [wsPrices, setWsPrices] = useState<Record<string, any>>({});
  const [fixedCenterStrike, setFixedCenterStrike] = useState<number | null>(null);
  const normalizeWsSymbol = (raw: any): string => String(raw ?? '').trim().toUpperCase();
  const normalizedSymbol = normalizeWsSymbol(symbol);

  useEffect(() => {
    const first = optionChainDatesData?.[0];
    if (first && !selectedExpiry) {
      setSelectedExpiry(first);
    }
  }, [optionChainDatesData, selectedExpiry]);

  const { data: optionChainData, isLoading: isOptionChainLoading } = useOptionChainDataQuery({
    symbol: String(symbol),
    expiry: String(selectedExpiry),
  });

  const strikes: StrikeApi[] = optionChainData?.data?.data?.data?.strikes ?? [];

  const rows: RowData[] = useMemo(() => {
    return strikes
      .map((s) => {
        const callSym =
          s.symbols?.find((x: ApiSymbolData) => x.symbol?.toUpperCase().endsWith('CE')) ?? null;
        const putSym =
          s.symbols?.find((x: ApiSymbolData) => x.symbol?.toUpperCase().endsWith('PE')) ?? null;

        if (!callSym || !putSym) return null;

        return {
          strike: s.strike,
          callSymbol: callSym,
          putSymbol: putSym,
        };
      })
      .filter(Boolean) as RowData[];
  }, [strikes]);

  const wsSeg = 'NFO-OPT';
  const wsSegIndices = 'INDICES';

  const keyFor = (sym: string) => `${wsSeg}:${String(sym).toUpperCase()}`;
  const keyForIndices = (sym: string) => `${wsSegIndices}:${String(sym).toUpperCase()}`;

  const wsSymbols = useMemo(() => {
    const list: string[] = [];
    for (const r of rows) {
      if (r.callSymbol?.symbol) list.push(String(r.callSymbol.symbol).toUpperCase());
      if (r.putSymbol?.symbol) list.push(String(r.putSymbol.symbol).toUpperCase());
    }
    return Array.from(new Set(list));
  }, [rows]);

  useEffect(() => {
    setWsPrices({});
    setLive({});
    setFixedCenterStrike(null);
  }, [selectedExpiry]);


  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let off = () => { };

    unregisterSubscription('optionChainOwner');

    if (!wsSymbols.length) return;

    const payload = {
      type: 'subscribe' as const,
      data: [
        {
          segment: wsSeg,
          symbols: wsSymbols,
          subscription_type: 'option_chain',
        },
      ],
    };

    registerSubscription('optionChainOwner', payload);

    if (!isMarketOpenIST()) {
      resumeMarketFeed();
      timeoutId = setTimeout(() => {
        pauseMarketFeed();
        off();
      }, 2000);
    }

    off = onWsMessage((msg) => {
      console.log('WS_MSGOptionChain', msg);

      if (msg?.type !== 'snapshot' && msg?.type !== 'update') return;
      if (!msg?.data || typeof msg.data !== 'object') return;

      const normalized: Record<string, any> = {};
      const msgSegment = String(msg?.segment ?? '').toUpperCase();

      for (const rawKey of Object.keys(msg.data)) {
        const entry = msg.data[rawKey];
        const symbolKey = String(rawKey).toUpperCase();

        // plain symbol key
        normalized[symbolKey] = entry;

        // segment:symbol key
        if (msgSegment) {
          normalized[`${msgSegment}:${symbolKey}`] = entry;
        }

        // also from entry.symbol if available
        const entrySymbol = String(entry?.symbol ?? '').toUpperCase();
        if (entrySymbol) {
          normalized[entrySymbol] = entry;
          if (msgSegment) {
            normalized[`${msgSegment}:${entrySymbol}`] = entry;
          }
        }
      }

      console.log('Normalised', normalized);

      const indexData =
        normalized[keyForIndices(normalizedSymbol)] ??
        normalized[normalizedSymbol];

      const liveLtp = indexData?.ltp;
      const liveClose = indexData?.close;

      console.log('LiveData', { liveLtp, liveClose });

      setWsPrices((prev) => ({ ...prev, ...normalized }));

      if (liveLtp !== undefined || liveClose !== undefined) {
        setLive((prev) => ({
          ...prev,
          ltp: liveLtp ?? prev?.ltp,
          close: liveClose ?? prev?.close,
        }));
      }
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      off();
      unregisterSubscription('optionChainOwner');
    };
  }, [wsSymbols, normalizedSymbol]);
  const getApiLtp = (item?: ApiSymbolData | null) =>
    Number(item?.ltp ?? item?.current_price ?? 0);

  const mergeOptionData = (apiItem?: ApiSymbolData | null, wsItem?: any) => {
    const apiLtp = getApiLtp(apiItem);
    const close = Number(
      wsItem?.close ??
      apiItem?.previous_close ??
      0
    );

    const liveLtp = wsItem?.ltp;
    const finalLtp = liveLtp !== undefined ? Number(liveLtp) : apiLtp;

    const hasWs = liveLtp !== undefined && close > 0;

    const absChange = hasWs
      ? finalLtp - close
      : Number(apiItem?.absolute_change ?? 0);

    const pctChange = hasWs
      ? close
        ? ((finalLtp - close) / close) * 100
        : 0
      : Number(apiItem?.percentage_change ?? 0);

    return {
      symbol: apiItem?.symbol ?? '',
      ltp: finalLtp,
      close,
      absChange,
      pctChange,
    };
  };

  const CenterBoxRow = ({ ltp, close }: { ltp: number; close: number }) => {
    if (ltp === undefined || close === undefined) return <OptionChainCenterBoxSkeleton />;

    const absChange = ltp - close;
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

  const findClosestStrike = (ltp: number, strikesList: number[]): number => {
    if (!strikesList?.length) return 0;

    let closest = strikesList[0];
    let diff = Math.abs(ltp - closest);

    strikesList.forEach((strike) => {
      const newDiff = Math.abs(ltp - strike);
      if (newDiff < diff) {
        closest = strike;
        diff = newDiff;
      }
    });

    return closest;
  };
  useEffect(() => {
    if (!rows.length) return;
    if (fixedCenterStrike !== null) return;

    const strikesList = rows.map((r) => r.strike);

    const referenceLtp =
      live?.ltp ??
      optionChainData?.data?.data?.data?.spot_ltp ??
      0;

    if (!referenceLtp) return;

    const closestStrike = findClosestStrike(referenceLtp, strikesList);
    setFixedCenterStrike(closestStrike);
  }, [rows, fixedCenterStrike, live?.ltp, optionChainData]);
  const listWithBox: ListItem[] = useMemo(() => {
    if (!rows.length) return [];

    const out: ListItem[] = [];

    rows.forEach((r, idx) => {
      if (!r.callSymbol || !r.putSymbol) return;

      out.push({
        type: 'row',
        strike: r.strike,
        callSymbol: r.callSymbol,
        putSymbol: r.putSymbol,
      });

      if (fixedCenterStrike !== null &&
        r.strike === fixedCenterStrike) {
        out.push({
          type: 'box',
          id: `box-${r.strike}-${idx}`,
          strike: r.strike,
          ltp: live.ltp,
          close: live.close,
        });
      }
    });

    return out;
  }, [rows, fixedCenterStrike, live?.ltp, live?.close]);



  const OptionRow = React.memo(({ item, navigation }: any) => {
    const callKey = keyFor(item.callSymbol.symbol);
    const putKey = keyFor(item.putSymbol.symbol);

    const call = mergeOptionData(item.callSymbol, wsPrices[callKey]);
    const put = mergeOptionData(item.putSymbol, wsPrices[putKey]);

    const clamp = (n: number, min: number, max: number) =>
      Math.max(min, Math.min(max, n));

    const callStrength = clamp(Math.abs(call.pctChange), 0, 10);
    const putStrength = clamp(Math.abs(put.pctChange), 0, 10);
    const sum = callStrength + putStrength || 1;

    const leftPct = (putStrength / sum) * 50;
    const rightPct = (callStrength / sum) * 50;

    return (
      <View style={styles.rowWrap}>
        <TouchableOpacity
          style={styles.cellLeft}
          onPress={() =>
            navigation.navigate('Instrument', {
              symbol: item.callSymbol.symbol,
              ltp: call.ltp,
              abs: call.absChange,
            })
          }
        >
          <Text style={styles.moneyText}>₹{fmtMoney(call.ltp)}</Text>
          <Text
            style={[
              styles.pctText,
              call.pctChange >= 0 ? styles.green : styles.red,
            ]}
          >
            {fmtPct(call.pctChange)}
          </Text>
        </TouchableOpacity>

        <View style={styles.cellMid}>
          <Text style={styles.strikeText}>{item.strike}</Text>
          <View style={styles.tickTrack2}>
            <View style={[styles.tickLeftRed, { width: `${leftPct}%` }]} />
            <View style={[styles.tickRightGreen, { width: `${rightPct}%` }]} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.cellRight}
          onPress={() =>
            navigation.navigate('Instrument', {
              symbol: item.putSymbol.symbol,
              ltp: put.ltp,
              abs: put.absChange,
            })
          }
        >
          <Text style={styles.moneyText}>₹{fmtMoney(put.ltp)}</Text>
          <Text
            style={[
              styles.pctText,
              put.pctChange >= 0 ? styles.green : styles.red,
            ]}
          >
            {fmtPct(put.pctChange)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  const isDatesLoading = !optionChainDatesData?.length;
  const isRowsLoading = isOptionChainLoading || !rows?.length;

  const showSkeleton = isDatesLoading || isRowsLoading;

  return (
    <View style={styles.container}>
      {showSkeleton ? (
        <>
          <OptionChainHeaderSkeleton />
          <OptionChainTableHeaderSkeleton />
          <OptionChainSkeletonList />
        </>
      ) : (
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

            <Text style={styles.title}>{symbol}</Text>

            <Dropdown
              data={dropDownData}
              labelField="label"
              valueField="value"
              placeholder="Select"
              value={selectedExpiry}
              containerStyle={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: mainColors.inputBorder,
                overflow: 'hidden',
              }}
              selectedTextStyle={{
                color: mainColors.white,
                fontFamily: fontFamily.poppinsRegular,
                fontSize: scaler(10),
              }}
              style={{
                borderWidth: 1,
                borderColor: mainColors.inputBorder,
                height: scaler(25),
                width: scaler(110),
                borderRadius: 15,
                paddingHorizontal: scaler(10),
              }}
              itemTextStyle={{
                color: mainColors.white,
                fontFamily: fontFamily.poppinsRegular,
                fontSize: scaler(8),
              }}
              itemContainerStyle={{ backgroundColor: mainColors.black }}
              onChange={(item) => setSelectedExpiry(item.value)}
              activeColor={mainColors.inputBorder}
            />
          </View>

          <View style={styles.headerRow}>
            <Text style={[styles.headerText, styles.headerLeft]}>Call LTP</Text>
            <Text style={[styles.headerText, styles.headerMid]}>Strike</Text>
            <Text style={[styles.headerText, styles.headerRight]}>Put LTP</Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={listWithBox}
            keyExtractor={(item, index) =>
              item.type === 'box' ? item.id : `${item.strike}-${index}`
            }
            renderItem={({ item }: any) => {
              if (item.type === 'box') {
                return <CenterBoxRow ltp={item.ltp} close={item.close} />;
              }

              return <OptionRow item={item} navigation={navigation} />;
            }}
            initialNumToRender={20}
            windowSize={10}
            keyboardShouldPersistTaps="handled"
          />
        </>
      )}
    </View>
  );
}
