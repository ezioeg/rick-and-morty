import {gql, useQuery} from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        image
        name
        species
      }
    }
  }
`;

export const useCharacters = (page: number = 1) => {
  return useQuery(GET_CHARACTERS, {
    variables: {page},
  });
};
