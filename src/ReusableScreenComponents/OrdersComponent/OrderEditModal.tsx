import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EditModalProps } from './types'
import scaler from '../../Utils/scaler'
import IconButton from '../../ReusableComponents/iconButton'
import { fontFamily, getApiErrorMessage, mainColors } from '../../Utils/helper'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import CommonButton from '../../ReusableComponents/commonButton'
import useEditOrderMutation from './Hooks/useEditOrderMutation'
import snackbarHandler from '../../Utils/snackbarHandler'
import { Images } from '../../Assets'

const OrderEditModal = (props: EditModalProps) => {
    // console.log('PropsSelectedItemEditModal', props?.selectedItem)
    const seletedData = props?.selectedItem;
    const { mutate } = useEditOrderMutation();
    const [value, setValue] = useState<any>();
    const [valueQuamtity, setValueQuantity] = useState<any>()
    useEffect(() => {
        setValue(seletedData?.limit_price || '');
        setValueQuantity(seletedData?.quantity || '');
    }, [seletedData]);
    const submitPress = () => {
        mutate({
            id: seletedData?.id || 0,
            limit_price: Number(value),
            quantity: Number(valueQuamtity),
        }, {
            onSuccess: () => {
                snackbarHandler.successToast('Order Edit Successfully');
                props?.setVisible(false)
            },
            onError: (err) => {
                const message = getApiErrorMessage(err);
                snackbarHandler.errorToast(message);
                props?.setVisible(false)
            }
        })
    };
    const bumpMarketPrice = (delta: number) => {
        setValue((prev: any) => {
            const n =
                typeof prev === 'number'
                    ? prev
                    : parseFloat(String(prev).replace(/[^\d.]/g, '')) || 0;

            const next = n + delta;
            return next < 0 ? 0 : next; // prevent negative
        });
    };
    const bumpMarketPrice1 = (delta: number) => {
        setValueQuantity((prev: any) => {
            const n =
                typeof prev === 'number'
                    ? prev
                    : parseFloat(String(prev).replace(/[^\d.]/g, '')) || 0;

            const next = n + delta;
            return next < 0 ? 0 : next; // prevent negative
        });
    };
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
                    {/* <CommonTextInput value={String(value)} setValue={setValue} containerStyle={styles.input} /> */}
                    <View style={styles.imgView}>
                        <TouchableOpacity onPress={() => bumpMarketPrice(-1)}>
                            <Image source={Images.decrease} resizeMode='contain' style={styles.img} />
                        </TouchableOpacity>
                        <CommonTextInput
                            value={String(value)}
                            setValue={setValue}
                            keyboardType='numeric'
                            style={styles.onlyWidth}
                            containerStyle={styles.inputContainerStyle}
                        />
                        <TouchableOpacity onPress={() => bumpMarketPrice(+1)}>
                            <Image source={Images.increase} resizeMode='contain' style={styles.img} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.labelText}>Quantity</Text>
                    {/* <CommonTextInput value={String(valueQuamtity)} setValue={setValueQuantity} containerStyle={styles.input} /> */}
                    <View style={styles.imgView}>
                        <TouchableOpacity onPress={() => bumpMarketPrice1(-1)}>
                            <Image source={Images.decrease} resizeMode='contain' style={styles.img} />
                        </TouchableOpacity>
                        <CommonTextInput
                            value={String(valueQuamtity)}
                            setValue={setValueQuantity}
                            keyboardType='numeric'
                            style={styles.onlyWidth}
                            containerStyle={styles.inputContainerStyle}
                        />
                        <TouchableOpacity onPress={() => bumpMarketPrice1(+1)}>
                            <Image source={Images.increase} resizeMode='contain' style={styles.img} />
                        </TouchableOpacity>
                    </View>
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
        height: scaler(300),
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
    },
    imgView: {
        flexDirection: 'row'
    },
    inputContainerStyle: {
        height: scaler(50),
        width: scaler(150),
        marginHorizontal: scaler(5)
    },
    onlyWidth: {
        width: '100%',
        color: mainColors.white
    },
    img: {
        height: scaler(50),
        width: scaler(60)
    },
})