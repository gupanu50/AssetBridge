import { Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonButton from '../../ReusableComponents/commonButton'
import CommonDrawerBackHeader from '../../ReusableComponents/commonDrawerBackHeader'
import { styles } from './styles'
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes'
import useContactMutation from './Hooks/useContactMutation'
import snackbarHandler from '../../Utils/snackbarHandler'
import { onError } from '../../Utils/helper'
import scaler from '../../Utils/scaler'
type Props = MainStackScreenProps<'ContactUs'>;
const ContactUsScreen = ({ navigation }: Props) => {
    const [value, setValue] = React.useState('');
    const [valueError, setValueError] = useState('');
    const { mutate } = useContactMutation();
    const [message, setMessage] = React.useState('');
    const [messageError, setMessageError] = useState('');
    const btnPressed = () => {
        if (!value) {
            setValueError('Please enter subject');
        } else if (!message) {
            setMessageError('Please enter message');
        }
        mutate({
            message: message,
            subject: value,
            email: 'guest@example.com'
        }, {
            onSuccess: () => {
                snackbarHandler.successToast('Message sent successfully');
            },
            onError: (er: any) => {
                console.log('Error', er)
            }
        })
    }
    return (
        <View style={styles.conatiner}>
            <View style={styles.main}>
                <CommonDrawerBackHeader title='Contact US' navigation={navigation} />
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ flexGrow: 1 }}
                    enableOnAndroid={true}
                    extraScrollHeight={20}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.assitText}>We’re here to assist you! </Text>
                    <Text style={styles.anyText}>If you have any questions or need assistance, please feel free to reach out to us.</Text>
                    <Text style={styles.anyText}>You can also email us.</Text>
                    <Text style={styles.mailText}>contact@myassetbridge.com</Text>
                    <View style={styles.lineView} />
                    <Text style={styles.assitText}>Write a Message</Text>
                    <Text style={styles.subjectText}>Subject</Text>
                    <CommonTextInput value={value} setValue={(text) => { setValueError(''); setValue(text) }} placeholder='e.g. Elon Musk' errorMessage={valueError} />
                    <Text style={styles.messageText}>Your Message</Text>
                    <CommonTextInput
                        value={message}
                        setValue={(text) => { setMessageError(''); setMessage(text) }}
                        placeholder='e.g. Elon Musk'
                        multiline={true}
                        errorMessage={messageError}
                        containerStyle={styles.messageContainerStyle} />
                    <CommonButton label='Send Message' onPress={() => btnPressed()} extraStyle={{ marginTop: scaler(35) }} />
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

export default ContactUsScreen