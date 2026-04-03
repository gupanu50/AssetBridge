import { View } from 'react-native'
import React from 'react'
import CommonDrawerBackHeader from '../../ReusableComponents/commonDrawerBackHeader'
import { styles } from './styles'
import FundsAddedComponent from '../../ReusableScreenComponents/FundsAddedTransactionHistory'
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes'
type Props = MainStackScreenProps<'TransactionHistory'>;
const TransactionHistoryScreen = ({ navigation }: Props) => {
    // const [activeTopTab, setActiveTopTab] = useState('Funds Added');

    // const topTabListRef: any = useRef(null);
    // const renderTopTab = ({ item, index }: { item: TopTabProps; index: number }) => {
    //     const isActive = activeTopTab === item.label;
    //     return (
    //         <CommonTabSlider
    //             activeTab="Funds Added"
    //             index={index}
    //             label={item?.label}
    //             style={styles.sliderView}
    //             isRightText={item?.isRightText}
    //             isActive={isActive}
    //             setIsActive={setActiveTopTab}
    //         />
    //     );
    // };
    // const topTabs = useMemo(
    //     () => [
    //         { id: 't1', label: 'Funds Added', isRightText: false },
    //         { id: 't2', label: 'Funds Withdrawal', isRightText: false },
    //     ],
    //     [],
    // );
    return (
        <View style={styles.conatiner}>
            <View style={styles.main}>
                <CommonDrawerBackHeader title='Transaction History' isShowInfoIcon={false} navigation={navigation} />
                {/* <View style={styles.topTabsWrap}>
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
                </View> */}
                {/* <View style={styles.searchView}>
                    <Image source={Images.search} resizeMode='contain' style={styles.searchImg} />
                    <Text style={styles.searchText}>Search transactions by bank or amount</Text>
                    <TouchableOpacity style={styles.settingsTouch}>
                        <Image
                            source={Images.settingsWatchlist}
                            resizeMode="contain"
                            style={styles.settingsImg}
                        />
                    </TouchableOpacity>
                </View> */}
                {/* {activeTopTab === 'Funds Wihdrawal' && <FundsWithdrawalComponent />} */}
                <FundsAddedComponent />
            </View>
        </View>
    )
}

export default TransactionHistoryScreen