import { FlatList, ScrollView, Text, View } from 'react-native'
import React from 'react'
import IconButton from '../../ReusableComponents/iconButton';
import scaler from '../../Utils/scaler';
import { mainColors } from '../../Utils/helper';
import { styles } from './styles';
import useTransactionQuery from '../../Screens/ProfileScreen/Hooks/useTransactionSummary';
import moment from 'moment';
import { formatAmount, getInitials } from '../../ReusableComponents/commonFunctions';

const FundsAddedComponent = () => {
    const { data } = useTransactionQuery();
    // console.log('DataTransactionHistory', data?.data?.data?.results);
    const transactionData = data?.data?.data?.results;
    const renderTransactionItem = ({ item }: any) => (
        <View style={styles.transactionContainer}>
            <Text style={styles.timeText}>{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}</Text>
            <View style={styles.flexView}>
                <View style={styles.logoCircle}>
                    <Text style={styles.logoInitials}>{getInitials(item.bot_name)}</Text>
                </View>
                {/* <Image source={item.img} resizeMode="contain" style={styles.bankLogo} /> */}
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>{item.bot_name}</Text>
                    {/* <Text style={styles.accountText}>{item.account}</Text> */}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.valueText}>{formatAmount(item.amount)}</Text>
                    <View style={item.status === 'paid' ? styles.successView : styles.failedView}>
                        <IconButton
                            vectorType={item.status === 'paid' ? 'MaterialCommunityIcons' : 'EvilIcons'}
                            name={item.status === 'paid' ? 'check-circle-outline' : 'exclamation'}
                            color={item.status === 'paid' ? mainColors.greenText : mainColors.redText}
                            size={scaler(16)}
                        />
                        <Text style={item.status === 'paid' ? styles.successText : styles.failedText}>
                            {item.status.toUpperCase()}
                        </Text>
                    </View>
                </View>
            </View>
            {item.message && <View style={styles.transactionMessageView}>
                <IconButton
                    vectorType={'EvilIcons'}
                    name={'exclamation'}
                    color={mainColors.redText}
                    size={scaler(24)}
                />
                <Text style={styles.transactionMessage}>
                    {item.message}
                </Text>
            </View>}
        </View>
    );
    const renderEmptyComponent = () => {
        return (
            <View style={styles.emptyView}>
                <Text style={styles.emptyText}>No Data Found</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={transactionData}
                    renderItem={renderTransactionItem}
                    ListEmptyComponent={renderEmptyComponent}
                    scrollEnabled={false}
                    ItemSeparatorComponent={<View style={styles.lineView} />}
                    keyExtractor={(item: any) => item.id}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={false}
                />
                {/* <View style={styles.lineView} />
                <CommonButton
                    label='View all transactions' backgroundColor={mainColors.black}
                    textColor={mainColors.mainButton} extraStyle={{ marginVertical: scaler(15) }}
                /> */}
            </ScrollView>
        </View>
    )
}

export default FundsAddedComponent