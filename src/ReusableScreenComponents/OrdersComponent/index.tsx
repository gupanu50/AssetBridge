/* eslint-disable react/no-unstable-nested-components */
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { FlatItem } from './types';
import { mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import scaler from '../../Utils/scaler';
import CommonButton from '../../ReusableComponents/commonButton';
import { styles } from './styles';

const OrderComponent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const flatData = [
    {
      id: 1,
      name: 'HDFC',
      exchange: 'NSE',
      bs: 'Buy',
      DateTime: '21/09/2025  07:36:02',
      Qty: '0/1',
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
      bs: 'Sell',
      DateTime: '21/09/2025  07:36:02',
      Qty: '0/1',
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

    const bsColor = item.bs === 'Buy' ? mainColors.green : mainColors.red;

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
              color={mainColors.mainButton}
            />
          </TouchableOpacity>

          <Text style={styles.cardTitle}>{item.name}</Text>

          <View style={styles.exchangeBadge}>
            <Text style={styles.exchangeBadgeText}>{item.exchange}</Text>
          </View>
        </View>

        {/* Buy/Sell + DateTime */}
        <View style={styles.cardSubRow}>
          <Text style={[styles.bsText, { color: bsColor }]}>{item.bs}</Text>
          <Text style={styles.dateText}>{item.DateTime}</Text>
        </View>

        {/* Two columns like screenshot */}
        <View style={styles.cardGrid}>
          {/* Left column */}
          <View style={styles.cardCol}>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Qty.t</Text>
              <Text style={styles.kValue}>: {item.Qty}</Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>LTP</Text>
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
              <Text style={styles.kLabel}>Status</Text>
              <Text style={[styles.kValue, { color: statusColor }]}>
                : {item.Status}
              </Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Price</Text>
              <Text style={styles.kValue}>: {item.Price}</Text>
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
  return (
    <View style={styles.main}>
      <View style={[styles.flexView, styles.lineView]}>
        <IconButton
          vectorType="MaterialCommunityIcons"
          name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          backgroundColor={mainColors.black}
          color={mainColors.mainButton}
          onPress={() => toggleSelectAll()}
        />
        <Text style={styles.selectText}>Select All</Text>
        <View style={styles.searchBox}>
          <Text style={styles.searchText}>Search</Text>
          <IconButton
            vectorType="MaterialIcons"
            name="search"
            size={scaler(18)}
            color={mainColors.white}
            backgroundColor={mainColors.black}
          />
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
      <View style={styles.buttonFlexView}>
        <CommonButton
          label="Buy"
          backgroundColor={mainColors.black}
          textColor={mainColors.greenText}
          extraStyle={[styles.buttonWidth, { borderColor: mainColors.greenBorder }]}
        />
        <CommonButton
          label="Sell"
          backgroundColor={mainColors.black}
          textColor={mainColors.redText}
          extraStyle={[styles.buttonWidth, { borderColor: mainColors.redBorder }]}
        />
      </View>
    </View>
  );
};

export default OrderComponent;
