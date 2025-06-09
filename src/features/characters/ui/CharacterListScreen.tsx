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
import {useCharacters} from '@features/characters/services/graphql';
import {Header, Loader, ErrorMessage} from '@shared/components';
import {SearchCharacterIcon} from '@shared/components/icons';
import {RootStackParamList} from '@shared/types/RootStackParamListTypes';
import {currentTheme} from '@theme';

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
    paddingHorizontal: currentTheme.spacing.lg,
    backgroundColor: currentTheme.colors.background,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: currentTheme.spacing.lg,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: currentTheme.border.radius,
    marginRight: currentTheme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
  },
  species: {
    color: currentTheme.colors.textSecondary,
  },
});

export default CharacterListScreen;
