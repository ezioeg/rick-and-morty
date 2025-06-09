import {gql, useQuery} from '@apollo/client';

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      gender
      status
      location {
        id
        name
        type
      }
      episode {
        id
        name
        air_date
      }
    }
  }
`;

export const useCharacterById = (id: string) => {
  return useQuery(GET_CHARACTER_BY_ID, {
    variables: {id},
  });
};
