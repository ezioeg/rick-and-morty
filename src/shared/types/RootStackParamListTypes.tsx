import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  TabNavigator: undefined;
  CharacterDetail: {id: string};
  EpisodeDetail: {id: string};
};

export type CharacterDetailRouteProp = RouteProp<
  RootStackParamList,
  'CharacterDetail'
>;

export type EpisodeDetailRouteProp = RouteProp<
  RootStackParamList,
  'EpisodeDetail'
>;
