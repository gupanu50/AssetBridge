import { Text, View } from 'react-native'
import React from 'react'
import CommonTextInput from '../../ReusableComponents/commonTextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonButton from '../../ReusableComponents/commonButton'
import CommonDrawerBackHeader from '../../ReusableComponents/commonDrawerBackHeader'
import { styles } from './styles'
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes'
type Props = MainStackScreenProps<'ContactUs'>;
const ContactUsScreen = ({ navigation }: Props) => {
    const [value, setValue] = React.useState('');
    const [message, setMessage] = React.useState('');
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
                    <CommonTextInput value={value} setValue={setValue} placeholder='e.g. Elon Musk' />
                    <Text style={styles.messageText}>Your Message</Text>
                    <CommonTextInput
                        value={message}
                        setValue={setMessage}
                        placeholder='e.g. Elon Musk'
                        multiline={true}
                        containerStyle={styles.messageContainerStyle} />
                    <CommonButton label='Send Message' />
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

export default ContactUsScreen