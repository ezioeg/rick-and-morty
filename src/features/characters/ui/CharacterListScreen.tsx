import React, {useEffect, useState} from 'react';
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
import {useTranslation} from 'react-i18next';
import {Character} from '@features/characters/services/graphql/useCharacters';

function CharacterListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();

  const {data, loading, error, fetchMore} = useCharacters(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(2);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    if (data?.characters?.results) {
      setCharacters(data.characters.results);
      setNextPage(data.characters.info?.next);
    }
  }, [data]);

  const handleLoadMore = async () => {
    if (!nextPage || isFetchingMore) {
      return;
    }

    setIsFetchingMore(true);
    try {
      const {data: moreData} = await fetchMore({variables: {page: nextPage}});
      const newResults = moreData?.characters?.results || [];
      const newNext = moreData?.characters?.info?.next;

      // Evitar duplicados por ID
      setCharacters(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const filteredNew = newResults.filter(c => !existingIds.has(c.id));
        return [...prev, ...filteredNew];
      });

      setNextPage(newNext);
    } catch (e) {
      console.error('Failed to fetch more characters', e);
    }
    setIsFetchingMore(false);
  };

  if (loading && characters.length === 0) {
    return <Loader message={t('characterList.loading')} />;
  }

  if (error && characters.length === 0) {
    return <ErrorMessage message={t('characterList.error')} />;
  }

  return (
    <View style={styles.container}>
      <Header
        title={t('characterList.title')}
        showBackButton={false}
        showRightIcon={true}
        RightIconComponent={SearchCharacterIcon}
      />
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore ? <Loader /> : null}
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
