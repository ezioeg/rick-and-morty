import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CharacterListScreen from '../features/characters/ui/CharacterListScreen';
import EpisodeListScreen from '../features/episodes/ui/EpisodeListScreen';
import {CharactersIcon} from '../shared/components/icons';
import {EpisodesIcon} from '../shared/components/icons';
import {currentTheme} from '../theme';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: currentTheme.colors.background,
  },
  tabBarActiveTintColor: currentTheme.colors.textPrimary,
  tabBarInactiveTintColor: currentTheme.colors.textSecondary,
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
