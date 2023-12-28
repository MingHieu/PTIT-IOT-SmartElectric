import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabParamList, RootStackParamList} from './types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from '../screen/SplashScreen';
import SignupScreen from '../screen/Signup';
import LoginScreen from '../screen/Login';
import HomeScreen from '../screen/Home';
import SettingScreen from '../screen/Setting';
import OutletListScreen from '../screen/OutletList';
import DeviceListScreen from '../screen/DeviceList';
import DeviceDetailScreen from '../screen/DeviceDetail';
import {Colors} from 'react-native-ui-lib';
import AccountScreen from '../screen/Account';
import UpdateDevice from '../screen/UpdateDevice';

const BottomTabIcons = {
  HomeScreen: <Ionicons name="home" size={23} />,
  SettingScreen: <Ionicons name="settings" size={23} />,
};
const BottomTabLabels = {
  HomeScreen: 'Trang chủ',
  SettingScreen: 'Cài đặt',
};
const Tab = createBottomTabNavigator<BottomTabParamList>();
function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.red30,
        tabBarIcon: ({color}) =>
          React.cloneElement(BottomTabIcons[route.name], {color}),
        tabBarLabel: BottomTabLabels[route.name],
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
function AppRouter() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="SignupScreen" component={SignupScreen} />
        <RootStack.Screen name="BottomTab" component={BottomTab} />
        <RootStack.Screen
          name="OutletListScreen"
          component={OutletListScreen}
        />
        <RootStack.Screen
          name="DeviceListScreen"
          component={DeviceListScreen}
        />
        <RootStack.Screen
          name="DeviceDetailScreen"
          component={DeviceDetailScreen}
        />
        <RootStack.Screen name="UpdateDevice" component={UpdateDevice} />
        <RootStack.Screen name="AccountScreen" component={AccountScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouter;
