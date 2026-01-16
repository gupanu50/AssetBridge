/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import { styles } from './styles';

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

export default function OptionsChainScreen() {
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
        <TouchableOpacity style={styles.backBtn} onPress={() => {}}>
          <IconButton
            vectorType="MaterialCommunityIcons"
            name="keyboard-backspace"
            color={mainColors.white}
            backgroundColor={mainColors.black}
          />
        </TouchableOpacity>

        <Text style={styles.title}>HDFC</Text>

        <TouchableOpacity style={styles.datePill} onPress={() => {}}>
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
