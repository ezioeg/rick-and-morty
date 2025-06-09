import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCharacters} from '../services/graphql';
import Header from '../../../shared/components/Header';
import {SearchCharacterIcon} from '../../../shared/components/icons';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import {RootStackParamList} from '../../../shared/types/RootStackParamListTypes';

function CharacterListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {data, loading, error} = useCharacters(1);

  if (loading) {
    return <Loader message="Loading characters..." />;
  }

  if (error) {
    return <ErrorMessage message="Error loading characters" />;
  }

  const characters = data?.characters?.results ?? [];

  return (
    <View style={styles.container}>
      <Header
        title="Characters"
        showBackButton={false}
        showRightIcon={true}
        RightIconComponent={SearchCharacterIcon}
      />
      <FlatList
        data={characters}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CharacterDetail', {id: item.id})
            }>
            <View style={styles.item}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.species}>{item.species}</Text>
              </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  species: {
    color: '#555',
  },
});

export default CharacterListScreen;
