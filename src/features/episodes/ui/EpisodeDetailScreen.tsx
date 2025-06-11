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
  // === LAYOUT CONTAINERS ===
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
  // === EPISODE PROPERTIES SECTION ===
  propertiesContainer: {
    padding: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
    borderRadius: currentTheme.border.radius * 2,
  },
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: currentTheme.spacing.sm,
    backgroundColor: currentTheme.colors.background,
    borderRadius: currentTheme.border.radius,
  },
  propertyLabel: {
    fontWeight: 'bold',
    color: currentTheme.colors.textSecondary,
  },
  propertyValue: {
    fontWeight: '500',
    color: currentTheme.colors.textPrimary,
  },
  // === SUBTITLE ===
  subtitle: {
    marginTop: currentTheme.spacing.md,
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  // === CHARACTER LIST ITEM ===
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: currentTheme.spacing.lg,
    paddingVertical: currentTheme.spacing.md,
    backgroundColor: currentTheme.colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: currentTheme.colors.border,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: currentTheme.spacing.md,
    borderRadius: currentTheme.border.radius,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  characterSpecies: {
    marginTop: 2,
    textTransform: 'uppercase',
    color: currentTheme.colors.textSecondary,
  },
  statusGenderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  characterStatus: {
    color: currentTheme.colors.textSecondary,
  },
  characterGender: {
    color: currentTheme.colors.textSecondary,
  },
});

export default EpisodeDetailScreen;
