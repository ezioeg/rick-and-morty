import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from '../../types/IconTypes';

function BinocularsIcon({size, color}: IconProps) {
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
      <Path d="M10 10h4" />
      <Path d="M19 7V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3" />
      <Path d="M20 21a2 2 0 002-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 00-1-1h-4a1 1 0 00-1 1v11a2 2 0 002 2z" />
      <Path d="M22 16H2" />
      <Path d="M4 21a2 2 0 01-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 011-1h4a1 1 0 011 1v11a2 2 0 01-2 2z" />
      <Path d="M9 7V4a1 1 0 00-1-1H6a1 1 0 00-1 1v3" />
    </Svg>
  );
}

export default BinocularsIcon;
