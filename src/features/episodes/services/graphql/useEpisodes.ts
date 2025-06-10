import {gql, useQuery} from '@apollo/client';

const GET_EPISODES = gql`
  query GetEpisodes($page: Int!) {
    episodes(page: $page) {
      info {
        next
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

interface GetEpisodesResponse {
  episodes: {
    info: {
      next: number | null;
    };
    results: Episode[];
  };
}

interface GetEpisodesVariables {
  page: number;
}

export const useEpisodes = (page: number = 1) => {
  return useQuery<GetEpisodesResponse, GetEpisodesVariables>(GET_EPISODES, {
    variables: {page},
    notifyOnNetworkStatusChange: true,
  });
};
