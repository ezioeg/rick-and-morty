import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CharacterListScreen from '../screens/CharacterList';
import EpisodeListScreen from '../screens/EpisodeList';
import HomeIcon from '../assets/icons';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {},
  tabBarShowLabel: false,
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName="CharacterList">
      <Tab.Screen
        name="CharacterList"
        component={CharacterListScreen}
        options={{
          tabBarIcon: ({color, size}) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="EpisodeList"
        component={EpisodeListScreen}
        options={{
          tabBarIcon: ({color, size}) => <HomeIcon size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
