// /* eslint-disable react/no-unstable-nested-components */
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ListRenderItem,
// } from 'react-native';
// import { useSelector } from 'react-redux';
// import { Dropdown } from 'react-native-element-dropdown';

// import { fontFamily, isMarketOpenIST, mainColors } from '../../Utils/helper';
// import IconButton from '../../ReusableComponents/iconButton';
// import { styles } from './styles';
// import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
// import {
//   onWsMessage,
//   pauseMarketFeed,
//   registerSubscription,
//   resumeMarketFeed,
//   unregisterSubscription,
// } from '../../Utils/ws/marketSocket';
// import scaler from '../../Utils/scaler';
// import useOptionChainDataQuery from './Hooks/useGetOptionsDataQuery';
// import OptionChainSkeletonList, {
//   OptionChainCenterBoxSkeleton,
//   OptionChainHeaderSkeleton,
//   OptionChainTableHeaderSkeleton,
// } from './SkLoading/OptionChainSkeleton';

// const fmtMoney = (v?: number) => `${Number(v ?? 0).toFixed(2)}`;
// const fmtPct = (v?: number) => `${Number(v ?? 0).toFixed(2)}%`;

// type Props = MainStackScreenProps<'OptionsChain'>;

// type ApiSymbolData = {
//   symbol: string;
//   absolute_change?: number;
//   current_price?: number;
//   ltp?: number;
//   percentage_change?: number;
//   previous_close?: number;
// };

// type StrikeApi = {
//   strike: number;
//   symbols: ApiSymbolData[];
// };

// type RowData = {
//   strike: number;
//   callSymbol: ApiSymbolData | null;
//   putSymbol: ApiSymbolData | null;
// };

// type RowItem = {
//   type: 'row';
//   strike: number;
//   callSymbol: ApiSymbolData;
//   putSymbol: ApiSymbolData;
// };

// type BoxItem = {
//   type: 'box';
//   id: string;
//   strike: number;
//   ltp: number;
//   close: number;
// };

// type ListItem = RowItem | BoxItem;

// type MergedOptionData = {
//   symbol: string;
//   ltp: number;
//   close: number;
//   absChange: number;
//   pctChange: number;
// };

// const WS_SEG = 'NFO-OPT';
// const WS_SEG_INDICES = 'INDICES';

// const normalizeWsSymbol = (raw: any): string => String(raw ?? '').trim().toUpperCase();

// const keyFor = (sym: string) => `${WS_SEG}:${String(sym).toUpperCase()}`;
// const keyForIndices = (sym: string) => `${WS_SEG_INDICES}:${String(sym).toUpperCase()}`;

// const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// const getApiLtp = (item?: ApiSymbolData | null) =>
//   Number(item?.ltp ?? item?.current_price ?? 0);

// const mergeOptionData = (apiItem?: ApiSymbolData | null, wsItem?: any): MergedOptionData => {
//   const apiLtp = getApiLtp(apiItem);
//   const close = Number(wsItem?.close ?? apiItem?.previous_close ?? 0);

//   const liveLtp = wsItem?.ltp;
//   const finalLtp = liveLtp !== undefined ? Number(liveLtp) : apiLtp;

//   const hasWs = liveLtp !== undefined && close > 0;

//   const absChange = hasWs
//     ? finalLtp - close
//     : Number(apiItem?.absolute_change ?? 0);

//   const pctChange = hasWs
//     ? close
//       ? ((finalLtp - close) / close) * 100
//       : 0
//     : Number(apiItem?.percentage_change ?? 0);

//   return {
//     symbol: apiItem?.symbol ?? '',
//     ltp: finalLtp,
//     close,
//     absChange,
//     pctChange,
//   };
// };

// const findClosestStrike = (ltp: number, strikesList: number[]): number => {
//   if (!strikesList?.length) return 0;

//   let closest = strikesList[0];
//   let diff = Math.abs(ltp - closest);

//   for (const strike of strikesList) {
//     const newDiff = Math.abs(ltp - strike);
//     if (newDiff < diff) {
//       closest = strike;
//       diff = newDiff;
//     }
//   }

//   return closest;
// };

// const CenterBoxRow = React.memo(({ ltp, close }: { ltp: number; close: number }) => {
//   if (ltp === undefined || close === undefined) {
//     return <OptionChainCenterBoxSkeleton />;
//   }

//   const absChange = ltp - close;
//   const pctChange = close ? (absChange / close) * 100 : 0;
//   const displayLtp = `${fmtMoney(ltp)} | ${fmtMoney(absChange)} | ${fmtPct(pctChange)}`;

//   return (
//     <View style={styles.centerDividerRow}>
//       <View style={styles.centerDividerLine} />
//       <View style={styles.centerDividerPill}>
//         <Text style={styles.centerDividerText}>{displayLtp}</Text>
//       </View>
//       <View style={styles.centerDividerLine} />
//     </View>
//   );
// });

// type OptionRowProps = {
//   item: RowItem;
//   callData: MergedOptionData;
//   putData: MergedOptionData;
//   onPressInstrument: (symbol: string, ltp: number, abs: number) => void;
// };

// const OptionRow = React.memo(
//   ({ item, callData, putData, onPressInstrument }: OptionRowProps) => {
//     const callStrength = clamp(Math.abs(callData.pctChange), 0, 10);
//     const putStrength = clamp(Math.abs(putData.pctChange), 0, 10);
//     const sum = callStrength + putStrength || 1;

//     const leftPct = (putStrength / sum) * 50;
//     const rightPct = (callStrength / sum) * 50;

//     const onPressCall = () => {
//       onPressInstrument(item.callSymbol.symbol, callData.ltp, callData.absChange);
//     };

//     const onPressPut = () => {
//       onPressInstrument(item.putSymbol.symbol, putData.ltp, putData.absChange);
//     };

//     return (
//       <View style={styles.rowWrap}>
//         <TouchableOpacity style={styles.cellLeft} activeOpacity={0.7} onPress={onPressCall}>
//           <Text style={styles.moneyText}>₹{fmtMoney(callData.ltp)}</Text>
//           <Text
//             style={[
//               styles.pctText,
//               callData.pctChange >= 0 ? styles.green : styles.red,
//             ]}
//           >
//             {fmtPct(callData.pctChange)}
//           </Text>
//         </TouchableOpacity>

//         <View style={styles.cellMid}>
//           <Text style={styles.strikeText}>{item.strike}</Text>
//           <View style={styles.tickTrack2}>
//             <View style={[styles.tickLeftRed, { width: `${leftPct}%` }]} />
//             <View style={[styles.tickRightGreen, { width: `${rightPct}%` }]} />
//           </View>
//         </View>

//         <TouchableOpacity style={styles.cellRight} activeOpacity={0.7} onPress={onPressPut}>
//           <Text style={styles.moneyText}>₹{fmtMoney(putData.ltp)}</Text>
//           <Text
//             style={[
//               styles.pctText,
//               putData.pctChange >= 0 ? styles.green : styles.red,
//             ]}
//           >
//             {fmtPct(putData.pctChange)}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// );

// OptionRow.displayName = 'OptionRow';
// CenterBoxRow.displayName = 'CenterBoxRow';

// export default function OptionsChainScreen({ navigation, route }: Props) {
//   const flatListRef = useRef<FlatList<ListItem>>(null);

//   const symbol = String(route?.params?.symbol ?? '').replace(' ', '');
//   const normalizedSymbol = normalizeWsSymbol(symbol);

//   const optionChainDatesData =
//     symbol === 'NIFTY50'
//       ? useSelector((state: any) => state.expiryData.expiry50Data)
//       : useSelector((state: any) => state.expiryData.expiryBankData);

//   const dropDownData = useMemo(() => {
//     if (!optionChainDatesData) return [];
//     return optionChainDatesData.map((date: string) => ({
//       label: date,
//       value: date,
//     }));
//   }, [optionChainDatesData]);

//   const [selectedExpiry, setSelectedExpiry] = useState<string>('');
//   const [live, setLive] = useState<Record<string, any>>({});
//   const [wsPrices, setWsPrices] = useState<Record<string, any>>({});
//   const [fixedCenterStrike, setFixedCenterStrike] = useState<number | null>(null);

//   const wsBufferRef = useRef<Record<string, any>>({});
//   const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const first = optionChainDatesData?.[0];
//     if (first && !selectedExpiry) {
//       setSelectedExpiry(first);
//     }
//   }, [optionChainDatesData, selectedExpiry]);

//   const { data: optionChainData, isLoading: isOptionChainLoading } = useOptionChainDataQuery({
//     symbol: String(symbol),
//     expiry: String(selectedExpiry),
//   });

//   const strikes: StrikeApi[] = optionChainData?.data?.data?.data?.strikes ?? [];

//   const rows: RowData[] = useMemo(() => {
//     return strikes
//       .map((s) => {
//         const callSym =
//           s.symbols?.find((x: ApiSymbolData) =>
//             x.symbol?.toUpperCase().endsWith('CE')
//           ) ?? null;

//         const putSym =
//           s.symbols?.find((x: ApiSymbolData) =>
//             x.symbol?.toUpperCase().endsWith('PE')
//           ) ?? null;

//         if (!callSym || !putSym) return null;

//         return {
//           strike: s.strike,
//           callSymbol: callSym,
//           putSymbol: putSym,
//         };
//       })
//       .filter(Boolean) as RowData[];
//   }, [strikes]);

//   const wsSymbols = useMemo(() => {
//     const list: string[] = [];
//     for (const r of rows) {
//       if (r.callSymbol?.symbol) list.push(String(r.callSymbol.symbol).toUpperCase());
//       if (r.putSymbol?.symbol) list.push(String(r.putSymbol.symbol).toUpperCase());
//     }
//     return Array.from(new Set(list));
//   }, [rows]);

//   useEffect(() => {
//     setWsPrices({});
//     setLive({});
//     setFixedCenterStrike(null);
//     wsBufferRef.current = {};
//   }, [selectedExpiry]);

//   const flushBufferedPrices = useCallback(() => {
//     flushTimerRef.current = null;

//     const buffered = wsBufferRef.current;
//     wsBufferRef.current = {};

//     const keys = Object.keys(buffered);
//     if (!keys.length) return;

//     let nextIndexLtp: number | undefined;
//     let nextIndexClose: number | undefined;

//     const indexEntry =
//       buffered[keyForIndices(normalizedSymbol)] ?? buffered[normalizedSymbol];

//     if (indexEntry) {
//       if (indexEntry.ltp !== undefined) nextIndexLtp = Number(indexEntry.ltp);
//       if (indexEntry.close !== undefined) nextIndexClose = Number(indexEntry.close);
//     }

//     setWsPrices((prev) => ({ ...prev, ...buffered }));

//     if (nextIndexLtp !== undefined || nextIndexClose !== undefined) {
//       setLive((prev) => ({
//         ...prev,
//         ltp: nextIndexLtp ?? prev?.ltp,
//         close: nextIndexClose ?? prev?.close,
//       }));
//     }
//   }, [normalizedSymbol]);

//   const scheduleFlush = useCallback(() => {
//     if (flushTimerRef.current) return;

//     flushTimerRef.current = setTimeout(() => {
//       flushBufferedPrices();
//     }, 100);
//   }, [flushBufferedPrices]);

//   useEffect(() => {
//     let timeoutId: ReturnType<typeof setTimeout> | undefined;
//     let off = () => { };

//     unregisterSubscription('optionChainOwner');

//     if (!wsSymbols.length) return;

//     const payload = {
//       type: 'subscribe' as const,
//       data: [
//         {
//           segment: WS_SEG,
//           symbols: wsSymbols,
//           subscription_type: 'option_chain',
//         },
//       ],
//     };

//     registerSubscription('optionChainOwner', payload);

//     if (!isMarketOpenIST()) {
//       resumeMarketFeed();
//       timeoutId = setTimeout(() => {
//         pauseMarketFeed();
//         off();
//       }, 2000);
//     }

//     off = onWsMessage((msg) => {
//       if (msg?.type !== 'snapshot' && msg?.type !== 'update') return;
//       if (!msg?.data || typeof msg.data !== 'object') return;

//       const normalized: Record<string, any> = {};
//       const msgSegment = String(msg?.segment ?? '').toUpperCase();

//       for (const rawKey of Object.keys(msg.data)) {
//         const entry = msg.data[rawKey];
//         const symbolKey = String(rawKey).toUpperCase();

//         normalized[symbolKey] = entry;

//         if (msgSegment) {
//           normalized[`${msgSegment}:${symbolKey}`] = entry;
//         }

//         const entrySymbol = String(entry?.symbol ?? '').toUpperCase();
//         if (entrySymbol) {
//           normalized[entrySymbol] = entry;
//           if (msgSegment) {
//             normalized[`${msgSegment}:${entrySymbol}`] = entry;
//           }
//         }
//       }

//       Object.assign(wsBufferRef.current, normalized);
//       scheduleFlush();
//     });

//     return () => {
//       if (timeoutId) clearTimeout(timeoutId);
//       if (flushTimerRef.current) {
//         clearTimeout(flushTimerRef.current);
//         flushTimerRef.current = null;
//       }
//       off();
//       unregisterSubscription('optionChainOwner');
//     };
//   }, [scheduleFlush, wsSymbols]);

//   useEffect(() => {
//     if (!rows.length) return;
//     if (fixedCenterStrike !== null) return;

//     const strikesList = rows.map((r) => r.strike);
//     const referenceLtp =
//       live?.ltp ?? optionChainData?.data?.data?.data?.spot_ltp ?? 0;

//     if (!referenceLtp) return;

//     const closestStrike = findClosestStrike(referenceLtp, strikesList);
//     setFixedCenterStrike(closestStrike);
//   }, [rows, fixedCenterStrike, live?.ltp, optionChainData]);

//   const listWithBox: ListItem[] = useMemo(() => {
//     if (!rows.length) return [];

//     const out: ListItem[] = [];

//     rows.forEach((r, idx) => {
//       if (!r.callSymbol || !r.putSymbol) return;

//       out.push({
//         type: 'row',
//         strike: r.strike,
//         callSymbol: r.callSymbol,
//         putSymbol: r.putSymbol,
//       });

//       if (fixedCenterStrike !== null && r.strike === fixedCenterStrike) {
//         out.push({
//           type: 'box',
//           id: `box-${r.strike}-${idx}`,
//           strike: r.strike,
//           ltp: Number(live?.ltp ?? 0),
//           close: Number(live?.close ?? 0),
//         });
//       }
//     });

//     return out;
//   }, [rows, fixedCenterStrike, live?.ltp, live?.close]);

//   const onPressInstrument = useCallback(
//     (instrumentSymbol: string, ltp: number, abs: number) => {
//       navigation.navigate('Instrument', {
//         symbol: instrumentSymbol,
//         ltp,
//         abs,
//       });
//     },
//     [navigation]
//   );

//   const renderItem: ListRenderItem<ListItem> = useCallback(
//     ({ item }) => {
//       if (item.type === 'box') {
//         return <CenterBoxRow ltp={item.ltp} close={item.close} />;
//       }

//       const callKey = keyFor(item.callSymbol.symbol);
//       const putKey = keyFor(item.putSymbol.symbol);

//       const callData = mergeOptionData(item.callSymbol, wsPrices[callKey]);
//       const putData = mergeOptionData(item.putSymbol, wsPrices[putKey]);

//       return (
//         <OptionRow
//           item={item}
//           callData={callData}
//           putData={putData}
//           onPressInstrument={onPressInstrument}
//         />
//       );
//     },
//     [onPressInstrument, wsPrices]
//   );

//   const keyExtractor = useCallback((item: ListItem, index: number) => {
//     return item.type === 'box' ? item.id : `${item.strike}-${index}`;
//   }, []);

//   const isDatesLoading = !optionChainDatesData?.length;
//   const isRowsLoading = isOptionChainLoading || !rows?.length;
//   const showSkeleton = isDatesLoading || isRowsLoading;

//   return (
//     <View style={styles.container}>
//       {showSkeleton ? (
//         <>
//           <OptionChainHeaderSkeleton />
//           <OptionChainTableHeaderSkeleton />
//           <OptionChainSkeletonList />
//         </>
//       ) : (
//         <>
//           <View style={styles.topBar}>
//             <IconButton
//               vectorType="MaterialCommunityIcons"
//               name="keyboard-backspace"
//               onPress={() => navigation.goBack()}
//               color={mainColors.white}
//               backgroundColor={mainColors.black}
//             />

//             <Text style={styles.title}>{symbol}</Text>

//             <Dropdown
//               data={dropDownData}
//               labelField="label"
//               valueField="value"
//               placeholder="Select"
//               value={selectedExpiry}
//               containerStyle={{
//                 borderRadius: 10,
//                 borderWidth: 1,
//                 borderColor: mainColors.inputBorder,
//                 overflow: 'hidden',
//               }}
//               selectedTextStyle={{
//                 color: mainColors.white,
//                 fontFamily: fontFamily.poppinsRegular,
//                 fontSize: scaler(10),
//               }}
//               style={{
//                 borderWidth: 1,
//                 borderColor: mainColors.inputBorder,
//                 height: scaler(25),
//                 width: scaler(110),
//                 borderRadius: 15,
//                 paddingHorizontal: scaler(10),
//               }}
//               itemTextStyle={{
//                 color: mainColors.white,
//                 fontFamily: fontFamily.poppinsRegular,
//                 fontSize: scaler(8),
//               }}
//               itemContainerStyle={{ backgroundColor: mainColors.black }}
//               onChange={(item) => setSelectedExpiry(item.value)}
//               activeColor={mainColors.inputBorder}
//             />
//           </View>

//           <View style={styles.headerRow}>
//             <Text style={[styles.headerText, styles.headerLeft]}>Call LTP</Text>
//             <Text style={[styles.headerText, styles.headerMid]}>Strike</Text>
//             <Text style={[styles.headerText, styles.headerRight]}>Put LTP</Text>
//           </View>

//           <FlatList
//             ref={flatListRef}
//             data={listWithBox}
//             keyExtractor={keyExtractor}
//             renderItem={renderItem}
//             initialNumToRender={20}
//             maxToRenderPerBatch={12}
//             updateCellsBatchingPeriod={50}
//             windowSize={8}
//             removeClippedSubviews
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           />
//         </>
//       )}
//     </View>
//   );
// }

/* eslint-disable react/no-unstable-nested-components */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';

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
import scaler from '../../Utils/scaler';
import useOptionChainDataQuery from './Hooks/useGetOptionsDataQuery';
import OptionChainSkeletonList, {
  OptionChainCenterBoxSkeleton,
  OptionChainHeaderSkeleton,
  OptionChainTableHeaderSkeleton,
} from './SkLoading/OptionChainSkeleton';

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

type MergedOptionData = {
  symbol: string;
  ltp: number;
  close: number;
  absChange: number;
  pctChange: number;
};

const WS_SEG = 'NFO-OPT';
const WS_SEG_INDICES = 'INDICES';

const normalizeWsSymbol = (raw: any): string => String(raw ?? '').trim().toUpperCase();

const keyFor = (sym: string) => `${WS_SEG}:${String(sym).toUpperCase()}`;
const keyForIndices = (sym: string) => `${WS_SEG_INDICES}:${String(sym).toUpperCase()}`;

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const getApiLtp = (item?: ApiSymbolData | null) =>
  Number(item?.ltp ?? item?.current_price ?? 0);

const mergeOptionData = (apiItem?: ApiSymbolData | null, wsItem?: any): MergedOptionData => {
  const apiLtp = getApiLtp(apiItem);
  const close = Number(wsItem?.close ?? apiItem?.previous_close ?? 0);

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

const findClosestStrike = (ltp: number, strikesList: number[]): number => {
  if (!strikesList?.length) return 0;

  let closest = strikesList[0];
  let diff = Math.abs(ltp - closest);

  for (const strike of strikesList) {
    const newDiff = Math.abs(ltp - strike);
    if (newDiff < diff) {
      closest = strike;
      diff = newDiff;
    }
  }

  return closest;
};

const CenterBoxRow = React.memo(({ ltp, close }: { ltp: number; close: number }) => {
  if (ltp === undefined || close === undefined) {
    return <OptionChainCenterBoxSkeleton />;
  }

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
});

type OptionRowProps = {
  item: RowItem;
  callData: MergedOptionData;
  putData: MergedOptionData;
  onPressInstrument: (symbol: string, ltp: number, abs: number) => void;
};

const OptionRow = React.memo(
  ({ item, callData, putData, onPressInstrument }: OptionRowProps) => {
    const callStrength = clamp(Math.abs(callData.pctChange), 0, 10);
    const putStrength = clamp(Math.abs(putData.pctChange), 0, 10);
    const sum = callStrength + putStrength || 1;

    const leftPct = (putStrength / sum) * 50;
    const rightPct = (callStrength / sum) * 50;

    const onPressCall = () => {
      onPressInstrument(item.callSymbol.symbol, callData.ltp, callData.absChange);
    };

    const onPressPut = () => {
      onPressInstrument(item.putSymbol.symbol, putData.ltp, putData.absChange);
    };

    return (
      <View style={styles.rowWrap}>
        <TouchableOpacity style={styles.cellLeft} activeOpacity={0.7} onPress={onPressCall}>
          <Text style={styles.moneyText}>₹{fmtMoney(callData.ltp)}</Text>
          <Text
            style={[
              styles.pctText,
              callData.pctChange >= 0 ? styles.green : styles.red,
            ]}
          >
            {fmtPct(callData.pctChange)}
          </Text>
        </TouchableOpacity>

        <View style={styles.cellMid}>
          <Text style={styles.strikeText}>{item.strike}</Text>
          <View style={styles.tickTrack2}>
            <View style={[styles.tickLeftRed, { width: `${leftPct}%` }]} />
            <View style={[styles.tickRightGreen, { width: `${rightPct}%` }]} />
          </View>
        </View>

        <TouchableOpacity style={styles.cellRight} activeOpacity={0.7} onPress={onPressPut}>
          <Text style={styles.moneyText}>₹{fmtMoney(putData.ltp)}</Text>
          <Text
            style={[
              styles.pctText,
              putData.pctChange >= 0 ? styles.green : styles.red,
            ]}
          >
            {fmtPct(putData.pctChange)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);

OptionRow.displayName = 'OptionRow';
CenterBoxRow.displayName = 'CenterBoxRow';

export default function OptionsChainScreen({ navigation, route }: Props) {
  const flatListRef = useRef<FlatList<ListItem>>(null);

  const symbol = String(route?.params?.symbol ?? '').replace(' ', '');
  const normalizedSymbol = normalizeWsSymbol(symbol);

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

  const wsBufferRef = useRef<Record<string, any>>({});
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ROW_HEIGHT = 58;
  const CENTER_BOX_HEIGHT = 44;

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
          s.symbols?.find((x: ApiSymbolData) =>
            x.symbol?.toUpperCase().endsWith('CE')
          ) ?? null;

        const putSym =
          s.symbols?.find((x: ApiSymbolData) =>
            x.symbol?.toUpperCase().endsWith('PE')
          ) ?? null;

        if (!callSym || !putSym) return null;

        return {
          strike: s.strike,
          callSymbol: callSym,
          putSymbol: putSym,
        };
      })
      .filter(Boolean) as RowData[];
  }, [strikes]);

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
    wsBufferRef.current = {};
  }, [selectedExpiry]);

  const flushBufferedPrices = useCallback(() => {
    flushTimerRef.current = null;

    const buffered = wsBufferRef.current;
    wsBufferRef.current = {};

    const keys = Object.keys(buffered);
    if (!keys.length) return;

    let nextIndexLtp: number | undefined;
    let nextIndexClose: number | undefined;

    const indexEntry =
      buffered[keyForIndices(normalizedSymbol)] ?? buffered[normalizedSymbol];

    if (indexEntry) {
      if (indexEntry.ltp !== undefined) nextIndexLtp = Number(indexEntry.ltp);
      if (indexEntry.close !== undefined) nextIndexClose = Number(indexEntry.close);
    }

    setWsPrices((prev) => ({ ...prev, ...buffered }));

    if (nextIndexLtp !== undefined || nextIndexClose !== undefined) {
      setLive((prev) => ({
        ...prev,
        ltp: nextIndexLtp ?? prev?.ltp,
        close: nextIndexClose ?? prev?.close,
      }));
    }
  }, [normalizedSymbol]);

  const scheduleFlush = useCallback(() => {
    if (flushTimerRef.current) return;

    flushTimerRef.current = setTimeout(() => {
      flushBufferedPrices();
    }, 100);
  }, [flushBufferedPrices]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let off = () => { };

    unregisterSubscription('optionChainOwner');

    if (!wsSymbols.length) return;

    const payload = {
      type: 'subscribe' as const,
      data: [
        {
          segment: WS_SEG,
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
      if (msg?.type !== 'snapshot' && msg?.type !== 'update') return;
      if (!msg?.data || typeof msg.data !== 'object') return;

      const normalized: Record<string, any> = {};
      const msgSegment = String(msg?.segment ?? '').toUpperCase();

      for (const rawKey of Object.keys(msg.data)) {
        const entry = msg.data[rawKey];
        const symbolKey = String(rawKey).toUpperCase();

        normalized[symbolKey] = entry;

        if (msgSegment) {
          normalized[`${msgSegment}:${symbolKey}`] = entry;
        }

        const entrySymbol = String(entry?.symbol ?? '').toUpperCase();
        if (entrySymbol) {
          normalized[entrySymbol] = entry;
          if (msgSegment) {
            normalized[`${msgSegment}:${entrySymbol}`] = entry;
          }
        }
      }

      Object.assign(wsBufferRef.current, normalized);
      scheduleFlush();
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (flushTimerRef.current) {
        clearTimeout(flushTimerRef.current);
        flushTimerRef.current = null;
      }
      off();
      unregisterSubscription('optionChainOwner');
    };
  }, [scheduleFlush, wsSymbols]);

  useEffect(() => {
    if (!rows.length) return;
    if (fixedCenterStrike !== null) return;

    const strikesList = rows.map((r) => r.strike);
    const referenceLtp =
      live?.ltp ?? optionChainData?.data?.data?.data?.spot_ltp ?? 0;

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

      if (fixedCenterStrike !== null && r.strike === fixedCenterStrike) {
        out.push({
          type: 'box',
          id: `box-${r.strike}-${idx}`,
          strike: r.strike,
          ltp: Number(live?.ltp ?? 0),
          close: Number(live?.close ?? 0),
        });
      }
    });

    return out;
  }, [rows, fixedCenterStrike, live?.ltp, live?.close]);

  const onPressInstrument = useCallback(
    (instrumentSymbol: string, ltp: number, abs: number) => {
      navigation.navigate('Instrument', {
        symbol: instrumentSymbol,
        ltp,
        abs,
      });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<ListItem> = useCallback(
    ({ item }) => {
      if (item.type === 'box') {
        return <CenterBoxRow ltp={item.ltp} close={item.close} />;
      }

      const callKey = keyFor(item.callSymbol.symbol);
      const putKey = keyFor(item.putSymbol.symbol);

      const callData = mergeOptionData(item.callSymbol, wsPrices[callKey]);
      const putData = mergeOptionData(item.putSymbol, wsPrices[putKey]);

      return (
        <OptionRow
          item={item}
          callData={callData}
          putData={putData}
          onPressInstrument={onPressInstrument}
        />
      );
    },
    [onPressInstrument, wsPrices]
  );

  const keyExtractor = useCallback((item: ListItem, index: number) => {
    return item.type === 'box' ? item.id : `${item.strike}-${index}`;
  }, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<ListItem> | null | undefined, index: number) => {
      const item = listWithBox[index];
      const length = item?.type === 'box' ? CENTER_BOX_HEIGHT : ROW_HEIGHT;

      let offset = 0;
      for (let i = 0; i < index; i += 1) {
        offset += listWithBox[i]?.type === 'box' ? CENTER_BOX_HEIGHT : ROW_HEIGHT;
      }

      return {
        length,
        offset,
        index,
      };
    },
    [listWithBox]
  );

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
            <IconButton
              vectorType="MaterialCommunityIcons"
              name="keyboard-backspace"
              onPress={() => navigation.goBack()}
              color={mainColors.white}
              backgroundColor={mainColors.black}
            />

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
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            initialNumToRender={16}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={60}
            windowSize={6}
            decelerationRate={0.8}
            disableIntervalMomentum
            removeClippedSubviews
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
          />
        </>
      )}
    </View>
  );
}