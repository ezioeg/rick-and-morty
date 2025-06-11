import {filterCharacters} from '../filterCharacters';
import {Character} from '@features/characters/services/graphql/useCharacters';

const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    image: '',
    gender: 'Male',
  },
  {
    id: '2',
    name: 'Morty Smith',
    species: 'Human',
    status: 'Alive',
    image: '',
    gender: 'Male',
  },
  {
    id: '3',
    name: 'Birdperson',
    species: 'Bird-Person',
    status: 'Dead',
    image: '',
    gender: 'Male',
  },
  {
    id: '4',
    name: 'Squanchy',
    species: 'Cat-Person',
    status: 'unknown',
    image: '',
    gender: 'Male',
  },
];

describe('filterCharacters', () => {
  it('returns all characters if filters are default', () => {
    const result = filterCharacters(mockCharacters, '', 'Todos', 'Todos');
    expect(result).toEqual(
      [...mockCharacters].sort((a, b) => a.name.localeCompare(b.name)),
    );
  });

  it('filters by species', () => {
    const result = filterCharacters(mockCharacters, '', 'Human', 'Todos');
    expect(result.map(c => c.name).sort()).toEqual([
      'Morty Smith',
      'Rick Sanchez',
    ]);
  });

  it('filters by status', () => {
    const result = filterCharacters(mockCharacters, '', 'Todos', 'Dead');
    expect(result).toEqual([
      {
        id: '3',
        name: 'Birdperson',
        species: 'Bird-Person',
        status: 'Dead',
        image: '',
        gender: 'Male',
      },
    ]);
  });

  it('filters by name (case-insensitive)', () => {
    const result = filterCharacters(mockCharacters, 'squ', 'Todos', 'Todos');
    expect(result).toEqual([
      {
        id: '4',
        name: 'Squanchy',
        species: 'Cat-Person',
        status: 'unknown',
        image: '',
        gender: 'Male',
      },
    ]);
  });

  it('applies all filters', () => {
    const result = filterCharacters(mockCharacters, 'Rick', 'Human', 'Alive');
    expect(result).toEqual([
      {
        id: '1',
        name: 'Rick Sanchez',
        species: 'Human',
        status: 'Alive',
        image: '',
        gender: 'Male',
      },
    ]);
  });

  it('returns empty array if no match', () => {
    const result = filterCharacters(mockCharacters, 'Jerry', 'Alien', 'Dead');
    expect(result).toEqual([]);
  });
});
