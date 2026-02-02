import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import scaler from '../Utils/scaler';
import { Images } from '../Assets';
import { mainColors } from '../Utils/helper';
import IconButton from './iconButton';
import { MainStackScreenProps } from '../Navigation/NavigationTypes/screenTypes';
import CommonTextInput from './commonTextInput';
type CommonHeaderProps = {
  navigation?: MainStackScreenProps<
    'HomeTab' | 'Algo' | 'WatchList' | 'NoData'
  >['navigation'];
};
const CommonHeader = (props: CommonHeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState('');
  return (
    <View>
      <View style={styles.container}>
        <Image
          source={Images.singleLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.innerView}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Image
              source={Images.search}
              resizeMode="contain"
              style={styles.searchLogo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate('NoData', {
              image: Images.noNoti,
              heading: 'No Notifications',
              descText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`,
              redText: 'Notification Inbox Empty',
              btnLable: 'Go to Dashboard',
            })}
          >
            <Image
              source={Images.notification}
              resizeMode="contain"
              style={styles.notiLogo}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showSearch && (
        <CommonTextInput
          value={value}
          setValue={setValue}
          placeholder="Search here"
          containerStyle={styles.containerStyle}
          style={styles.input}
        />
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
    marginLeft: scaler(10),
  },
  containerStyle: {
    marginHorizontal: scaler(10),
    marginBottom: scaler(10)
  },
  input: {
    width: '98%'
  },
});
