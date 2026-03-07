import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import scaler from '../Utils/scaler';
import { Images } from '../Assets';
import { fontFamily, mainColors } from '../Utils/helper';
import CommonTextInput from './commonTextInput';
import useCompressQuery from '../Screens/HomeScreen/Hooks/useCompressQuery';
import { CommonHeaderProps, ContractsObj, SearchItem } from './commonTypes';
import { buildSearchIndex, searchItems, useDebounce } from './commonFunctions';
import useNotiCountQuery from '../Screens/NotificationScreen/Hooks/useGetNotiCountQuery';

const CommonHeader = (props: CommonHeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);
  const { data } = useCompressQuery();
  const { data: notiCountData, refetch } = useNotiCountQuery();
  const notiCount = notiCountData?.data?.data?.unread || 0;
  const contracts: ContractsObj | undefined = data?.data?.data?.contracts;
  // ✅ build flattened list once per API update
  const searchIndex = useMemo(() => buildSearchIndex(contracts), [contracts]);
  // console.log('ContractsObj', contracts);

  // ✅ compute results only after debounce
  const results = useMemo(() => {
    return searchItems(searchIndex, debouncedValue, 30);
  }, [searchIndex, debouncedValue]);

  const onPick = (item: SearchItem) => {
    const obj = {
      segment: item?.segment,
      symbol: item?.symbol,
      exchange: item?.segment,
    }
    setShowSearch(false);
    setValue('');
    props?.navigation?.navigate('Instrument', { item: obj })
  };
  return (
    <View>
      <View style={[styles.container, { justifyContent: showSearch ? 'center' : 'space-between' }]}>
        <Image
          source={Images.singleLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        {showSearch && (
          <CommonTextInput
            value={value}
            autoFocus={true}
            setValue={setValue}
            placeholder="Search here"
            containerStyle={styles.containerStyle}
            style={styles.input}
          />
        )}
        <View style={styles.innerView}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Image
              source={Images.search}
              resizeMode="contain"
              style={styles.searchLogo}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                // ✅ open modal if provided, else fallback to your old screen
                if (props.onPressBell) {
                  props.onPressBell();
                  return;
                }
              }}
            >
              <Image
                source={Images.notification}
                resizeMode="contain"
                style={styles.notiLogo}
              />
            </TouchableOpacity>
            <View style={styles.notiCountView}>
              <Text style={styles.notiCountText}>{notiCount}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* ✅ Drop-down results */}
      {showSearch && debouncedValue.trim().length > 0 && (
        <View style={styles.dropdown}>
          {results.length === 0 ? (
            <Text style={styles.noResult}>No match found</Text>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(it) => `${it.segment}:${it.symbol}:${it.fullName}`}
              keyboardShouldPersistTaps="handled"
              initialNumToRender={15}
              maxToRenderPerBatch={20}
              windowSize={7}
              removeClippedSubviews
              style={styles.list}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.row} onPress={() => onPick(item)}>
                  <Text style={styles.fullName}>{item.fullName}</Text>
                  <Text style={styles.subText}>
                    {item.symbol} • {item.segment}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}

        </View>
      )}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: mainColors.moversCards,
    borderWidth: 1,
    marginHorizontal: scaler(10),
    marginVertical: scaler(10),
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaler(20),
    paddingVertical: scaler(10),
  },
  logo: {
    height: scaler(30),
    width: scaler(30),
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchLogo: {
    height: scaler(20),
    width: scaler(20),
  },
  notiLogo: {
    height: scaler(25),
    width: scaler(25),
    marginLeft: scaler(8),
  },
  containerStyle: {
    marginHorizontal: scaler(10),
    height: scaler(30),
    borderWidth: 0,
  },
  input: {
    width: '70%',
    paddingBottom: 0,
  },
  dropdown: {
    marginHorizontal: scaler(12),
    marginTop: scaler(4),
    borderRadius: scaler(12),
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    paddingVertical: scaler(10),
    paddingHorizontal: scaler(12),
    borderBottomWidth: 0.5,
  },
  fullName: {
    fontSize: scaler(14),
    fontFamily: fontFamily.poppinsMedium,
    color: mainColors.white
  },
  subText: {
    marginTop: scaler(2),
    opacity: 0.6,
    fontFamily: fontFamily.poppinsRegular,
    fontSize: scaler(11),
    color: mainColors.white
  },
  noResult: {
    paddingVertical: scaler(12),
    paddingHorizontal: scaler(12),
    fontFamily: fontFamily.poppinsRegular,
    opacity: 0.6,
    color: mainColors.white
  },
  list: {
    maxHeight: scaler(650), // ✅ dropdown height (scroll inside this)
  },
  listContent: {
    paddingVertical: 0,
  },
  separator: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: mainColors.white, // or border color you prefer
  },
  notiCountView: {
    borderRadius: 100 / 2,
    backgroundColor: mainColors.redText,
    height: scaler(17),
    width: scaler(15),
    position: 'absolute',
    right: scaler(-3),
    top: scaler(-5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notiCountText: {
    color: mainColors.white, fontSize: scaler(10), fontFamily: fontFamily.poppinsBold
  }
});
