import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
//import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WashingListsScreen from '../screens/WashingListsScreen';
import CardGamesScreen from '../screens/CardGamesScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Hjem',
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
  },
  tabBarIcon: ({ focused }) => (
    <Image
        source={focused? require('../assets/images/tabbar_logo_orange.png') : require('../assets/images/tabbar_logo.png')}
        fadeDuration={0}
        style={{width: 26, height: 26}}
      />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Innstillinger',
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const WashingListsStack = createStackNavigator({
  WashingLists: WashingListsScreen,
});

WashingListsStack.navigationOptions = {
  tabBarLabel: 'Vaskelister',
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
    />
  ),
};

const CardGamesStack = createStackNavigator({
  CardGames: CardGamesScreen,
});

CardGamesStack.navigationOptions = {
  tabBarLabel: 'Poengoversikt',
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'logo-game-controller-a' : 'logo-game-controller-a'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  WashingListsStack,
  CardGamesStack,
  SettingsStack,
});
