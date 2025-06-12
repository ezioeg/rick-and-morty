import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
import CharacterCardMain from '../components/CharacterCardMain';
import FilterModal from '../components/FilterModal';
import {
  filterCharacters,
  getUniqueSpeciesOptions,
  mergeUniqueCharacters,
} from '@features/characters/utils';

function CharacterListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();

  const {data, loading, error, fetchMore} = useCharacters(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(2);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [nameFilter, setNameFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [tempNameFilter, setTempNameFilter] = useState('');
  const [tempSpeciesFilter, setTempSpeciesFilter] = useState('Todos');
  const [tempStatusFilter, setTempStatusFilter] = useState('Todos');

  useEffect(() => {
    if (data?.characters?.results) {
      setCharacters(data.characters.results);
      setNextPage(data.characters.info?.next);
    }
  }, [data]);

  const renderCharacterItem = useCallback(
    ({item}: {item: Character}) => (
      <CharacterCardMain
        character={item}
        onPress={() => navigation.navigate('CharacterDetail', {id: item.id})}
      />
    ),
    [navigation],
  );

  const handleLoadMore = useCallback(async () => {
    const isFiltering =
      nameFilter.trim() !== '' ||
      speciesFilter !== 'Todos' ||
      statusFilter !== 'Todos';
    if (!nextPage || isFetchingMore || isFiltering) {
      return;
    }

    setIsFetchingMore(true);
    try {
      const {data: moreData} = await fetchMore({variables: {page: nextPage}});
      const newResults = moreData?.characters?.results || [];
      const newNext = moreData?.characters?.info?.next;

      setCharacters(prev => mergeUniqueCharacters(prev, newResults));
      setNextPage(newNext);
    } catch (e) {
      console.error('Failed to fetch more characters', e);
    }
    setIsFetchingMore(false);
  }, [
    nameFilter,
    speciesFilter,
    statusFilter,
    nextPage,
    isFetchingMore,
    fetchMore,
  ]);

  const speciesOptions = useMemo(
    () => getUniqueSpeciesOptions(characters),
    [characters],
  );

  const STATUS_OPTIONS = ['Todos', 'Alive', 'Dead', 'unknown'];

  const filteredCharacters = useMemo(() => {
    return filterCharacters(
      characters,
      nameFilter,
      speciesFilter,
      statusFilter,
    );
  }, [characters, nameFilter, speciesFilter, statusFilter]);

  if (loading && characters.length === 0) {
    return <Loader message={t('characterList.loading')} />;
  }

  if (error && characters.length === 0) {
    return <ErrorMessage message={t('characterList.error')} />;
  }

  const openFilterModal = () => {
    setTempNameFilter(nameFilter);
    setTempSpeciesFilter(speciesFilter);
    setTempStatusFilter(statusFilter);
    setIsFilterModalVisible(true);
  };

  const applyFilters = () => {
    setNameFilter(tempNameFilter);
    setSpeciesFilter(tempSpeciesFilter);
    setStatusFilter(tempStatusFilter);
    setIsFilterModalVisible(false);
    setIsFetchingMore(false);
  };

  const resetFilters = () => {
    setTempNameFilter('');
    setTempSpeciesFilter('Todos');
    setTempStatusFilter('Todos');
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('characterList.title')}
        showBackButton={false}
        rightIcon={
          <SearchCharacterIcon
            size={24}
            color={currentTheme.colors.textPrimary}
          />
        }
        onRightIconPress={openFilterModal}
      />
      <FlatList
        data={filteredCharacters}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCharacterItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore ? <Loader /> : null}
      />
      <FilterModal
        visible={isFilterModalVisible}
        title={t('characterList.filtersTitle')}
        onClose={() => setIsFilterModalVisible(false)}
        onReset={resetFilters}
        onApply={applyFilters}
        sections={[
          {
            title: t('characterList.filterByName'),
            content: (
              <TextInput
                placeholder={t('characterList.filterByName')}
                placeholderTextColor={currentTheme.colors.textSecondary}
                style={styles.input}
                value={tempNameFilter}
                onChangeText={setTempNameFilter}
                autoCorrect={false}
                autoCapitalize="none"
              />
            ),
          },
          {
            title: t('characterList.filterBySpecies'),
            content: (
              <View style={styles.speciesFilterContainer}>
                {speciesOptions.map(species => (
                  <TouchableOpacity
                    key={species}
                    style={[
                      styles.speciesOption,
                      tempSpeciesFilter === species &&
                        styles.speciesOptionSelected,
                    ]}
                    onPress={() => setTempSpeciesFilter(species)}>
                    <Text
                      style={
                        tempSpeciesFilter === species
                          ? styles.speciesTextSelected
                          : styles.speciesText
                      }>
                      {species}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ),
          },
          {
            title: t('characterList.filterByStatus'),
            content: (
              <View style={styles.speciesFilterContainer}>
                {STATUS_OPTIONS.map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.speciesOption,
                      tempStatusFilter === status &&
                        styles.speciesOptionSelected,
                    ]}
                    onPress={() => setTempStatusFilter(status)}>
                    <Text
                      style={
                        tempStatusFilter === status
                          ? styles.speciesTextSelected
                          : styles.speciesText
                      }>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ),
          },
        ]}
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
  input: {
    borderWidth: 1,
    borderColor: currentTheme.colors.border,
    borderRadius: 8,
    paddingHorizontal: currentTheme.spacing.md,
    paddingVertical: 8,
    marginBottom: currentTheme.spacing.md,
    color: currentTheme.colors.textPrimary,
  },
  speciesFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: currentTheme.spacing.md,
  },
  speciesOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: currentTheme.colors.border,
    marginRight: currentTheme.spacing.sm,
    marginBottom: currentTheme.spacing.sm,
  },
  speciesOptionSelected: {
    backgroundColor: currentTheme.colors.accent,
    borderColor: currentTheme.colors.accent,
  },
  speciesText: {
    color: currentTheme.colors.textSecondary,
  },
  speciesTextSelected: {
    color: currentTheme.colors.textButton,
  },
});

export default CharacterListScreen;
