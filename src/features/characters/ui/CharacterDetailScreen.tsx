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
import {useCharacterById} from '@features/characters/services/graphql';
import {Header, Loader, ErrorMessage} from '@shared/components';
import {
  RootStackParamList,
  CharacterDetailRouteProp,
} from '@shared/types/RootStackParamListTypes';
import {currentTheme} from '@theme';
import {useTranslation} from 'react-i18next';

function CharacterDetailScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {params} = useRoute<CharacterDetailRouteProp>();
  const {id} = params;
  const {data, loading, error} = useCharacterById(id);
  const {t} = useTranslation();

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
          <Header
            title={character.name}
            showBackButton={true}
            showRightIcon={false}
          />
          <Image source={{uri: character.image}} style={styles.image} />

          <Text style={styles.label}>
            {t('characterDetail.species')}:{' '}
            <Text style={styles.value}>{character.species}</Text>
          </Text>
          <Text style={styles.label}>
            {t('characterDetail.gender')}:{' '}
            <Text style={styles.value}>{character.gender}</Text>
          </Text>
          <Text style={styles.label}>
            {t('characterDetail.status')}:{' '}
            <Text style={styles.value}>{character.status}</Text>
          </Text>
          <Text style={styles.label}>
            {t('characterDetail.location')}:{' '}
            <Text style={styles.value}>
              {character.location.name} - {character.location.type}
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            {t('characterDetail.episodesTitle')}
          </Text>
        </View>
      }
      data={character.episode}
      keyExtractor={ep => ep.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EpisodeDetail', {id: item.id})}>
          <View style={styles.episodeItem}>
            <Text style={styles.episodeTitle}>{item.episode}</Text>
            <Text style={styles.episodeTitle}>{item.name}</Text>
            <Text style={styles.episodeAirDate}>{item.air_date}</Text>
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
  image: {
    width: 200,
    height: 200,
    borderRadius: currentTheme.border.radius,
    alignSelf: 'center',
    marginBottom: currentTheme.spacing.lg,
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
    marginTop: currentTheme.spacing.lg,
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  episodeItem: {
    padding: currentTheme.spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: currentTheme.colors.border,
  },
  episodeTitle: {
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  episodeAirDate: {
    color: currentTheme.colors.textSecondary,
  },
});

export default CharacterDetailScreen;
