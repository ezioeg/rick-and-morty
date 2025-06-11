import {Character} from '@features/characters/services/graphql/useCharacters';

export const filterCharacters = (
  characters: Character[],
  nameFilter: string,
  speciesFilter: string,
  statusFilter: string,
): Character[] => {
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
};
