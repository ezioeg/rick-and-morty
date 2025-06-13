import {gql, useQuery} from '@apollo/client';

const FILTER_CHARACTERS = gql`
  query FilterCharacters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        image
        name
        species
        status
        gender
      }
    }
  }
`;

interface Character {
  id: string;
  image: string;
  name: string;
  species: string;
  status: string;
  gender: string;
}

interface FilterCharacterResponse {
  characters: {
    results: Character[];
  };
}

interface FilterCharacterVariables {
  filter: {
    name?: string;
    species?: string;
    status?: string;
  };
}

export const useFilteredCharacters = (
  filter: FilterCharacterVariables['filter'],
) => {
  return useQuery<FilterCharacterResponse, FilterCharacterVariables>(
    FILTER_CHARACTERS,
    {
      variables: {filter},
      skip: Object.keys(filter).length === 0, // Opcional: saltar si no hay filtros
    },
  );
};
