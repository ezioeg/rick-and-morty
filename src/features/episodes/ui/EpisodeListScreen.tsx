import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEpisodes} from '../services/graphql';
import Header from '../../../shared/components/Header';
import {SearchEpisodeIcon} from '../../../shared/components/icons';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import {RootStackParamList} from '../../../shared/types/RootStackParamListTypes';

function EpisodeListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {data, loading, error} = useEpisodes(1);

  if (loading) {
    return <Loader message="Loading episodes..." />;
  }

  if (error) {
    return <ErrorMessage message="Error loading episodes" />;
  }

  const episodes = data?.episodes?.results ?? [];
  return (
    <View style={styles.container}>
      <Header
        title="Episodes"
        showBackButton={false}
        showRightIcon={true}
        RightIconComponent={SearchEpisodeIcon}
      />
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
    paddingHorizontal: 16,
  },
  item: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  airDate: {
    color: '#555',
  },
});

export default EpisodeListScreen;
