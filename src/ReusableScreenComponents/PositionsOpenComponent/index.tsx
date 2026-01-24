/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import CommonButton from '../../ReusableComponents/commonButton';
import { styles } from './styles';
import scaler from '../../Utils/scaler';
import { FlatItem } from './types';
import { Images } from '../../Assets';

const PositionsOpenComponent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const flatData = [
    {
      id: 1,
      name: 'NIFTY 25000 CE',
      exchange: 'NFO',
      bs: 'Long',
      DateTime: '04APR25',
      Qty: '50',
      LTP: '245.55',
      Product: 'CNC',
      Status: 'Filled',
      Price: '245.00',
      Source: 'Manual',
    },
    {
      id: 2,
      name: 'Lorem Ipsum',
      exchange: 'NSE',
      bs: 'Short',
      DateTime: '05APR25',
      Qty: '50',
      LTP: '2450.55',
      Product: 'CNC',
      Status: 'Pending',
      Price: '2450.00',
      Source: 'Automated',
    },
  ];
  const toggleRow = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isAllSelected =
    flatData.length > 0 && selectedIds.size === flatData.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(flatData.map(x => x.id)));
    }
  };
  const renderCardData = ({ item }: { item: FlatItem }) => {
    const checked = selectedIds.has(item.id);
    setIsChecked(checked);
    const statusColor =
      item.Status?.toLowerCase() === 'filled'
        ? mainColors.green
        : item.Status?.toLowerCase() === 'pending'
          ? '#F5A524' // orange-ish like screenshot
          : mainColors.descText;

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
              name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
              backgroundColor={mainColors.black}
              color={isChecked ? mainColors.mainButton : mainColors.transactionTime}
            />
          </TouchableOpacity>

          <Text style={styles.cardTitle}>{item.name}</Text>

          <View style={styles.exchangeBadge}>
            <Text style={styles.exchangeBadgeText}>{item.exchange}</Text>
          </View>
          <View style={styles.pillManAut}>
            <Text style={styles.pillText}>{item.Source}</Text>
          </View>
        </View>

        {/* Buy/Sell + DateTime */}
        <View style={styles.cardSubRow}>
          <Text style={styles.dateText}>{item.DateTime}</Text>
        </View>

        {/* Two columns like screenshot */}
        <View style={styles.cardGrid}>
          {/* Left column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Qty </Text>
              <Text style={styles.kValue}>: {item.Qty}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Entry price Avg </Text>
              <Text style={styles.kValue}>: {item.LTP}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Product</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{item.Product}</Text>
              </View>
            </View>
          </View>

          {/* Right column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Unrealized PnL </Text>
              <Text style={[styles.kValue, { color: statusColor }]}>
                : {item.Status}
              </Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>LTP </Text>
              <Text style={styles.kValue}>: {item.Price}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Direction</Text>
              <View
                style={[
                  styles.pillDirection,
                  {
                    backgroundColor:
                      item.bs === 'Long'
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
                        item.bs === 'Long'
                          ? mainColors.swiperPnl
                          : mainColors.swiperMaxDD,
                    },
                  ]}
                >
                  {item.bs}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={[styles.flexView, styles.lineView]}>
        <IconButton
          vectorType="MaterialCommunityIcons"
          name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          backgroundColor={mainColors.black}
          color={isChecked ? mainColors.mainButton : mainColors.transactionTime}
          onPress={() => toggleSelectAll()}
        />
        <Text style={styles.selectText}>Select All</Text>
        <View style={styles.searchBox}>
          <Text style={styles.searchText}>Search</Text>
          <Image source={Images.search} resizeMode='contain' style={styles.searchLogo} />
        </View>
        <IconButton
          vectorType="AntDesign"
          name="download"
          color={mainColors.mainButton}
          backgroundColor={mainColors.black}
        />
      </View>
      <FlatList
        data={flatData}
        renderItem={renderCardData}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        scrollEnabled={false}
      />
      <View style={styles.itemSeperator} />
      <View
        style={[
          styles.buttonFlexView,
          { marginBottom: scaler(10), alignItems: 'center' },
        ]}
      >
        <View style={styles.exitView}>
          <Text style={styles.exitText}>Exit 2 Positions</Text>
        </View>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalValueText}>12,58,593.00</Text>
      </View>
      <View style={styles.itemSeperator} />
      <View style={styles.buttonFlexView}>
        <CommonButton
          label="Buy"
          backgroundColor={mainColors.black}
          textColor={mainColors.greenText}
          extraStyle={[styles.buttonWidth, { borderColor: mainColors.greenText }]}
        />
        <CommonButton
          label="Sell"
          backgroundColor={mainColors.black}
          textColor={mainColors.redText}
          extraStyle={[styles.buttonWidth, { borderColor: mainColors.redText }]}
        />
      </View>
    </View>
  );
};

export default PositionsOpenComponent;
