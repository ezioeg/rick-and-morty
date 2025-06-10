import {gql, useQuery} from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        image
        name
        species
      }
    }
  }
`;

export interface Character {
  id: string;
  image: string;
  name: string;
  species: string;
}

interface GetCharactersResponse {
  characters: {
    info: {
      next: number | null;
    };
    results: Character[];
  };
}

interface GetCharactersVariables {
  page: number;
}

export const useCharacters = (page: number = 1) => {
  return useQuery<GetCharactersResponse, GetCharactersVariables>(
    GET_CHARACTERS,
    {
      variables: {page},
      notifyOnNetworkStatusChange: true, // Permite mostrar loading cuando haces fetchMore
      fetchPolicy: 'cache-first',
    },
  );
};
