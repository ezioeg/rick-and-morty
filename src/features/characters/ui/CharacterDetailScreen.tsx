import React, {useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useCharacterById} from '@features/characters/services/graphql';
import {
  Header,
  Loader,
  ErrorMessage,
  PropertyRow,
  SectionTitle,
  SectionDivider,
  CharacterImage,
} from '@shared/components';
import {CharacterDetailRouteProp} from '@shared/types/RootStackParamListTypes';
import {currentTheme} from '@theme';
import {useTranslation} from 'react-i18next';
import EpisodeCard from '../components/EpisodeCard';
import {Episode} from '@features/episodes/services/graphql/useEpisodes';

function CharacterDetailScreen() {
  const {params} = useRoute<CharacterDetailRouteProp>();
  const {id} = params;
  const {data, loading, error} = useCharacterById(id);
  const {t} = useTranslation();

  const renderEpisodeItem = useCallback(
    ({item}: {item: Episode}) => <EpisodeCard episode={item} />,
    [],
  );

  if (loading) {
    return <Loader message={t('characterDetail.loading')} />;
  }

  if (error) {
    return <ErrorMessage message={t('characterDetail.error')} />;
  }

  const character = data?.character;
  if (!character) {
    return <ErrorMessage message={t('characterDetail.notFound')} />;
  }

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <Header title={character.name} showBackButton={true} />
          <CharacterImage
            imageUri={character.image}
            status={character.status}
          />

          <View style={styles.propertiesContainer}>
            <SectionDivider title={t('characterDetail.properties')} />

            <PropertyRow
              label={t('characterDetail.gender')}
              value={character.gender}
            />
            <PropertyRow
              label={t('characterDetail.species')}
              value={character.species}
            />
            <PropertyRow
              label={t('characterDetail.status')}
              value={character.status}
            />
          </View>
          <View style={styles.locationContainer}>
            <SectionDivider title={t('characterDetail.location')} />

            <PropertyRow
              label={t('characterDetail.locationName')}
              value={character.location.name}
            />
            <PropertyRow
              label={t('characterDetail.locationType')}
              value={character.location.type}
            />
          </View>

          <SectionTitle text={t('characterDetail.episodesTitle')} />
        </View>
      }
      data={character.episode}
      keyExtractor={ep => ep.id}
      renderItem={renderEpisodeItem}
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
  propertiesContainer: {
    padding: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
    borderRadius: currentTheme.border.radius * 2,
  },
  locationContainer: {
    marginTop: currentTheme.spacing.lg,
    padding: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
    borderRadius: currentTheme.border.radius * 2,
  },
});

export default CharacterDetailScreen;
