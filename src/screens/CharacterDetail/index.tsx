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
import Header from '../../components/Header';

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
        <Text>Loading character...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error loading character: {error.message}</Text>
      </View>
    );
  }

  const character = data?.character;

  if (!character) {
    return (
      <View style={styles.center}>
        <Text>Character not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title={character.name}
        showBackButton={true}
        showRightIcon={false}
      />
      <Image source={{uri: character.image}} style={styles.image} />

      <Text style={styles.label}>
        Species: <Text style={styles.value}>{character.species}</Text>
      </Text>
      <Text style={styles.label}>
        Gender: <Text style={styles.value}>{character.gender}</Text>
      </Text>
      <Text style={styles.label}>
        Status: <Text style={styles.value}>{character.status}</Text>
      </Text>

      <Text style={styles.label}>
        Location:{' '}
        <Text style={styles.value}>
          {character.location.name} - {character.location.type}
        </Text>
      </Text>

      <Text style={styles.subtitle}>Episodes in which he has appeared:</Text>
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
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
    padding: 16,
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
