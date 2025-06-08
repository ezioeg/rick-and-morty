import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useEpisodes} from '../../graphql/hooks/useEpisodes';

function EpisodeListScreen() {
  const {data, loading, error} = useEpisodes(1);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando episodios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error al cargar episodios: {error.message}</Text>
      </View>
    );
  }

  const episodes = data?.episodes?.results ?? [];

  return (
    <View style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.airDate}>{item.air_date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  airDate: {
    color: '#777',
  },
});

export default EpisodeListScreen;
