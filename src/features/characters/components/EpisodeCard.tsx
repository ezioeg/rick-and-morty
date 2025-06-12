import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Episode} from '@features/episodes/services/graphql/useEpisodes';
import {currentTheme} from '@theme';
import {RootStackParamList} from '@shared/types/RootStackParamListTypes';

const EpisodeCard = ({episode}: {episode: Episode}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () =>
    navigation.navigate('EpisodeDetail', {id: episode.id});

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.episodeItem}>
        <View style={styles.episodeRow}>
          <Text style={styles.episodeTitle}>{episode.episode}</Text>
          <Text style={styles.episodeAirDate}>{episode.air_date}</Text>
        </View>
        <Text style={styles.episodeName}>{episode.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

function areEqual(
  prevProps: {episode: Episode},
  nextProps: {episode: Episode},
) {
  return prevProps.episode.id === nextProps.episode.id;
}

const styles = StyleSheet.create({
  episodeItem: {
    padding: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: currentTheme.colors.border,
  },
  episodeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  episodeTitle: {
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  episodeAirDate: {
    color: currentTheme.colors.textSecondary,
  },
  episodeName: {
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
});

export default memo(EpisodeCard, areEqual);
