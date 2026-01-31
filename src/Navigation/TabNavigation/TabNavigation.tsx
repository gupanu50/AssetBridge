import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import scaler from '../../Utils/scaler';
import { BottomStackParamList } from '../NavigationTypes';
import HomeScreen from '../../Screens/HomeScreen';
import AlgoScreen from '../../Screens/Algo';
import { fontFamily, mainColors } from '../../Utils/helper';
import WatchListScreen from '../../Screens/WatchListScreen';
import { Images } from '../../Assets';
import ProfileStackNavigator from '../StackNavigation/ProfileNavigator';
import PortfolioScreen from '../../Screens/PortfolioScreen';
import SocketBootstrap from '../../Utils/ws/socketBootstrap';

const Tab = createBottomTabNavigator<BottomStackParamList>();

const BottamTabNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <SocketBootstrap />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: mainColors.mainButton,
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: mainColors.googleButton,
            height: scaler(60),
            paddingTop: scaler(5),
            paddingBottom: 0,
          },
          tabBarItemStyle: {
            paddingBottom: 0,
            paddingTop: 0,
          },

          tabBarLabelStyle: {
            paddingBottom: 0,
            marginBottom: 0,
            fontSize: scaler(10),
            fontFamily: fontFamily.poppinsMedium,
            lineHeight: scaler(10),
          },

          tabBarIconStyle: {
            marginTop: 0,
            paddingTop: 0,
          },
          tabBarIcon: ({ color, size }) => {
            let imageName;
            if (route.name === 'Home') {
              imageName = Images.tabHome;
            } else if (route.name === 'Algo') {
              imageName = Images.tabAlgo;
            } else if (route.name === 'Watchlist') {
              imageName = Images.tabWatchlist;
            } else if (route.name === 'Profile') {
              imageName = Images.tabProfile;
            } else if (route.name === 'Portfolio') {
              imageName = Images.portfolio;
            }
            return (
              <Image
                source={imageName}
                resizeMode="contain"
                style={{
                  height: size,
                  width: size,
                  tintColor: color,
                }}
              />
            );
          },
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: scaler(10),
                fontFamily: fontFamily.poppinsMedium,
              }}
            >
              {route.name}
            </Text>
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen as React.ComponentType<any>}
        />
        <Tab.Screen
          name="Algo"
          component={AlgoScreen as React.ComponentType<any>}
        />
        <Tab.Screen
          name="Portfolio"
          component={PortfolioScreen as React.ComponentType<any>}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchListScreen as React.ComponentType<any>}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackNavigator as React.ComponentType<any>}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottamTabNavigation;