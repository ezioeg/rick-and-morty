import {gql, useQuery} from '@apollo/client';

const GET_EPISODES = gql`
  query GetEpisodes($page: Int!) {
    episodes(page: $page) {
      results {
        id
        name
        air_date
      }
    }
  }
`;

export const useEpisodes = (page: number = 1) => {
  return useQuery(GET_EPISODES, {
    variables: {page},
  });
};
