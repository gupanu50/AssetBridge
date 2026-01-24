import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CommonDrawerBackHeader from '../../ReusableComponents/commonDrawerBackHeader'
import { mainColors } from '../../Utils/helper'
import scaler from '../../Utils/scaler'
import { Images } from '../../Assets'
import { FlatData } from './types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import IconButton from '../../ReusableComponents/iconButton'
import CommonButton from '../../ReusableComponents/commonButton'
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes'
import { styles } from './styles'
type Props = MainStackScreenProps<'PaymentMethod'>;
const PaymentMethodScreen = ({ navigation }: Props) => {
    const [activeDayMonthMoverTab, setActiveDayMonthMoverTab] = useState('Debit');
    const [mail, setMail] = useState('');
    const [date, setDate] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('')
    const flatData = [
        { id: 1, img: Images.debit },
        { id: 2, img: Images.credit }
    ];
    const renderItem = ({ item }: { item: FlatData }) => {
        return (
            <View style={styles.imgView}>
                <Image source={item.img} resizeMode='contain' style={styles.img} />
            </View>
        )
    }
    return (
        <View style={styles.conatiner}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.main}>
                    <CommonDrawerBackHeader title='Payment Methods' navigation={navigation} />
                    <View style={styles.flexView}>
                        <Text style={styles.existingText}>Existing Cards</Text>
                        <View
                            style={[
                                styles.moverDayMonthSegment,
                                {
                                    width: scaler(130),
                                },
                            ]}
                        >
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => setActiveDayMonthMoverTab('Debit')}
                                style={[
                                    styles.moverDaySegmentBtn,
                                    activeDayMonthMoverTab === 'Debit' &&
                                    styles.moverDayMonthSegmentBtnActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.moverDaySegmentText,
                                        activeDayMonthMoverTab === 'Debit' &&
                                        styles.moverDayMonthSegmentTextActive,
                                    ]}
                                >
                                    Debit
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => setActiveDayMonthMoverTab('Credit')}
                                style={[
                                    styles.moverDayMonthSegmentBtn,
                                    activeDayMonthMoverTab === 'Credit' &&
                                    styles.moverDayMonthSegmentBtnActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.moverDayMonthSegmentText,
                                        activeDayMonthMoverTab === 'Credit' &&
                                        styles.moverDayMonthSegmentTextActive,
                                    ]}
                                >
                                    Credit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={flatData}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.lineHeight} />
                    <Text style={styles.addText}>Add new Debit Card</Text>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        enableOnAndroid={true}
                        extraScrollHeight={20}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLable}>Debit Card Number</Text>
                            <CommonTextInput
                                value={mail}
                                setValue={setMail}
                                placeholder='0000 0000 0000 0000'
                                rightImage={
                                    <TouchableOpacity
                                        testID="togglePasswordIcon"
                                        style={styles.eyeIcon}
                                    >
                                        <IconButton
                                            onPress={() => { }}
                                            name={mail ? 'close' : 'credit-card-outline'}
                                            vectorType="MaterialCommunityIcons"
                                            size={scaler(28)}
                                            color="#999"
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                        <View style={styles.flexView}>
                            <View style={[styles.inputContainer, { width: scaler(160) }]}>
                                <Text style={styles.inputLable}>Experience Date</Text>
                                <CommonTextInput
                                    value={date}
                                    style={{ width: '90%' }}
                                    setValue={setDate}
                                    placeholder='MM/YYYY'
                                />
                            </View>
                            <View style={[styles.inputContainer, { width: scaler(160) }]}>
                                <Text style={styles.inputLable}>Security Code</Text>
                                <CommonTextInput
                                    value={code}
                                    setValue={setCode}
                                    placeholder='CVV'
                                    style={{ width: '70%' }}
                                    rightImage={
                                        <TouchableOpacity
                                            testID="togglePasswordIcon"
                                            style={styles.eyeIcon}
                                        >
                                            <IconButton
                                                onPress={() => { }}
                                                name={'information-outline'}
                                                vectorType="MaterialCommunityIcons"
                                                size={scaler(24)}
                                                color={mainColors.mainButton}
                                            />
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLable}>Cardholder’s Name</Text>
                            <CommonTextInput
                                value={name}
                                setValue={setName}
                                placeholder='e.g. Elon Musk'
                                rightImage={
                                    <TouchableOpacity
                                        testID="togglePasswordIcon"
                                        style={styles.eyeIcon}
                                    >
                                        <IconButton
                                            onPress={() => { }}
                                            name={mail ? 'close' : 'credit-card-edit'}
                                            vectorType="MaterialCommunityIcons"
                                            size={scaler(28)}
                                            color="#999"
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                        <CommonButton label='Add Card' extraStyle={styles.btnStyle} />
                    </KeyboardAwareScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

export default PaymentMethodScreen