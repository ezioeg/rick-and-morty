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

  useEffect(() => {
    setIsFetchingMore(false);
  }, [nameFilter, speciesFilter, statusFilter]);

  const handleLoadMore = async () => {
    const isFiltering =
      nameFilter.trim() !== '' ||
      speciesFilter !== 'Todos' ||
      statusFilter !== 'Todos';
    if (!nextPage || isFetchingMore || isFiltering) return;

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

  const speciesOptions = useMemo(() => {
    const speciesSet = new Set(characters.map(c => c.species));
    return ['Todos', ...Array.from(speciesSet).sort()];
  }, [characters]);

  const STATUS_OPTIONS = ['Todos', 'Alive', 'Dead', 'unknown'];

  const filteredCharacters = useMemo(() => {
    let filtered = characters;

    if (speciesFilter !== 'Todos') {
      filtered = filtered.filter(c => c.species === speciesFilter);
    }

    if (statusFilter !== 'Todos') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (nameFilter.trim() !== '') {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(nameFilter.toLowerCase()),
      );
    }

    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [characters, speciesFilter, statusFilter, nameFilter]);

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
                <Text style={styles.species}>{item.species.toUpperCase()}</Text>
                <View style={styles.statusGenderRow}>
                  <Text style={styles.status}>{item.status}</Text>
                  <Text style={styles.gender}>{item.gender}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore ? <Loader /> : null}
      />
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

            <Text style={styles.filterSectionTitle}>
              {t('characterList.filterByName')}
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

            <Text style={styles.filterSectionTitle}>
              {t('characterList.filterBySpecies')}
            </Text>
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

            <Text style={styles.filterSectionTitle}>
              {t('characterList.filterByStatus')}
            </Text>
            <View style={styles.speciesFilterContainer}>
              {STATUS_OPTIONS.map(status => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.speciesOption,
                    tempStatusFilter === status && styles.speciesOptionSelected,
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

            <View style={styles.modalButtonsContainer}>
              <Button
                title={t('characterList.filterResetButton')}
                onPress={resetFilters}
                color={currentTheme.colors.textPrimary}
              />
              <Button
                title={t('characterList.filterApplyButton')}
                onPress={applyFilters}
                color={currentTheme.colors.textPrimary}
              />
              <Button
                title={t('characterList.filterCloseButton')}
                onPress={() => setIsFilterModalVisible(false)}
                color={currentTheme.colors.textPrimary}
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
    backgroundColor: currentTheme.colors.background,
    padding: currentTheme.spacing.md,
    marginBottom: currentTheme.spacing.lg,
    borderRadius: currentTheme.border.radius * 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: currentTheme.border.radius,
    marginRight: currentTheme.spacing.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: currentTheme.typography.subtitle,
    fontWeight: 'bold',
    color: currentTheme.colors.textPrimary,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoText: {
    color: currentTheme.colors.textSecondary,
    marginRight: 12,
  },
  species: {
    textTransform: 'uppercase',
    color: currentTheme.colors.textSecondary,
    marginBottom: 4,
  },
  statusGenderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    color: currentTheme.colors.textSecondary,
  },
  gender: {
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
  filterSectionTitle: {
    fontSize: currentTheme.typography.subtitle,
    marginBottom: currentTheme.spacing.md,
    color: currentTheme.colors.textPrimary,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: currentTheme.spacing.md,
  },
});

export default CharacterListScreen;
