import { StyleSheet, View } from 'react-native';
import React from 'react';
import IconButton from './iconButton';
import { mainColors } from '../Utils/helper';
import scaler from '../Utils/scaler';
import { MainStackScreenProps } from '../Navigation/NavigationTypes/screenTypes';
type CommonBackHeaderProps = {
  navigation?: MainStackScreenProps<'Instrument'>['navigation'];
}
const CommonBackHeader = (props: CommonBackHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <IconButton
          vectorType="MaterialCommunityIcons"
          name="keyboard-backspace"
          onPress={() => props.navigation?.goBack()}
          backgroundColor={mainColors.black}
          color={mainColors.white}
        />
        <View style={styles.flexView}>
          {/* <IconButton
            vectorType="MaterialCommunityIcons"
            name="bookmark-outline"
            backgroundColor={mainColors.black}
            color={mainColors.white}
          /> */}
          {/* <IconButton
            vectorType="MaterialIcons"
            name="search"
            backgroundColor={mainColors.black}
            onPress={() => props.navigation?.goBack()}
            color={mainColors.white}
            style={styles.searchIcon}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default CommonBackHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBlockColor: mainColors.instrument,
  },
  main: {
    marginVertical: scaler(18),
    marginHorizontal: scaler(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexView: {
    flexDirection: 'row',
  },
  searchIcon: {
    marginLeft: scaler(10),
  },
});
