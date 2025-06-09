import {gql, useQuery} from '@apollo/client';

const FILTER_CHARACTERS = gql`
  query FilterCharacters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        image
        name
        species
      }
    }
  }
`;

type FilterCharacterParams = {
  name?: string;
  species?: string;
  status?: string;
};

export const useFilteredCharacters = (filter: FilterCharacterParams) => {
  return useQuery(FILTER_CHARACTERS, {
    variables: {filter},
    skip: Object.keys(filter).length === 0, // opcional: evita llamar si no hay filtros
  });
};
