import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import CommonButton from '../../ReusableComponents/commonButton';
import { mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import scaler from '../../Utils/scaler';
import { styles } from './styles';
import { FlatItem, PositionClosedProps } from './types';
import { Images } from '../../Assets';

const PositionsClosedComponent = (props: PositionClosedProps) => {
  const flatData = [
    {
      id: 1,
      name: 'NIFTY 25000 CE',
      exchange: 'NFO',
      bs: 'Long',
      DateTime: '04APR25',
      Qty: '50',
      LTP: '10:00:00',
      Product: 'CNC',
      Status: '234,5678',
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
      LTP: '10:00:00',
      Product: 'CNC',
      Status: '234,567',
      Price: '2450.00',
      Source: 'Automated',
    },
  ];

  const renderCardData = ({ item }: { item: FlatItem }) => {
    const statusColor =
      item.Status?.toLowerCase() === '234,5678'
        ? mainColors.green
        : item.Status?.toLowerCase() === '234,567'
          ? mainColors.red // orange-ish like screenshot
          : mainColors.descText;

    return (
      <View style={styles.orderCard}>
        {/* Top row: checkbox + Name + Exchange badge */}
        <View style={styles.cardTopRow}>
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
              <Text style={styles.kLabel}>Entry time </Text>
              <Text style={styles.kValue}>: {item.LTP}</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Exit time </Text>
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
              <Text style={styles.kLabel}>PnL </Text>
              <Text style={[styles.kValue, { color: statusColor }]}>
                : {item.Status}
              </Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Entry Price </Text>
              <Text style={styles.kValue}>: {item.Price}</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Exit Price </Text>
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
          { marginBottom: scaler(10), justifyContent: 'flex-end' },
        ]}
      >
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalValueText}>12,58,593.00</Text>
      </View>
      <View style={styles.itemSeperator} />
      {props?.isShow && <View style={styles.buttonFlexView}>
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
      </View>}
    </View>
  );
};

export default PositionsClosedComponent;
