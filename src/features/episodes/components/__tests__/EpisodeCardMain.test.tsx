import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import EpisodeCardMain from '../EpisodeCardMain';

const mockEpisode = {
  id: '1',
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
};

describe('EpisodeCardMain', () => {
  it('renders episode info correctly', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <EpisodeCardMain episode={mockEpisode} onPress={onPressMock} />,
    );

    expect(getByText('S01E01')).toBeTruthy();
    expect(getByText('December 2, 2013')).toBeTruthy();
    expect(getByText('Pilot')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <EpisodeCardMain episode={mockEpisode} onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId('episode-card-touchable'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
