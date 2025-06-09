import {gql, useQuery} from '@apollo/client';

const GET_EPISODE_BY_ID = gql`
  query GetEpisodeById($id: ID!) {
    episode(id: $id) {
      id
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

interface Character {
  id: string;
  image: string;
  name: string;
  species: string;
}

interface EpisodeDetail {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
}

interface GetEpisodeByIdResponse {
  episode: EpisodeDetail;
}

interface GetEpisodeByIdVariables {
  id: string;
}

export const useEpisodeById = (id: string) => {
  return useQuery<GetEpisodeByIdResponse, GetEpisodeByIdVariables>(
    GET_EPISODE_BY_ID,
    {
      variables: {id},
    },
  );
};
