import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CharacterListScreen from '../screens/CharacterList';
import EpisodeListScreen from '../screens/EpisodeList';
import CharactersIcon from '../assets/icons/CharactersIcon';
import EpisodesIcon from '../assets/icons/EpisodesIcon';

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
          tabBarIcon: CharactersIcon,
        }}
      />
      <Tab.Screen
        name="EpisodeList"
        component={EpisodeListScreen}
        options={{
          tabBarIcon: EpisodesIcon,
        }}
      />
    </Tab.Navigator>
  );
}
