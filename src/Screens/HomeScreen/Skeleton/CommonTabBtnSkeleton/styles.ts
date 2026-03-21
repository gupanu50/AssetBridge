import { StyleSheet } from 'react-native';
import scaler from '../../../../Utils/scaler';
import { mainColors } from '../../../../Utils/helper';

export const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: scaler(10),
        flexDirection: 'row',
    },
    innerBoxView: {
        paddingHorizontal: scaler(20),
        paddingVertical: scaler(10),
        borderRadius: 10,
        borderColor: mainColors.niftyBorder,
        borderWidth: 1,
        marginRight: scaler(10),
        minWidth: scaler(120),
    },
    gap8: {
        height: scaler(8),
    },
});