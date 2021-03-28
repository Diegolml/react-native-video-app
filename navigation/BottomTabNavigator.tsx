import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Icon from '../components/Icon';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import DefaultScreen from '../screens/DefaultScreen';
import { BottomTabParamList, HomeParamList, ExploreParamList, SubscriptionsParamList, LibraryParamList } from '../types';
import DetailScreen from '../screens/DetailScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="compass-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Subscriptions"
        component={SubscriptionsNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="albums-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="images-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home', headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerTitle: 'Detail', headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator<ExploreParamList>();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="ExploreScreen"
        component={DefaultScreen}
        options={{ headerTitle: 'Explore', headerShown: false }}
      />
    </ExploreStack.Navigator>
  );
}

const SubscriptionsStack = createStackNavigator<SubscriptionsParamList>();

function SubscriptionsNavigator() {
  return (
    <SubscriptionsStack.Navigator>
      <SubscriptionsStack.Screen
        name="SubscriptionsScreen"
        component={DefaultScreen}
        options={{ headerTitle: 'Subscriptions', headerShown: false }}
      />
    </SubscriptionsStack.Navigator>
  );
}

const LibraryStack = createStackNavigator<LibraryParamList>();

function LibraryNavigator() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryScreen"
        component={DefaultScreen}
        options={{ headerTitle: 'Library', headerShown: false }}
      />
    </LibraryStack.Navigator>
  );
}

