import React from 'react';
import { View } from 'react-native';
import SkeletonBlock from '../../../../ReusableComponents/commonSkeletonBlock';
import { styles } from './styles';
import scaler from '../../../../Utils/scaler';

export function BotCardSkeleton() {
    return (
        <View style={styles.botSkeletonCard}>
            <SkeletonBlock width={'35%'} height={18} radius={6} />
            <View style={styles.skeletonGap10} />
            <SkeletonBlock width={'65%'} height={12} radius={6} />
            <View style={styles.skeletonGap16} />
            <SkeletonBlock width={'100%'} height={120} radius={12} />
            <View style={styles.skeletonGap16} />
            <SkeletonBlock width={'40%'} height={34} radius={18} />
        </View>
    );
}

export function MoversGridSkeleton() {
    return (
        <View style={styles.moversGridWrap}>
            <View style={styles.skeletonGridRow}>
                <View style={styles.skeletonMoverCard}>
                    <SkeletonBlock width={30} height={30} radius={15} />
                    <View style={styles.skeletonGap8} />
                    <SkeletonBlock width={'65%'} height={12} radius={6} />
                    <View style={styles.skeletonGap16} />
                    <SkeletonBlock width={'45%'} height={14} radius={6} />
                    <View style={styles.skeletonGap8} />
                    <SkeletonBlock width={'55%'} height={10} radius={6} />
                </View>

                <View style={styles.skeletonMoverCard}>
                    <SkeletonBlock width={30} height={30} radius={15} />
                    <View style={styles.skeletonGap8} />
                    <SkeletonBlock width={'65%'} height={12} radius={6} />
                    <View style={styles.skeletonGap16} />
                    <SkeletonBlock width={'45%'} height={14} radius={6} />
                    <View style={styles.skeletonGap8} />
                    <SkeletonBlock width={'55%'} height={10} radius={6} />
                </View>
            </View>

            <View style={styles.skeletonGridRow}>
                <View style={styles.skeletonMoverCard}>
                    <SkeletonBlock width={30} height={30} radius={15} />
                    <View style={styles.skeletonGap8} />
                    <SkeletonBlock width={'65%'} height={12} radius={6} />
                    <View style={styles.skeletonGap16} />
                    <SkeletonBlock width={'45%'} height={14} radius={6} />
                    <View style={styles.skeletonGap8} />
                    <SkeletonBlock width={'55%'} height={10} radius={6} />
                </View>

                <View style={styles.skeletonMoverCard}>
                    <SkeletonBlock width={30} height={30} radius={15} />
                    <View style={styles.skeletonGap8} />
                    <SkeletonBlock width={'65%'} height={12} radius={6} />
                    <View style={styles.skeletonGap16} />
                    <SkeletonBlock width={'45%'} height={14} radius={6} />
                    <View style={styles.skeletonGap8} />
                    <SkeletonBlock width={'55%'} height={10} radius={6} />
                </View>
            </View>
        </View>
    );
}

export function NewsListSkeleton() {
    return (
        <View style={styles.newsCard}>
            {[1, 2, 3].map((item, index) => (
                <View key={item}>
                    <View style={styles.skeletonNewsRow}>
                        <SkeletonBlock width={70} height={70} radius={10} />
                        <View style={styles.skeletonNewsContent}>
                            <SkeletonBlock width={'80%'} height={12} radius={6} />
                            <View style={styles.skeletonGap8} />
                            <SkeletonBlock width={'65%'} height={12} radius={6} />
                            <View style={styles.skeletonGap8} />
                            <SkeletonBlock width={'40%'} height={10} radius={6} />
                        </View>
                    </View>
                    {index !== 2 ? <View style={styles.newsSeparator} /> : null}
                </View>
            ))}
        </View>
    );
}

export default function ExploreSkeleton() {
    return (
        <View style={styles.mainView}>
            <BotCardSkeleton />

            <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionHeaderLeft}>
                    <SkeletonBlock width={22} height={22} radius={6} />
                    <View style={{ width: scaler(5) }} />
                    <SkeletonBlock width={90} height={16} radius={6} />
                </View>
            </View>

            <View style={styles.moverTabsRow}>
                <SkeletonBlock width={72} height={28} radius={16} />
                <View style={{ width: scaler(10) }} />
                <SkeletonBlock width={72} height={28} radius={16} />
                <View style={{ flex: 1 }} />
                <SkeletonBlock width={80} height={28} radius={16} />
            </View>

            <MoversGridSkeleton />

            <View style={[styles.sectionHeaderRow, { marginTop: scaler(4) }]}>
                <View style={styles.sectionHeaderLeft}>
                    <SkeletonBlock width={22} height={22} radius={6} />
                    <View style={{ width: scaler(5) }} />
                    <SkeletonBlock width={70} height={16} radius={6} />
                </View>
            </View>

            <NewsListSkeleton />
        </View>
    );
}