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

interface Episode {
  id: string;
  name: string;
  air_date: string;
}

interface GetEpisodesResponse {
  episodes: {
    results: Episode[];
  };
}

interface GetEpisodesVariables {
  page: number;
}

export const useEpisodes = (page: number = 1) => {
  return useQuery<GetEpisodesResponse, GetEpisodesVariables>(GET_EPISODES, {
    variables: {page},
  });
};
