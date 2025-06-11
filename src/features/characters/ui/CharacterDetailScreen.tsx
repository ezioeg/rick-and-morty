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
          <View style={styles.imageContainer}>
            <Image source={{uri: character.image}} style={styles.image} />
            {character.status && (
              <View
                style={[
                  styles.statusBadge,
                  character.status === 'Alive'
                    ? styles.badgeAlive
                    : character.status === 'Dead'
                    ? styles.badgeDead
                    : styles.badgeUnknown,
                ]}>
                <Text style={styles.badgeText}>
                  {character.status.toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.propertiesContainer}>
            <View style={styles.headerRow}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>
                {t('characterDetail.properties')}
              </Text>
              <View style={styles.line} />
            </View>

            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>
                {t('characterDetail.gender')}
              </Text>
              <Text style={styles.propertyValue}>{character.gender}</Text>
            </View>
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>
                {t('characterDetail.species')}
              </Text>
              <Text style={styles.propertyValue}>{character.species}</Text>
            </View>
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>
                {t('characterDetail.status')}
              </Text>
              <Text style={styles.propertyValue}>{character.status}</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <View style={styles.headerRow}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>
                {t('characterDetail.location')}
              </Text>
              <View style={styles.line} />
            </View>

            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>
                {t('characterDetail.locationName')}
              </Text>
              <Text style={styles.propertyValue}>
                {character.location.name}
              </Text>
            </View>
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>
                {t('characterDetail.locationType')}
              </Text>
              <Text style={styles.propertyValue}>
                {character.location.type}
              </Text>
            </View>
          </View>

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
            <View style={styles.episodeRow}>
              <Text style={styles.episodeTitle}>{item.episode}</Text>
              <Text style={styles.episodeAirDate}>{item.air_date}</Text>
            </View>
            <Text style={styles.episodeName}>{item.name}</Text>
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
  // === IMAGE ===
  imageContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: currentTheme.spacing.lg,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  // === STATUS BADGE ===
  statusBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingHorizontal: currentTheme.spacing.sm,
    paddingVertical: currentTheme.spacing.xs,
    borderRadius: currentTheme.border.radius,
  },
  badgeAlive: {
    backgroundColor: currentTheme.colors.aliveBadge,
  },
  badgeDead: {
    backgroundColor: currentTheme.colors.deadBadge,
  },
  badgeUnknown: {
    backgroundColor: currentTheme.colors.unknownBadge,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: currentTheme.colors.textButton,
  },
  // === EPISODE LIST ===
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
  // === SECTION SUBTITLE ===
  subtitle: {
    marginTop: currentTheme.spacing.lg,
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  // === PROPERTIES SECTION ===
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
  // === HEADERS / DIVIDERS ===
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: currentTheme.spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    marginHorizontal: currentTheme.spacing.sm,
    backgroundColor: currentTheme.colors.border,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  // === PROPERTY ROW ===
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
});

export default CharacterDetailScreen;
