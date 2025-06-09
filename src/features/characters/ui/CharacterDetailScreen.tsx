import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCharacterById} from '../services/graphql';
import Header from '../../../shared/components/Header';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import {
  RootStackParamList,
  CharacterDetailRouteProp,
} from '../../../shared/types/RootStackParamListTypes';

function CharacterDetailScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {params} = useRoute<CharacterDetailRouteProp>();
  const {id} = params;

  const {data, loading, error} = useCharacterById(id);

  if (loading) {
    return <Loader message="Loading character..." />;
  }

  if (error) {
    return <ErrorMessage message="Error loading character" />;
  }

  const character = data?.character;
  if (!character) {
    return <ErrorMessage message="Character not found" />;
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
          <TouchableOpacity
            onPress={() => navigation.navigate('EpisodeDetail', {id: item.id})}>
            <View style={styles.episodeItem}>
              <Text style={styles.episodeTitle}>{item.name}</Text>
              <Text style={styles.episodeAirDate}>{item.air_date}</Text>
            </View>
          </TouchableOpacity>
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
