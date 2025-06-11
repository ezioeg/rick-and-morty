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

          <View style={styles.propertiesContainer}>
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>
                {t('episodeDetail.episodeCode')}
              </Text>
              <Text style={styles.propertyValue}>{episode.episode}</Text>
            </View>
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>
                {t('episodeDetail.airDate')}
              </Text>
              <Text style={styles.propertyValue}>{episode.air_date}</Text>
            </View>
          </View>

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
              <Text style={styles.characterSpecies}>
                {item.species.toUpperCase()}
              </Text>
              <View style={styles.statusGenderRow}>
                <Text style={styles.characterStatus}>{item.status}</Text>
                <Text style={styles.characterGender}>{item.gender}</Text>
              </View>
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
  propertiesContainer: {
    backgroundColor: currentTheme.colors.background,
    padding: currentTheme.spacing.lg,
    borderRadius: currentTheme.border.radius * 2,
  },

  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: currentTheme.colors.background,
    paddingVertical: currentTheme.spacing.sm,
    borderRadius: currentTheme.border.radius,
  },

  propertyLabel: {
    fontWeight: 'bold',
    color: currentTheme.colors.textSecondary,
  },

  propertyValue: {
    color: currentTheme.colors.textPrimary,
    fontWeight: '500',
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
  statusGenderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  characterSpecies: {
    color: currentTheme.colors.textSecondary,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  characterStatus: {
    color: currentTheme.colors.textSecondary,
  },
  characterGender: {
    color: currentTheme.colors.textSecondary,
  },
});

export default EpisodeDetailScreen;
