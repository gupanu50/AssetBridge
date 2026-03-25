import React from 'react';
import { View } from 'react-native';
import SkeletonBlock from '../../../ReusableComponents/commonSkeletonBlock';
import { styles } from './styles';

export function OptionChainHeaderSkeleton() {
    return (
        <View style={styles.skeletonTopBar}>
            <View style={styles.skeletonBackWrap}>
                <SkeletonBlock width={36} height={36} radius={10} />
            </View>

            <View style={styles.skeletonTitleWrap}>
                <SkeletonBlock width={'45%'} height={18} radius={6} />
            </View>

            <View style={styles.skeletonDropdownWrap}>
                <SkeletonBlock width={110} height={28} radius={16} />
            </View>
        </View>
    );
}

export function OptionChainTableHeaderSkeleton() {
    return (
        <View style={styles.headerRow}>
            <View style={styles.skeletonHeaderLeft}>
                <SkeletonBlock width={52} height={12} radius={4} />
            </View>

            <View style={styles.skeletonHeaderMid}>
                <SkeletonBlock width={42} height={12} radius={4} />
            </View>

            <View style={styles.skeletonHeaderRight}>
                <SkeletonBlock width={48} height={12} radius={4} />
            </View>
        </View>
    );
}

export function OptionChainRowSkeleton() {
    return (
        <View style={styles.skeletonRowWrap}>
            <View style={styles.skeletonCellLeft}>
                <SkeletonBlock width={'55%'} height={14} radius={5} />
                <View style={styles.skeletonGap6} />
                <SkeletonBlock width={'42%'} height={12} radius={5} />
            </View>

            <View style={styles.skeletonCellMid}>
                <SkeletonBlock width={50} height={14} radius={5} />
                <View style={styles.skeletonGap6} />
                <SkeletonBlock width={70} height={3} radius={3} />
            </View>

            <View style={styles.skeletonCellRight}>
                <SkeletonBlock width={'55%'} height={14} radius={5} />
                <View style={styles.skeletonGap6} />
                <SkeletonBlock width={'42%'} height={12} radius={5} />
            </View>
        </View>
    );
}

export function OptionChainCenterBoxSkeleton() {
    return (
        <View style={styles.centerDividerRow}>
            <View style={styles.centerDividerLine} />
            <View style={styles.skeletonCenterDividerPill}>
                <SkeletonBlock width={150} height={18} radius={10} />
            </View>
            <View style={styles.centerDividerLine} />
        </View>
    );
}

export default function OptionChainSkeletonList() {
    return (
        <View style={styles.listContent}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                <React.Fragment key={item}>
                    <OptionChainRowSkeleton />
                    {index === 3 ? <OptionChainCenterBoxSkeleton /> : null}
                </React.Fragment>
            ))}
        </View>
    );
}