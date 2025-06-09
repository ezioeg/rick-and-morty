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

interface Location {
  id: string;
  name: string;
  type: string;
}

interface Episode {
  id: string;
  name: string;
  air_date: string;
}

interface CharacterDetail {
  id: string;
  name: string;
  image: string;
  species: string;
  gender: string;
  status: string;
  location: Location;
  episode: Episode[];
}

interface GetCharacterByIdResponse {
  character: CharacterDetail;
}

interface GetCharacterByIdVariables {
  id: string;
}

export const useCharacterById = (id: string) => {
  return useQuery<GetCharacterByIdResponse, GetCharacterByIdVariables>(
    GET_CHARACTER_BY_ID,
    {
      variables: {id},
    },
  );
};
