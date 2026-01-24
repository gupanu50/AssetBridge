import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import CommonDrawerBackHeader from '../../ReusableComponents/commonDrawerBackHeader'
import { fontFamily, mainColors } from '../../Utils/helper'
import scaler from '../../Utils/scaler'
import { TopTabProps } from '../../ReusableComponents/commonTypes'
import CommonTabSlider from '../../ReusableComponents/commonTabSlider'
import IconButton from '../../ReusableComponents/iconButton'
import BrokingStatement from '../../ReusableScreenComponents/BrokingStatement'
import MtfStatement from '../../ReusableScreenComponents/MtfStatement'
import { styles } from './styles'
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes'
type Props = MainStackScreenProps<'Statement'>;
const StatementScreen = ({ navigation }: Props) => {
    const [activeTopTab, setActiveTopTab] = useState('Broking');
    const topTabListRef: any = useRef(null);
    const renderTopTab = ({ item, index }: { item: TopTabProps; index: number }) => {
        const isActive = activeTopTab === item.label;
        return (
            <CommonTabSlider
                activeTab="Broking"
                index={index}
                label={item?.label}
                style={styles.sliderView}
                isRightNew={item?.isRightNew}
                isRightText={item?.isRightText}
                isActive={isActive}
                setIsActive={setActiveTopTab}
            />
        );
    };
    const topTabs = useMemo(
        () => [
            { id: 't1', label: 'Broking', isRightText: false, isRightNew: false },
            { id: 't2', label: 'MTF', isRightText: true, isRightNew: true },
        ],
        [],
    );
    return (
        <View style={styles.conatiner}>
            <View style={styles.main}>
                <CommonDrawerBackHeader title='Statement (Ledger)' isShowInfoIcon={true} isShowDownloadIcon={true} navigation={navigation} />
                <View style={styles.topTabsWrap}>
                    <FlatList
                        ref={topTabListRef}
                        data={topTabs}
                        keyExtractor={item => item.id}
                        renderItem={renderTopTab}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.topTabsContent}
                        onScrollToIndexFailed={() => { }}
                    />
                </View>
                <View style={styles.flexView}>
                    <Text style={styles.viewText}>Viewing for</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.viewText}>13 Jan 2026 - 13 Jan 2026</Text>
                        <IconButton
                            vectorType='MaterialCommunityIcons'
                            name='calendar-blank-outline'
                            color={mainColors.mainButton}
                            style={{ marginBottom: scaler(10) }}
                            size={scaler(15)}
                        />
                    </View>
                </View>
                {activeTopTab === 'Broking' && <View style={styles.lineView} />}
                {activeTopTab === 'Broking' && <BrokingStatement />}
                {activeTopTab === 'MTF' && <MtfStatement />}
            </View>
        </View>
    )
}

export default StatementScreen