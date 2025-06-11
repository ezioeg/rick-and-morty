import {Character} from '@features/characters/services/graphql/useCharacters';

export const mergeUniqueCharacters = (
  existing: Character[],
  incoming: Character[],
): Character[] => {
  const existingIds = new Set(existing.map(c => c.id));
  const filteredNew = incoming.filter(c => !existingIds.has(c.id));
  return [...existing, ...filteredNew];
};
