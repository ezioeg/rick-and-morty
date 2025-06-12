import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import EpisodeCardMain from '../EpisodeCardMain';

// Mock de useNavigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockEpisode = {
  id: '1',
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
};

describe('EpisodeCardMain', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders episode info correctly', () => {
    const {getByText} = render(<EpisodeCardMain episode={mockEpisode} />);

    expect(getByText('S01E01')).toBeTruthy();
    expect(getByText('December 2, 2013')).toBeTruthy();
    expect(getByText('Pilot')).toBeTruthy();
  });

  it('navigates to EpisodeDetail screen when pressed', () => {
    const {getByTestId} = render(<EpisodeCardMain episode={mockEpisode} />);

    fireEvent.press(getByTestId('episode-card-touchable'));

    expect(mockNavigate).toHaveBeenCalledWith('EpisodeDetail', {id: '1'});
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
