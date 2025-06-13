import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Episode} from '@features/episodes/services/graphql/useEpisodes';
import {currentTheme} from '@theme';
import {RootStackParamList} from '@shared/types/RootStackParamListTypes';

const EpisodeCardMain = ({episode}: {episode: Episode}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () =>
    navigation.navigate('EpisodeDetail', {id: episode.id});

  return (
    <TouchableOpacity onPress={handlePress} testID="episode-card-touchable">
      <View style={styles.item}>
        <View style={styles.headerRow}>
          <Text style={styles.episode}>{episode.episode}</Text>
          <Text style={styles.airDate}>{episode.air_date}</Text>
        </View>
        <Text style={styles.title}>{episode.name}</Text>
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
  item: {
    marginBottom: currentTheme.spacing.lg,
    padding: currentTheme.spacing.md,
    borderRadius: currentTheme.border.radius * 2,
    backgroundColor: currentTheme.colors.background,
    shadowColor: currentTheme.colors.shadowColor,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  episode: {
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  airDate: {
    fontSize: currentTheme.typography.subtitle,
    color: currentTheme.colors.textSecondary,
  },
  title: {
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
});

export default memo(EpisodeCardMain, areEqual);
