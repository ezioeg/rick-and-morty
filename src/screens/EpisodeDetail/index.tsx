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
import Header from '../../components/Header';

type EpisodeDetailRouteProp = RouteProp<RootStackParamList, 'EpisodeDetail'>;

function EpisodeDetailScreen() {
  const {params} = useRoute<EpisodeDetailRouteProp>();
  const {id} = params;

  const {data, loading, error} = useEpisodeById(id);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading episode...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error loading episode: {error.message}</Text>
      </View>
    );
  }

  const episode = data?.episode;

  if (!episode) {
    return (
      <View style={styles.center}>
        <Text>Episode not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title={episode.name}
        showBackButton={true}
        showRightIcon={false}
      />

      <Text style={styles.label}>
        Air date: <Text style={styles.value}>{episode.air_date}</Text>
      </Text>

      <Text style={styles.label}>
        Episode code: <Text style={styles.value}>{episode.episode}</Text>
      </Text>

      <Text style={styles.subtitle}>
        Characters that appear in the episode:
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
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'normal',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#555',
    backgroundColor: '#f2f2f2',
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
