import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../Screens/SplashScreen';
import { MainStackParamList } from '../NavigationTypes';
import LoginScreen from '../../Screens/LoginScreen';
import WatchListScreen from '../../Screens/WatchListScreen';
import OtpScreen from '../../Screens/OtpScreen';
import ForgetPassword from '../../Screens/ForgetPassword';
import BottamTabNavigation from '../TabNavigation/TabNavigation';
import InstumentScreen from '../../Screens/InstumentScreen';
import OptionsChainScreen from '../../Screens/OptionsChainScreen';
import MarketPlaceScreen from '../../Screens/MarketPlaceScreen';
import OnboardScreen from '../../Screens/OnboardScreen';
import SignUpScreen from '../../Screens/SignUpScreen';
import ChangePasswordScreen from '../../Screens/ChangePassword';
import NotificationsScreen from '../../Screens/NotificationScreen';
import BuySellOrderScreen from '../../Screens/BuySellOrderScreen';
export default function AppNavigation() {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="BuySellOrder"
      >
        <Stack.Group>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeTab" component={BottamTabNavigation} />
          <Stack.Screen name="WatchList" component={WatchListScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Forget" component={ForgetPassword} />
          <Stack.Screen name="Instrument" component={InstumentScreen} />
          <Stack.Screen name="OptionsChain" component={OptionsChainScreen} />
          <Stack.Screen name="MarketPlace" component={MarketPlaceScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="BuySellOrder" component={BuySellOrderScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
