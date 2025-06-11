import {mergeUniqueCharacters} from '../mergeUniqueCharacters';
import {Character} from '@features/characters/services/graphql/useCharacters';

const base: Character[] = [
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
];

const incoming: Character[] = [
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

describe('mergeUniqueCharacters', () => {
  it('merges only unique characters based on ID', () => {
    const result = mergeUniqueCharacters(base, incoming);
    expect(result).toEqual([
      {
        id: '1',
        name: 'Rick',
        species: 'Human',
        status: 'Alive',
        gender: 'Male',
        image: '',
      },
      {
        id: '2',
        name: 'Morty',
        species: 'Human',
        status: 'Alive',
        gender: 'Male',
        image: '',
      },
      {
        id: '3',
        name: 'Birdperson',
        species: 'Bird-Person',
        status: 'Dead',
        gender: 'Male',
        image: '',
      },
    ]);
  });

  it('returns same array if all incoming are duplicates', () => {
    const result = mergeUniqueCharacters(base, base);
    expect(result).toEqual(base);
  });

  it('adds all if existing is empty', () => {
    const result = mergeUniqueCharacters([], incoming);
    expect(result).toEqual(incoming);
  });
});
