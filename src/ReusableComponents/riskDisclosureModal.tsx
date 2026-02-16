import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Dimensions, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import scaler from '../Utils/scaler';
import { fontFamily, mainColors } from '../Utils/helper';
import { Images } from '../Assets';
import CommonButton from './commonButton';

type RiskModalProps = {
    visible: boolean;
    setVisible: any;
    onPress?: () => void
}
const RiskDisclosureScreen = (props: RiskModalProps) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckBox = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props?.visible}
            onRequestClose={() => props?.setVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => props?.setVisible(false)} style={styles.closeButton}>
                        <Icon name="close" style={styles.closeIcon} />
                    </TouchableOpacity>
                    <View style={{ marginTop: scaler(35) }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={Images.risk} resizeMode='contain' style={styles.img} />
                            <Text style={styles.title}>Risk Disclosures on Derivatives</Text>
                        </View>
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            <Text style={styles.text}>
                                • 9 out of 10 individual traders in equity Futures and Options Segment incurred net losses.
                            </Text>
                            <Text style={styles.text}>
                                • On an average, loss makers registered net trading losses close to ₹50,000.
                            </Text>
                            <Text style={styles.text}>
                                • Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.
                            </Text>
                            <Text style={styles.text}>
                                • Those making net trading profits incurred between 15% to 50% of such profits as transaction costs.
                            </Text>
                            <Text style={styles.sourceText}>
                                Source: <Text style={{ color: mainColors.mainButton }}>SEBI</Text> study dated January 25, 2023 on “Analysis of Profit and Loss of Individual Traders dealing in equity Futures and Options (F&O) Segment”, wherein aggregate level findings are based on annual profit/loss incurred by individual traders in equity F&O during FY 2021–22.
                            </Text>
                        </ScrollView>
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity onPress={toggleCheckBox} style={styles.checkbox}>
                                <Icon
                                    name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                                    size={scaler(20)}
                                    color={isChecked ? mainColors.mainButton : mainColors.inputLabel}
                                />
                                <Text style={styles.checkboxText}>
                                    I accept all the <Text style={styles.link}>Terms & Conditions</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <CommonButton
                            label='Subscribe to a Bot'
                            disabled={!isChecked}
                            backgroundColor={!isChecked ? mainColors.descText : mainColors.mainButton}
                            onPress={props?.onPress}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColors.black
    },
    modalContent: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 1.1,
        backgroundColor: mainColors.googleButton,
        borderRadius: scaler(10),
        padding: scaler(20),
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: scaler(10),
        right: scaler(10),
    },
    closeIcon: {
        fontSize: scaler(20),
        color: mainColors.white,
    },
    title: {
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        color: mainColors.white,
        marginBottom: scaler(20),
    },
    text: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
        marginBottom: scaler(10),
    },
    sourceText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
        color: mainColors.white,
        marginTop: scaler(10),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(10),
        marginBottom: scaler(20),
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(12),
        color: mainColors.white,
        marginLeft: scaler(10),
    },
    link: {
        color: mainColors.mainButton,
        textDecorationLine: 'underline',
    },
    subscribeButton: {
        paddingVertical: scaler(12),
        paddingHorizontal: scaler(20),
        borderRadius: scaler(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscribeButtonText: {
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(14),
        color: mainColors.white,
    },
    disabledButton: {
        backgroundColor: '#aaa', // Disabled color
    },
    scrollView: {
        marginBottom: scaler(20),
    },
    img: {
        height: scaler(20),
        width: scaler(20),
        marginRight: scaler(10)
    }
});

export default RiskDisclosureScreen;
