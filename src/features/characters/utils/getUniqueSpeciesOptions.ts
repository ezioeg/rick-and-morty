import {Character} from '@features/characters/services/graphql/useCharacters';

export const getUniqueSpeciesOptions = (characters: Character[]): string[] => {
  const speciesSet = new Set(characters.map(c => c.species));
  return ['Todos', ...Array.from(speciesSet).sort()];
};
