import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import IconButton from '../../ReusableComponents/iconButton';
import scaler from '../../Utils/scaler';
import { mainColors } from '../../Utils/helper';
import { Images } from '../../Assets';
import CommonButton from '../../ReusableComponents/commonButton';
import { styles } from './styles';

const FundsAddedComponent = () => {
    const transactionData = [
        {
            id: '1',
            date: '13 January 2026 at 07:03 pm',
            bank: 'HDFC Bank LTD',
            account: '**25**6399',
            amount: '₹10,000.00',
            img: Images.upiLogo,
            status: 'Success',
            message: '',
        },
        {
            id: '2',
            date: '10 January 2026 at 12:25 am',
            bank: 'HDFC Bank LTD',
            account: '**25**6399',
            img: Images.gPay,
            amount: '₹5,000.00',
            status: 'Failed',
            message: 'The transaction was not completed with the specified time. Please try again.',
        },
        {
            id: '3',
            date: '05 January 2026 at 10:11 pm',
            bank: 'HDFC Bank LTD',
            img: Images.upiLogo,
            account: '**25**6399',
            amount: '₹10,000.00',
            status: 'Success',
            message: '',
        },
        {
            id: '4',
            date: '01 January 2026 at 09:45 am',
            bank: 'HDFC Bank LTD',
            account: '**25**6399',
            img: Images.gPay,
            amount: '₹5,000.00',
            status: 'Failed',
            message: 'The transaction was not completed with the specified time. Please try again.',
        },
    ];
    const renderTransactionItem = ({ item }: any) => (
        <View style={styles.transactionContainer}>
            <Text style={styles.timeText}>{item.date}</Text>
            <View style={styles.flexView}>
                <Image source={item.img} resizeMode="contain" style={styles.bankLogo} />
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>{item.bank}</Text>
                    <Text style={styles.accountText}>{item.account}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.valueText}>{item.amount}</Text>
                    <View style={item.status === 'Success' ? styles.successView : styles.failedView}>
                        <IconButton
                            vectorType={item.status === 'Success' ? 'MaterialCommunityIcons' : 'EvilIcons'}
                            name={item.status === 'Success' ? 'check-circle-outline' : 'exclamation'}
                            color={item.status === 'Success' ? mainColors.greenText : mainColors.redText}
                            size={scaler(16)}
                        />
                        <Text style={item.status === 'Success' ? styles.successText : styles.failedText}>
                            {item.status}
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
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={transactionData}
                    renderItem={renderTransactionItem}
                    scrollEnabled={false}
                    ItemSeparatorComponent={<View style={styles.lineView} />}
                    keyExtractor={(item: any) => item.id}
                    contentContainerStyle={styles.listContentContainer}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.lineView} />
                <CommonButton
                    label='View all transactions' backgroundColor={mainColors.black}
                    textColor={mainColors.mainButton} extraStyle={{ marginVertical: scaler(15) }}
                />
            </ScrollView>
        </View>
    )
}

export default FundsAddedComponent