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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/RootStackNavigator';
import {useEpisodeById} from '../hooks/graphql/useEpisodeById';
import Header from '../../../shared/components/Header';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';

type EpisodeDetailRouteProp = RouteProp<RootStackParamList, 'EpisodeDetail'>;

function EpisodeDetailScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {params} = useRoute<EpisodeDetailRouteProp>();
  const {id} = params;

  const {data, loading, error} = useEpisodeById(id);

  if (loading) {
    return <Loader message="Loading episode..." />;
  }

  if (error) {
    return <ErrorMessage message="Error loading episode" />;
  }

  const episode = data?.episode;
  if (!episode) {
    return <ErrorMessage message="Episode not found" />;
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CharacterDetail', {id: item.id})
            }>
            <View style={styles.characterItem}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>{item.name}</Text>
                <Text style={styles.characterSpecies}>{item.species}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
