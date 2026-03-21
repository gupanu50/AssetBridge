import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import SkeletonBlock from '../../../ReusableComponents/commonSkeletonBlock';
import scaler from '../../../Utils/scaler';

export function WatchlistTabsSkeleton() {
    return (
        <View style={styles.topTabsWrap}>
            <View style={styles.watchlistTabsSkeletonWrap}>
                <SkeletonBlock width={80} height={28} radius={16} />
                <View style={{ width: scaler(10) }} />
                <SkeletonBlock width={80} height={28} radius={16} />
                <View style={{ width: scaler(10) }} />
                <SkeletonBlock width={80} height={28} radius={16} />
            </View>
        </View>
    );
}

export function WatchlistSearchSkeleton() {
    return (
        <View style={styles.mainView}>
            <View style={styles.watchlistSearchSkeletonWrap}>
                <SkeletonBlock width={'100%'} height={38} radius={25} />
            </View>
        </View>
    );
}

export function WatchRowSkeleton() {
    return (
        <View style={styles.watchRow}>
            <View style={styles.watchLeft}>
                <SkeletonBlock width={'55%'} height={14} radius={6} />
                <View style={styles.watchSkeletonGap6} />
                <SkeletonBlock width={'35%'} height={11} radius={6} />
            </View>

            <View style={styles.watchRight}>
                <SkeletonBlock width={70} height={14} radius={6} />
                <View style={styles.watchSkeletonGap6} />
                <SkeletonBlock width={110} height={11} radius={6} />
            </View>

            <View style={styles.watchSkeletonMenu}>
                <SkeletonBlock width={20} height={20} radius={10} />
            </View>
        </View>
    );
}

export function WatchRowsSkeleton() {
    return (
        <View style={styles.mainView}>
            <View style={styles.watchListWrap}>
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <View key={item}>
                        <WatchRowSkeleton />
                        {index !== 5 ? <View style={styles.watchSeparator} /> : null}
                    </View>
                ))}
            </View>
        </View>
    );
}

export default function WatchlistSkeleton() {
    return (
        <>
            <WatchlistTabsSkeleton />
            <WatchlistSearchSkeleton />
            <WatchRowsSkeleton />
        </>
    );
}