import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEpisodeById} from '@features/episodes/services/graphql';
import {
  Header,
  Loader,
  ErrorMessage,
  PropertyRow,
  SectionTitle,
} from '@shared/components';
import {
  RootStackParamList,
  EpisodeDetailRouteProp,
} from '@shared/types/RootStackParamListTypes';
import {currentTheme} from '@theme';
import {useTranslation} from 'react-i18next';
import CharacterCard from '../components/CharacterCard';

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

          <View style={styles.propertiesContainer}>
            <PropertyRow
              label={t('episodeDetail.episodeCode')}
              value={episode.episode}
            />
            <PropertyRow
              label={t('episodeDetail.airDate')}
              value={episode.air_date}
            />
          </View>
          <SectionTitle text={t('episodeDetail.charactersTitle')} />
        </View>
      }
      data={episode.characters}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <CharacterCard
          character={item}
          onPress={() => navigation.navigate('CharacterDetail', {id: item.id})}
        />
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
  propertiesContainer: {
    padding: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
    borderRadius: currentTheme.border.radius * 2,
  },
});

export default EpisodeDetailScreen;
