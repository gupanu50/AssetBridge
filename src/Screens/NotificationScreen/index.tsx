import React from 'react';
import {
    Modal,
    Pressable,
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { fontFamily, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { NotificationTypeProps } from './types';
import { s } from './styles';

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

const notiData: NotificationTypeProps[] = [
    {
        id: 1,
        heading: 'What is Lorem Ipsum?',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        time: '15 Minutes ago',
        isRead: false,
    },
    {
        id: 2,
        heading: 'What is Lorem Ipsum?',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        time: '20 Minutes ago',
        isRead: false,
    },
    {
        id: 3,
        heading: 'What is Lorem Ipsum?',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        time: '31 Minutes ago',
        isRead: true,
    },
    {
        id: 4,
        heading: 'What is Lorem Ipsum?',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        time: '1 Hour ago',
        isRead: true,
    },
    {
        id: 5,
        heading: 'What is Lorem Ipsum?',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        time: '3 Hours ago',
        isRead: true,
    },
    {
        id: 6,
        heading: 'What is Lorem Ipsum?',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        time: '5 Hours ago',
        isRead: true,
    },
];


const NotificationsModal = ({
    visible,
    onClose,
    topOffset = scaler(100),          // adjust as per your header
    arrowRightOffset = scaler(18),   // adjust to match bell icon position
}: Props) => {
    const renderNotiData = ({ item }: { item: NotificationTypeProps }) => {
        const opacity = item.isRead ? 0.4 : 1;

        return (
            <View>
                <View style={s.flexView}>
                    <Text style={[s.headingText, { opacity }]}>
                        {item.heading}
                    </Text>

                    <Text style={[s.timeText, { opacity }]}>
                        {item.time}
                    </Text>
                </View>

                <Text style={[s.descText, { opacity }]} numberOfLines={2}>
                    {item.desc}
                </Text>
            </View>
        );
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            {/* full screen overlay - tap outside to close */}
            <Pressable style={s.backdrop} onPress={onClose}>
                {/* Stop closing when user taps inside popover */}
                <Pressable style={s.popoverWrapper}>
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
                        />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default NotificationsModal;