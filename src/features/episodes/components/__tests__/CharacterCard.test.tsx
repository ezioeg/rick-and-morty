import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CharacterCard from '../CharacterCard';

const mockCharacter = {
  id: '1',
  name: 'Rick Sanchez',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('CharacterCard', () => {
  it('renders character information correctly', () => {
    const {getByText} = render(
      <CharacterCard character={mockCharacter} onPress={() => {}} />,
    );

    expect(getByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('HUMAN')).toBeTruthy();
    expect(getByText('Alive')).toBeTruthy();
    expect(getByText('Male')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPressMock = jest.fn();

    const {getByRole} = render(
      <CharacterCard character={mockCharacter} onPress={onPressMock} />,
    );

    const touchable = getByRole('button');
    fireEvent.press(touchable);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
