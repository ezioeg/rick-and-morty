import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootStackNavigator';
import {useEpisodeById} from '../../graphql/hooks/useEpisodeById';

type EpisodeDetailRouteProp = RouteProp<RootStackParamList, 'EpisodeDetail'>;

function EpisodeDetailScreen() {
  const {params} = useRoute<EpisodeDetailRouteProp>();
  const {id} = params;

  const {data, loading, error} = useEpisodeById(id);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando episodio...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error al cargar episodio: {error.message}</Text>
      </View>
    );
  }

  const episode = data?.episode;

  if (!episode) {
    return (
      <View style={styles.center}>
        <Text>Episodio no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{episode.name}</Text>

      <Text style={styles.label}>
        Fecha de emisión: <Text style={styles.value}>{episode.air_date}</Text>
      </Text>

      <Text style={styles.label}>
        Código del episodio: <Text style={styles.value}>{episode.episode}</Text>
      </Text>

      <Text style={styles.subtitle}>
        Personajes que aparecen en el episodio:
      </Text>
      <FlatList
        data={episode.characters}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={styles.characterItem}>
            <Image source={{uri: item.image}} style={styles.image} />
            <View style={styles.characterInfo}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text style={styles.characterSpecies}>{item.species}</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'normal',
  },
  subtitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontWeight: 'bold',
  },
  characterSpecies: {
    color: '#555',
  },
});

export default EpisodeDetailScreen;
