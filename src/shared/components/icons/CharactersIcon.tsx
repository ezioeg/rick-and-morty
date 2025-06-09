import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {IconProps} from '../../types/IconTypes';

function CharactersIcon({size, color}: IconProps) {
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
      <Path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <Path d="M16 3.128a4 4 0 010 7.744" />
      <Path d="M22 21v-2a4 4 0 00-3-3.87" />
      <Circle cx={9} cy={7} r={4} />
    </Svg>
  );
}

export default CharactersIcon;
