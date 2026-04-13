import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
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
import ContactUsScreen from '../../Screens/ContactUsScreen';
import TransactionHistoryScreen from '../../Screens/TransactionHistoryScreen';
import AlgoMainScreen from '../../Screens/AlgoMainScreen';
import NoDataFoundComponent from '../../ReusableScreenComponents/NoDataFoundComponent';
import TradingViewScreen from '../../Screens/TradingViewScreen';
import MPinScreen from '../../Screens/MPin';
import MPinLoginScreen from '../../Screens/LoginMPin';
import ForgetMPINOTP from '../../Screens/ForgetMPin';
import ResetMPinScreen from '../../Screens/ResetMPin';
import { mainColors } from '../../Utils/helper';
export default function AppNavigation() {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  const AppTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: mainColors.black,
      card: mainColors.black,
      border: mainColors.black,
    },
  };
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: mainColors.black } }}
        initialRouteName="Splash"
      >
        <Stack.Group>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeTab" component={BottamTabNavigation} />
          <Stack.Screen name="WatchList" component={WatchListScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="MPin" component={MPinScreen} />
          <Stack.Screen name="LoginMPin" component={MPinLoginScreen} />
          <Stack.Screen name="LoginMPinOtp" component={ForgetMPINOTP} />
          <Stack.Screen name="ResetMPIN" component={ResetMPinScreen} />
          <Stack.Screen name="Forget" component={ForgetPassword} />
          <Stack.Screen name="Instrument" component={InstumentScreen} />
          <Stack.Screen name="OptionsChain" component={OptionsChainScreen} />
          <Stack.Screen name="MarketPlace" component={MarketPlaceScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="BuySellOrder" component={BuySellOrderScreen} />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistoryScreen}
          />
          <Stack.Screen
            name="AlgoMain"
            component={AlgoMainScreen}
          />
          <Stack.Screen
            name="TradingView"
            component={TradingViewScreen}
          />
          <Stack.Screen name="NoData" component={NoDataFoundComponent} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
