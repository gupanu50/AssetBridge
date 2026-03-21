import React from 'react';
import { View } from 'react-native';
import SkeletonBlock from '../../../../ReusableComponents/commonSkeletonBlock';
import { styles } from './styles';

export default function CommonTopBtnSliderSkeleton() {
    return (
        <View style={styles.mainView}>
            {[1, 2, 3].map((item) => (
                <View key={item} style={styles.innerBoxView}>
                    <SkeletonBlock width={'70%'} height={14} radius={6} />
                    <View style={styles.gap8} />
                    <SkeletonBlock width={'85%'} height={12} radius={6} />
                </View>
            ))}
        </View>
    );
}