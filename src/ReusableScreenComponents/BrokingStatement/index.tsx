import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import scaler from '../../Utils/scaler';
import { mainColors } from '../../Utils/helper';
import { Images } from '../../Assets';
import IconButton from '../../ReusableComponents/iconButton';
import { FilterTab, RowItem } from './types';
import { styles } from './styles';

const BrokingStatement = () => {
    const [activeFilterTab, setActiveFilterTab] = useState('All')
    const listRef = useRef(null)

    const tabs = useMemo<FilterTab[]>(
        () => [
            { id: 'f1', label: 'All', count: 4 },
            { id: 'f2', label: 'Funds', count: 1 },
            { id: 'f3', label: 'Trades', count: 2 },
            { id: 'f4', label: 'Pledges', count: 3 },
        ],
        [],
    )

    const renderItem = ({ item }: { item: FilterTab }) => {
        const isActive = activeFilterTab === item.label

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveFilterTab(item.label)}
                style={styles.tabTouch}
            >
                <View style={styles.tabRow}>
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                        {item.label}
                    </Text>

                    <View style={[styles.countPill, isActive ? styles.countPillActive : styles.countPillInactive]}>
                        <Text style={styles.countText}>
                            {String(item.count).padStart(2, '0')}
                        </Text>
                    </View>
                </View>

                <View style={[styles.underline, isActive ? styles.underlineActive : styles.underlineInactive]} />
            </TouchableOpacity>
        )
    }
    const pledgeRows: RowItem[] = [
        {
            id: 'p1',
            title: 'Pledge/Unpledge charges',
            subtitle: 'Charge for pledging/unpledging\nportfolio stock(s)',
            amount: '-₹2,230.00',
            amountType: 'debit',
            icon: Images.moneyPuse, // <-- use your actual icon from assets
        },
        {
            id: 'p2',
            title: 'Pledge/Unpledge charges',
            subtitle: 'Charge for pledging/unpledging\nportfolio stock(s)',
            amount: '-₹2,230.00',
            amountType: 'debit',
            icon: Images.moneyPuse, // <-- use your actual icon from assets
        },
    ]

    const renderPledgeRow = ({ item }: { item: RowItem }) => {
        const isDebit = item.amountType === 'debit'

        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.rowWrap}>
                {/* Left icon square */}
                <View>
                    <Image
                        source={item.icon ?? Images.bankLogo}
                        resizeMode="contain"
                        style={styles.leftIcon}
                    />
                </View>

                {/* Middle text */}
                <View style={styles.midWrap}>
                    <Text style={styles.rowTitle}>{item.title}</Text>
                    <Text style={styles.rowSubTitle}>{item.subtitle}</Text>
                </View>

                {/* Right amount + chevron */}
                <View style={styles.rightWrap}>
                    <Text style={[styles.rowAmount, isDebit ? styles.amountDebit : styles.amountCredit]}>
                        {item.amount}
                    </Text>

                    <IconButton
                        vectorType="MaterialCommunityIcons"
                        name="chevron-right"
                        size={scaler(20)}
                        color={mainColors.inputLabel}
                        style={{ marginLeft: scaler(6) }}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ height: scaler(580) }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Header Section */}
                    <View style={styles.ledgerSection}>
                        <Text style={styles.totalBalanceText}>Combined Ledger Balance</Text>
                        <Text style={styles.totalBalanceText}>₹23,22,574.11</Text>
                    </View>

                    {/* Broking Ledger Section */}
                    <View style={styles.ledgerSection}>
                        <Text style={styles.ledgerLabel}>Broking Ledger</Text>
                        <Text style={styles.ledgerLabel}>₹23,22,574.11</Text>
                    </View>

                    {/* MTF Ledger Section */}
                    <View style={styles.ledgerSection}>
                        <Text style={styles.ledgerLabel}>MTF Ledger</Text>
                        <Text style={styles.ledgerLabel}>₹20,000.00</Text>
                    </View>
                    <View style={styles.notificationView}>
                        <IconButton
                            vectorType="MaterialCommunityIcons"
                            name="information-outline"
                            size={scaler(25)}
                            color={mainColors.warningIcon}
                        />
                        <Text style={styles.notificationText}>{`A charge of ₹1,000.00 will be posted to your${'\n'} ledger soon`}</Text>
                    </View>
                    <View style={styles.doneView}>
                        <Text style={styles.doneText}>Transactions done today are till 5:30 AM. remaining
                            will reflect tomorrow.</Text>
                    </View>
                    <View style={styles.wrap}>
                        <FlatList
                            ref={listRef}
                            data={tabs}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.content}
                            onScrollToIndexFailed={() => { }}
                        />
                        <View style={styles.bottomLine} />
                    </View>
                    <View style={[styles.ledgerSection, { marginTop: scaler(15) }]}>
                        <Text style={styles.todayText}>Today</Text>
                        <View style={styles.lastUpdatedView}>
                            <Text style={styles.latUpdatedText}>Last updated at 12:00 am.</Text>
                        </View>
                    </View>
                    <View style={[styles.ledgerSection, { marginTop: scaler(5) }]}>
                        <Text style={styles.closingText}>Closing Balance: </Text>
                        <Text style={styles.closingValue}>₹23,22,574,11</Text>
                    </View>
                    <View style={styles.lineHeight} />
                    <FlatList
                        data={pledgeRows}
                        keyExtractor={(item) => item.id}
                        renderItem={renderPledgeRow}
                        ItemSeparatorComponent={() => <View style={styles.itemDivider} />}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={styles.lineHeight} />
                    <View style={[styles.ledgerSection, { marginTop: scaler(15) }]}>
                        <Text style={styles.todayText}>12 Jan 2026</Text>
                    </View>
                    <View style={[styles.ledgerSection, { marginTop: scaler(5) }]}>
                        <Text style={styles.closingText}>Closing Balance: </Text>
                        <Text style={styles.closingValue}>₹23,22,574,11</Text>
                    </View>
                    <View style={styles.lineHeight} />
                    <FlatList
                        data={pledgeRows}
                        keyExtractor={(item) => item.id}
                        renderItem={renderPledgeRow}
                        ItemSeparatorComponent={() => <View style={styles.itemDivider} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default BrokingStatement