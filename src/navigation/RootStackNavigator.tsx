import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CharacterDetailScreen from '../features/characters/ui/CharacterDetailScreen';
import EpisodeDetailScreen from '../features/episodes/ui/EpisodeDetailScreen';

export interface DetailScreenRouteParams {
  id?: string;
  name?: string;
  price?: string;
  description?: string;
}

export type RootStackParamList = {
  TabNavigator: undefined;
  CharacterDetail: {id: string};
  EpisodeDetail: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerBackImage: () => null,
  headerLeftContainerStyle: {},
  headerShown: false,
  headerTitle: () => null,
  headerStyle: {},
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
        />
        <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
