import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from '@shared/types/IconTypes';

function BackArrowIcon({size, color}: IconProps) {
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
      <Path d="M19 15V9" />
      <Path d="M15 15h-3v4l-7-7 7-7v4h3v6z" />
    </Svg>
  );
}

export default BackArrowIcon;
