import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEpisodeById} from '@features/episodes/services/graphql';
import {Header, Loader, ErrorMessage} from '@shared/components';
import {
  RootStackParamList,
  EpisodeDetailRouteProp,
} from '@shared/types/RootStackParamListTypes';
import {currentTheme} from '@theme';
import {useTranslation} from 'react-i18next';

function EpisodeDetailScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {params} = useRoute<EpisodeDetailRouteProp>();
  const {id} = params;
  const {data, loading, error} = useEpisodeById(id);
  const {t} = useTranslation();

  if (loading) {
    return <Loader message={t('episodeDetail.loading')} />;
  }

  if (error) {
    return <ErrorMessage message={t('episodeDetail.error')} />;
  }

  const episode = data?.episode;
  if (!episode) {
    return <ErrorMessage message={t('episodeDetail.notFound')} />;
  }

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <Header
            title={episode.name}
            showBackButton={true}
            showRightIcon={false}
          />

          <Text style={styles.label}>
            {t('episodeDetail.airDate')}:{' '}
            <Text style={styles.value}>{episode.air_date}</Text>
          </Text>

          <Text style={styles.label}>
            {t('episodeDetail.episodeCode')}:{' '}
            <Text style={styles.value}>{episode.episode}</Text>
          </Text>

          <Text style={styles.subtitle}>
            {t('episodeDetail.charactersTitle')}
          </Text>
        </View>
      }
      data={episode.characters}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('CharacterDetail', {id: item.id})}>
          <View style={styles.characterItem}>
            <Image source={{uri: item.image}} style={styles.image} />
            <View style={styles.characterInfo}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text style={styles.characterSpecies}>{item.species}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      style={styles.flatListContainer}
      contentContainerStyle={{
        paddingBottom: currentTheme.spacing.lg,
        backgroundColor: currentTheme.colors.background,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: currentTheme.spacing.lg,
    paddingBottom: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: currentTheme.colors.background,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: currentTheme.spacing.xs,
    color: currentTheme.colors.textPrimary,
  },
  value: {
    fontWeight: 'normal',
    color: currentTheme.colors.textSecondary,
  },
  subtitle: {
    marginTop: currentTheme.spacing.md,
    fontSize: currentTheme.typography.subtitle,
    color: currentTheme.colors.textPrimary,
    fontWeight: 'bold',
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: currentTheme.spacing.lg,
    paddingVertical: currentTheme.spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: currentTheme.colors.border,
    backgroundColor: currentTheme.colors.background,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: currentTheme.border.radius,
    marginRight: currentTheme.spacing.md,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  characterSpecies: {
    color: currentTheme.colors.textSecondary,
  },
});

export default EpisodeDetailScreen;
