import {getUniqueSpeciesOptions} from '../getUniqueSpeciesOptions';
import {Character} from '@features/characters/services/graphql/useCharacters';

const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick',
    species: 'Human',
    status: 'Alive',
    image: '',
    gender: 'Male',
  },
  {
    id: '2',
    name: 'Morty',
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
];

describe('getUniqueSpeciesOptions', () => {
  it('returns unique species with "Todos" at the beginning', () => {
    const result = getUniqueSpeciesOptions(mockCharacters);
    expect(result).toEqual(['Todos', 'Bird-Person', 'Human']);
  });

  it('returns only "Todos" if no characters', () => {
    const result = getUniqueSpeciesOptions([]);
    expect(result).toEqual(['Todos']);
  });
});
