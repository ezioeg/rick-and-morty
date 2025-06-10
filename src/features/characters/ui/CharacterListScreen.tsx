import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
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

  // Estados para filtros
  const [nameFilter, setNameFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('Todos');

  // Estado para modal y filtros temporales
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [tempNameFilter, setTempNameFilter] = useState('');
  const [tempSpeciesFilter, setTempSpeciesFilter] = useState('Todos');

  useEffect(() => {
    if (data?.characters?.results) {
      setCharacters(data.characters.results);
      setNextPage(data.characters.info?.next);
    }
  }, [data]);

  useEffect(() => {
    setIsFetchingMore(false);
  }, [nameFilter, speciesFilter]);

  const handleLoadMore = async () => {
    const isFiltering = nameFilter.trim() !== '' || speciesFilter !== 'Todos';
    if (!nextPage || isFetchingMore || isFiltering) {
      return;
    }

    setIsFetchingMore(true);
    try {
      const {data: moreData} = await fetchMore({variables: {page: nextPage}});
      const newResults = moreData?.characters?.results || [];
      const newNext = moreData?.characters?.info?.next;

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

  // Obtener lista única de especies + "Todos"
  const speciesOptions = useMemo(() => {
    const speciesSet = new Set(characters.map(c => c.species));
    return ['Todos', ...Array.from(speciesSet).sort()];
  }, [characters]);

  // const ALL_SPECIES = [
  //   'Todos',
  //   'Alien',
  //   'Animal',
  //   'Cronenberg',
  //   'Disease',
  //   'Human',
  //   'Humanoid',
  //   'Mythological Creature',
  //   'Poopybutthole',
  //   'Robot',
  //   'unknown',
  // ];

  // const speciesOptions = ALL_SPECIES;

  // Filtrar y ordenar personajes según filtros aplicados (no temporales)
  const filteredCharacters = useMemo(() => {
    let filtered = characters;

    if (speciesFilter !== 'Todos') {
      filtered = filtered.filter(c => c.species === speciesFilter);
    }

    if (nameFilter.trim() !== '') {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(nameFilter.toLowerCase()),
      );
    }

    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }, [characters, speciesFilter, nameFilter]);

  if (loading && characters.length === 0) {
    return <Loader message={t('characterList.loading')} />;
  }

  if (error && characters.length === 0) {
    return <ErrorMessage message={t('characterList.error')} />;
  }

  // Funciones para el modal de filtros
  const openFilterModal = () => {
    setTempNameFilter(nameFilter);
    setTempSpeciesFilter(speciesFilter);
    setIsFilterModalVisible(true);
  };

  const applyFilters = () => {
    setNameFilter(tempNameFilter);
    setSpeciesFilter(tempSpeciesFilter);
    setIsFilterModalVisible(false);
  };

  const resetFilters = () => {
    setTempNameFilter('');
    setTempSpeciesFilter('Todos');
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('characterList.title')}
        showBackButton={false}
        showRightIcon={true}
        RightIconComponent={() => (
          <TouchableOpacity onPress={openFilterModal}>
            <SearchCharacterIcon
              size={24}
              color={currentTheme.colors.textPrimary}
            />
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filteredCharacters}
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

      {/* Modal de filtros */}
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {t('characterList.filtersTitle')}
            </Text>

            <TextInput
              placeholder={t('characterList.filterByName')}
              placeholderTextColor={currentTheme.colors.textSecondary}
              style={styles.input}
              value={tempNameFilter}
              onChangeText={setTempNameFilter}
              autoCorrect={false}
              autoCapitalize="none"
            />

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

            <View style={styles.modalButtonsContainer}>
              <Button
                title={t('characterList.filterResetButton')}
                onPress={resetFilters}
                color={currentTheme.colors.textPrimary}
              />
              <Button
                title={t('characterList.filterApplyButton')}
                color={currentTheme.colors.textPrimary}
                onPress={applyFilters}
              />
              <Button
                title={t('characterList.filterCloseButton')}
                color={currentTheme.colors.textPrimary}
                onPress={() => setIsFilterModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    borderRadius: 20,
    borderWidth: 1,
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
    color: '#fff',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: currentTheme.spacing.lg,
  },

  modalContainer: {
    backgroundColor: currentTheme.colors.background,
    borderRadius: 12,
    padding: currentTheme.spacing.lg,
  },

  modalTitle: {
    fontSize: currentTheme.typography.title,
    fontWeight: 'bold',
    marginBottom: currentTheme.spacing.md,
    textAlign: 'center',
    color: currentTheme.colors.textPrimary,
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: currentTheme.spacing.md,
  },
});

export default CharacterListScreen;
