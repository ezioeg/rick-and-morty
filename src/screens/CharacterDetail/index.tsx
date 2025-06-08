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
import {useCharacterById} from '../../graphql/hooks/useCharacterById';

type CharacterDetailRouteProp = RouteProp<
  RootStackParamList,
  'CharacterDetail'
>;

function CharacterDetailScreen() {
  const {params} = useRoute<CharacterDetailRouteProp>();
  const {id} = params;

  const {data, loading, error} = useCharacterById(id);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando personaje...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error al cargar personaje: {error.message}</Text>
      </View>
    );
  }

  const character = data?.character;

  if (!character) {
    return (
      <View style={styles.center}>
        <Text>Personaje no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{character.name}</Text>
      <Image source={{uri: character.image}} style={styles.image} />

      <Text style={styles.label}>
        Especie: <Text style={styles.value}>{character.species}</Text>
      </Text>
      <Text style={styles.label}>
        Género: <Text style={styles.value}>{character.gender}</Text>
      </Text>
      <Text style={styles.label}>
        Estado: <Text style={styles.value}>{character.status}</Text>
      </Text>

      <Text style={styles.label}>
        Ubicación:{' '}
        <Text style={styles.value}>
          {character.location.name} - {character.location.type}
        </Text>
      </Text>

      <Text style={styles.subtitle}>Episodios en los que ha aparecido:</Text>
      <FlatList
        data={character.episode}
        keyExtractor={ep => ep.id}
        renderItem={({item}) => (
          <View style={styles.episodeItem}>
            <Text style={styles.episodeTitle}>{item.name}</Text>
            <Text style={styles.episodeAirDate}>{item.air_date}</Text>
          </View>
        )}
        scrollEnabled={false} // para que no interfiera con el ScrollView principal
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
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
  episodeItem: {
    marginTop: 8,
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#555',
  },
  episodeTitle: {
    fontWeight: 'bold',
  },
  episodeAirDate: {
    color: '#555',
  },
});

export default CharacterDetailScreen;
