import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackNavigator';
import {useEpisodes} from '../../graphql/hooks/useEpisodes';

function EpisodeListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          <TouchableOpacity
            onPress={() => navigation.navigate('EpisodeDetail', {id: item.id})}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.airDate}>{item.air_date}</Text>
            </View>
          </TouchableOpacity>
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
    // backgroundColor: '#f2f2f2',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  airDate: {
    color: '#555',
  },
});

export default EpisodeListScreen;
