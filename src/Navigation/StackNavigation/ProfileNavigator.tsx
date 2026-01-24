import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../Screens/ProfileScreen';
import ContactUsScreen from '../../Screens/ContactUsScreen';
import { MainStackParamList } from '../NavigationTypes';
import ProfileSettingsScreen from '../../Screens/ProfileScreen/ProfileSettingsScreen';
import TransactionHistoryScreen from '../../Screens/TransactionHistoryScreen';
import StatementScreen from '../../Screens/Statement';
import PaymentMethodScreen from '../../Screens/PaymentMethodScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Stack.Screen name="Statement" component={StatementScreen} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
