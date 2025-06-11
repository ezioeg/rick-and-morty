import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEpisodes} from '@features/episodes/services/graphql';
import {SearchEpisodeIcon} from '@shared/components/icons';
import {Header, Loader, ErrorMessage} from '@shared/components';
import {RootStackParamList} from '@shared/types/RootStackParamListTypes';
import {currentTheme} from '@theme';
import {useTranslation} from 'react-i18next';
import {Episode} from '@features/episodes/services/graphql/useEpisodes';

function EpisodeListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();

  // Estado para acumular episodios y para paginación
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(2);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Comienza la consulta en la página 1
  const {data, loading, error, fetchMore} = useEpisodes(1);

  useEffect(() => {
    if (data?.episodes?.results) {
      // Al cargar la primera página, se inicializa el estado
      setEpisodes(data.episodes.results);
      setNextPage(data.episodes.info?.next);
    }
  }, [data]);

  const handleLoadMore = async () => {
    // Si no hay más páginas o ya se está cargando, se retorna
    if (!nextPage || isFetchingMore) {
      return;
    }

    setIsFetchingMore(true);
    try {
      const {data: moreData} = await fetchMore({
        variables: {page: nextPage},
      });
      const newResults = moreData?.episodes?.results || [];
      const newNext = moreData?.episodes?.info?.next;

      // Evitar duplicados por ID
      setEpisodes(prev => {
        const existingIds = new Set(prev.map(e => e.id));
        const filteredNew = newResults.filter(e => !existingIds.has(e.id));
        return [...prev, ...filteredNew];
      });

      setNextPage(newNext);
    } catch (e) {
      console.error('Failed to fetch more episodes', e);
    }
    setIsFetchingMore(false);
  };

  if (loading && episodes.length === 0) {
    return <Loader message={t('episodeList.loading')} />;
  }

  if (error && episodes.length === 0) {
    return <ErrorMessage message={t('episodeList.error')} />;
  }

  return (
    <View style={styles.container}>
      <Header
        title={t('episodeList.title')}
        showBackButton={false}
        showRightIcon={true}
        RightIconComponent={SearchEpisodeIcon}
      />
      <FlatList
        data={episodes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EpisodeDetail', {id: item.id})}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.episode}</Text>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.airDate}>{item.air_date}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore ? <Loader /> : null}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
  },
  item: {
    marginBottom: currentTheme.spacing.lg,
    borderRadius: currentTheme.border.radius,
    backgroundColor: currentTheme.colors.background,
  },
  title: {
    fontWeight: 'bold',
    fontSize: currentTheme.typography.subtitle,
    color: currentTheme.colors.textPrimary,
  },
  airDate: {
    color: currentTheme.colors.textSecondary,
  },
});

export default EpisodeListScreen;
