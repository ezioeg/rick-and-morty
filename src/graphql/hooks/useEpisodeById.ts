import {gql, useQuery} from '@apollo/client';

const GET_EPISODE_BY_ID = gql`
  query GetEpisodeById($id: ID!) {
    episode(id: $id) {
      name
      air_date
      episode
      characters {
        id
        image
        name
        species
      }
    }
  }
`;

export const useEpisodeById = (id: string) => {
  return useQuery(GET_EPISODE_BY_ID, {
    variables: {id},
  });
};
