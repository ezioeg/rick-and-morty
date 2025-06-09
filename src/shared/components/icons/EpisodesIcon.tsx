import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from '../../types/IconTypes';

function EpisodesIcon({size, color}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M20.2 6L3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3zM6.2 5.3l3.1 3.9M12.4 3.4l3.1 4M3 11h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </Svg>
  );
}

export default EpisodesIcon;
