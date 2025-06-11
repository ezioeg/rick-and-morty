import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Episode} from '@features/episodes/services/graphql/useEpisodes';
import {currentTheme} from '@theme';

const EpisodeCard = ({
  episode,
  onPress,
}: {
  episode: Episode;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.episodeItem}>
      <View style={styles.episodeRow}>
        <Text style={styles.episodeTitle}>{episode.episode}</Text>
        <Text style={styles.episodeAirDate}>{episode.air_date}</Text>
      </View>
      <Text style={styles.episodeName}>{episode.name}</Text>
    </View>
  </TouchableOpacity>
);
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

export default EpisodeCard;
