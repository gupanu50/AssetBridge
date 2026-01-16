import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../ReusableComponents/commonHeader'
import { fontFamily, mainColors } from '../../Utils/helper'
import { NotificationTypeProps } from './types'
import scaler from '../../Utils/scaler'
import { styles } from './styles'

const NotificationsScreen = () => {
    const notiData = [
        {
            id: 1,
            heading: "What is Lorem Ipsum?",
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            time: '15 Minutes ago',
            isRead: false
        },
        {
            id: 2,
            heading: "What is Lorem Ipsum?",
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            time: '20 Minutes ago',
            isRead: false,
        },
        {
            id: 3,
            heading: "What is Lorem Ipsum?",
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            time: '31 Minutes ago',
            isRead: true
        },
        {
            id: 4,
            heading: "What is Lorem Ipsum?",
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            time: '1 Hour ago',
            isRead: true
        },
        {
            id: 5,
            heading: "What is Lorem Ipsum?",
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            time: '3 Hours ago',
            isRead: true
        },
        {
            id: 6,
            heading: "What is Lorem Ipsum?",
            desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            time: '5 Hours ago',
            isRead: true
        }
    ];
    const renderNotiData = ({ item }: { item: NotificationTypeProps }) => {
        return (
            <View>
                <View style={styles.flexView}>
                    <Text style={[styles.headingText, { opacity: item.isRead ? 0.4 : 1 }]}>{item.heading}</Text>
                    <Text style={[styles.headingText, { opacity: item.isRead ? 0.4 : 1, marginLeft: scaler(15) }]}>{item.time}</Text>
                </View>
                <Text style={[styles.descText, { opacity: item.isRead ? 0.4 : 1 }]}>{item.desc}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <CommonHeader />
            <View style={styles.flatView}>
                <FlatList data={notiData} renderItem={renderNotiData} showsVerticalScrollIndicator={false} ItemSeparatorComponent={
                    <View style={styles.lineSeperator} />
                } />
            </View>
        </View>
    )
}

export default NotificationsScreen