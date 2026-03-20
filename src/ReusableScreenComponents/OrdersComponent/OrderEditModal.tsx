import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { EditModalProps } from './types'
import scaler from '../../Utils/scaler'
import IconButton from '../../ReusableComponents/iconButton'
import { fontFamily, getApiErrorMessage, mainColors } from '../../Utils/helper'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import CommonButton from '../../ReusableComponents/commonButton'
import useEditOrderMutation from './Hooks/useEditOrderMutation'
import snackbarHandler from '../../Utils/snackbarHandler'

const OrderEditModal = (props: EditModalProps) => {
    console.log('PropsSelectedItem', props?.selectedItem)
    const seletedData = props?.selectedItem;
    const { mutate } = useEditOrderMutation();
    const [value, setValue] = useState(seletedData?.limit_price);
    const [valueQuamtity, setValueQuantity] = useState(seletedData?.quantity)
    const submitPress = () => {
        mutate({
            id: seletedData?.id || 0,
            limit_price: Number(value),
            quantity: Number(valueQuamtity),
        }, {
            onSuccess: () => {
                snackbarHandler.successToast('Order Edit Successfully')
            },
            onError: (err) => {
                const message = getApiErrorMessage(err);
                snackbarHandler.errorToast(message);
            }
        })
    }
    return (
        <Modal visible={props?.visibile} transparent={true} animationType='slide'>
            <View style={styles.main}>
                <View style={styles.container}>
                    <IconButton
                        vectorType='MaterialCommunityIcons'
                        name='close'
                        onPress={() => props?.setVisible(false)}
                        color={mainColors.white}
                        style={styles.crossStyle}
                    />
                    <Text style={styles.titleText}>{seletedData?.symbol}</Text>
                    <Text style={styles.labelText}>Limit Price</Text>
                    <CommonTextInput value={value} setValue={setValue} containerStyle={styles.input} />
                    <Text style={styles.labelText}>Quantity</Text>
                    <CommonTextInput value={valueQuamtity} setValue={setValueQuantity} containerStyle={styles.input} />
                    <CommonButton label='Submit' extraStyle={{ height: scaler(40), marginTop: scaler(15) }} onPress={() => submitPress()} />
                </View>
            </View>
        </Modal>
    )
}

export default OrderEditModal

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: mainColors.dayMonthBg,
        height: scaler(280),
        width: scaler(300),
        paddingHorizontal: scaler(10),
        borderRadius: 15
    },
    crossStyle: {
        alignItems: 'flex-end',
        paddingVertical: scaler(5)
    },
    titleText: {
        color: mainColors.white,
        fontSize: scaler(15),
        fontFamily: fontFamily.poppinsMedium
    },
    labelText: {
        color: mainColors.inputLabel,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
        marginTop: scaler(10)
    },
    input: {
        height: scaler(40)
    }
})