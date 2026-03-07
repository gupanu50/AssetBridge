import React from 'react';
import {
    Modal,
    Pressable,
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { NotificationTypeProps } from './types';
import { s } from './styles';
import useNotiDataQuery from './Hooks/useGetNotiQuery';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import useReadNotiMutation from './Hooks/useReadNotificationMutation';

type Props = {
    visible: boolean;
    onClose: () => void;

    /**
     * Where the popover should start from top.
     * Put it just below your header height.
     */
    topOffset?: number;

    /**
     * Arrow position from right (to align under bell icon).
     */
    arrowRightOffset?: number;
};

// const notiData: NotificationTypeProps[] = [
//     {
//         id: 1,
//         heading: 'What is Lorem Ipsum?',
//         desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//         time: '15 Minutes ago',
//         isRead: false,
//     },
//     {
//         id: 2,
//         heading: 'What is Lorem Ipsum?',
//         desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//         time: '20 Minutes ago',
//         isRead: false,
//     },
//     {
//         id: 3,
//         heading: 'What is Lorem Ipsum?',
//         desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//         time: '31 Minutes ago',
//         isRead: true,
//     },
//     {
//         id: 4,
//         heading: 'What is Lorem Ipsum?',
//         desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//         time: '1 Hour ago',
//         isRead: true,
//     },
//     {
//         id: 5,
//         heading: 'What is Lorem Ipsum?',
//         desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//         time: '3 Hours ago',
//         isRead: true,
//     },
//     {
//         id: 6,
//         heading: 'What is Lorem Ipsum?',
//         desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
//         time: '5 Hours ago',
//         isRead: true,
//     },
// ];


const NotificationsModal = ({
    visible,
    onClose,
    topOffset = scaler(100),          // adjust as per your header
    arrowRightOffset = scaler(18),   // adjust to match bell icon position
}: Props) => {
    const { data } = useNotiDataQuery();
    const { mutate } = useReadNotiMutation();
    // console.log('NotiData', data?.data?.data);
    const notiData = data?.data?.data || [];
    const handleNotiPress = (item: NotificationTypeProps) => {
        if (!item.is_read) {
            mutate({ id: item.id });
        }
    };
    const renderNotiData = ({ item }: { item: NotificationTypeProps }) => {
        const opacity = item.is_read ? 0.4 : 1;

        return (
            <TouchableOpacity onPress={() => handleNotiPress(item)}>
                <View style={s.flexView}>
                    <Text style={[s.headingText, { opacity }]}>
                        {item.title}
                    </Text>

                    <Text style={[s.timeText, { opacity }]}>
                        {moment(item.created_at).fromNow()}
                    </Text>
                </View>

                <Text style={[s.descText, { opacity }]} numberOfLines={2}>
                    {item.message}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={s.backdrop} pointerEvents="box-none">
                {/* ✅ Tap outside to close */}
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

                {/* ✅ Popover container - allow interactions inside */}
                <View style={s.popoverWrapper} pointerEvents="box-none">
                    {/* Arrow */}
                    <View style={[s.arrow, { right: arrowRightOffset, top: topOffset - scaler(10) }]} />

                    {/* Popover box */}
                    <View style={[s.popover, { top: topOffset }]}>
                        <FlatList
                            data={notiData}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={renderNotiData}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={s.lineSeperator} />}
                            contentContainerStyle={{ paddingBottom: scaler(6) }}
                            style={{ flex: 1 }}
                            scrollEnabled
                            nestedScrollEnabled // ✅ important for Android sometimes
                            keyboardShouldPersistTaps="handled"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
export default NotificationsModal;