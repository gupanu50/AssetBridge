import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import scaler from '../Utils/scaler';
import { mainColors } from '../Utils/helper';

const CommonLoader: React.FC<any> = ({
    visible = true,
    color = mainColors.mainButton,
    backgroundColor = mainColors.loaderBg,
}) => {
    if (!visible) {
        return null;
    }

    return (
        <View style={[styles.overlay, { backgroundColor }]}>
            <ActivityIndicator size={scaler(30)} color={color} />
        </View>
    );
};

export default CommonLoader;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});
