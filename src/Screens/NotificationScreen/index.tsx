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
import { getApiErrorMessage, mainColors } from '../../Utils/helper';
import scaler from '../../Utils/scaler';
import { NotificationTypeProps } from './types';
import { s } from './styles';
import useNotiDataQuery from './Hooks/useGetNotiQuery';
import moment from 'moment';
import useReadNotiMutation from './Hooks/useReadNotificationMutation';
import IconButton from '../../ReusableComponents/iconButton';
import useDeleteNotiMutation from './Hooks/useDeleteNotificationMutation';
import snackbarHandler from '../../Utils/snackbarHandler';

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


const NotificationsModal = ({
    visible,
    onClose,
    topOffset = scaler(100),          // adjust as per your header
    arrowRightOffset = scaler(18),   // adjust to match bell icon position
}: Props) => {
    const { data } = useNotiDataQuery();
    const { mutate } = useReadNotiMutation();
    const { mutate: deleteMutation } = useDeleteNotiMutation();
    // console.log('NotiData', data?.data?.data);
    const notiData = data?.data?.data || [];
    const allIds = notiData.map((i: { id: number; }) => (i.id));
    // console.log('AllIds', allIds)
    const handleNotiPress = (item: NotificationTypeProps) => {
        if (!item.is_read) {
            mutate({ id: item.id });
        }
    };
    const deletePress = (id: number) => {
        deleteMutation({
            ids: [id]
        }, {
            onSuccess: (res) => {
                // console.log('ResSingleDelete', res?.data)
                snackbarHandler.successToast('Notificaions Deleted Successfully')
            },
            onError: (err) => {
                const message = getApiErrorMessage(err);
                snackbarHandler.errorToast(message)
            }
        })
    }
    const allDeletePress = () => {
        deleteMutation({
            ids: allIds
        }, {
            onSuccess: (res) => {
                // console.log('ResAllDelete', res?.data)
                snackbarHandler.successToast('All Notifications Deleteted Successfully')
            },
            onError: (err) => {
                const message = getApiErrorMessage(err);
                snackbarHandler.errorToast(message)
            }
        })
    }
    const renderNotiData = ({ item }: { item: NotificationTypeProps }) => {
        const opacity = item.is_read ? 0.4 : 1;

        return (
            <TouchableOpacity onPress={() => handleNotiPress(item)}>
                <View style={[s.flexView, { justifyContent: 'space-between' }]}>
                    <View style={s.flexView}>
                        <Text style={[s.headingText, { opacity }]}>
                            {item.title.slice(0, 25) + "..."}
                        </Text>

                        <Text style={[s.timeText, { opacity }]}>
                            {moment(item.created_at).fromNow()}
                        </Text>
                    </View>
                    <IconButton
                        vectorType='MaterialCommunityIcons'
                        name='delete-outline'
                        color={mainColors.white}
                        style={{ opacity: opacity }}
                        onPress={() => deletePress(item?.id)}
                    />
                </View>

                <Text style={[s.descText, { opacity }]} numberOfLines={2}>
                    {item.message}
                </Text>
            </TouchableOpacity>
        );
    };
    const renderEmptyComponent = () => {
        return (
            <View style={s.emptyView}>
                <Text style={s.emptyText}>No Data Found</Text>
            </View>
        )
    }
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
                        {notiData.length > 0 && <TouchableOpacity style={s.deleetView} onPress={() => allDeletePress()}>
                            <Text style={s.deleteAllText}>Delete All</Text>
                        </TouchableOpacity>}
                        <FlatList
                            data={notiData}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={renderNotiData}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={renderEmptyComponent}
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