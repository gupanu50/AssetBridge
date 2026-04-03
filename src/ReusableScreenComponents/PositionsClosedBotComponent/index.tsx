import { View, Text, FlatList, Image, Alert } from 'react-native';
import React, { useMemo, useState } from 'react';
import { mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';
import scaler from '../../Utils/scaler';
import { styles } from './styles';
import { FlatItem } from './types';
import { Images } from '../../Assets';
import moment from 'moment';
import CommonTextInput from '../../ReusableComponents/commonTextInput';
import { downloadExcelToDownloads, formatAmount } from '../../ReusableComponents/commonFunctions';
import snackbarHandler from '../../Utils/snackbarHandler';
import usePostionsBotOpenQuery from '../PositionsOpenBotComponent/Hooks/usePostionsBotOpenQuery';
const PositionsBotClosedComponent = (bot_id: any) => {
  const { data } = usePostionsBotOpenQuery('closed', bot_id);
  const flatData = data?.data?.data?.results;
  const [input, setInput] = useState('');
  const totalData = data?.data?.data?.total_invested_value
  // console.log('dataClosedPostions', data?.data?.data);

  const renderCardData = ({ item }: { item: FlatItem }) => {
    const statusColor =
      item.realized_pnl > 0
        ? mainColors.green
        : item.realized_pnl < 0
          ? mainColors.redText
          : mainColors.descText;
    return (
      <View style={styles.orderCard}>
        {/* Top row: checkbox + Name + Exchange badge */}
        <View style={[styles.cardTopRow, { justifyContent: 'space-between' }]}>
          <View style={styles.cardTopRow}>
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
              <Text style={styles.kLabel}>Entry time </Text>
              <Text style={styles.kValue}>: {moment(item.entry_time).format('HH:mm:ss')}</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Exit time </Text>
              <Text style={styles.kValue}>: {moment(item.exit_time).format('HH:mm:ss')}</Text>
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
              <Text style={styles.kLabel}>PnL :</Text>
              <Text style={[styles.kValue, { color: statusColor }]}>
                {' '} {formatAmount(item.realized_pnl)}
              </Text>
            </View>

            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Entry Price Avg </Text>
              <Text style={styles.kValue}>: {item.entry_price}</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kLabel}>Exit Price Avg </Text>
              <Text style={styles.kValue}>: {item.exit_price}</Text>
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
  const filteredOrderData = useMemo(() => {
    if (!input.trim()) {
      return flatData; // If input is empty, return all orders
    }
    return flatData?.filter((order: any) =>
      order.symbol.toLowerCase().includes(input.toLowerCase()) ||
      order.symbol.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, flatData]);
  const handleDownload = async (item: any) => {
    if (item && Array.isArray(item) && item.length > 0) {
      const res = await downloadExcelToDownloads(item, 'closedPositions');
      if (res) {
        snackbarHandler.successToast('File is downloaded successfully');
      } else {
        snackbarHandler.errorToast('Failed to download file');
      }
    } else {
      Alert.alert('No data to download');
    }
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
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        scrollEnabled={false}
      />
      {filteredOrderData?.length > 0 && <View style={styles.itemSeperator} />}
      <View
        style={[
          styles.buttonFlexView,
          { marginBottom: scaler(10), justifyContent: 'flex-end' },
        ]}
      >
        {filteredOrderData?.length > 0 && <>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalValueText}>{formatAmount(totalData)}</Text>
        </>}
      </View>
      {/* <View style={styles.itemSeperator} /> */}
    </View>
  );
};

export default PositionsBotClosedComponent;
