import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CharacterCard from '../CharacterCard';

// Mock del hook useNavigation
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockCharacter = {
  id: '1',
  name: 'Rick Sanchez',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('CharacterCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders character information correctly', () => {
    const {getByText} = render(<CharacterCard character={mockCharacter} />);

    expect(getByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('HUMAN')).toBeTruthy();
    expect(getByText('Alive')).toBeTruthy();
    expect(getByText('Male')).toBeTruthy();
  });

  it('calls navigation.navigate with correct params when tapped', () => {
    const {getByRole} = render(<CharacterCard character={mockCharacter} />);

    const touchable = getByRole('button');
    fireEvent.press(touchable);

    expect(mockNavigate).toHaveBeenCalledWith('CharacterDetail', {id: '1'});
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
