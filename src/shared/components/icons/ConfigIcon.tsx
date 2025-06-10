import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from '@shared/types/IconTypes';

function ConfigIcon({size, color}: IconProps) {
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
      <Path d="M12 20a8 8 0 100-16 8 8 0 000 16z" />
      <Path d="M12 14a2 2 0 100-4 2 2 0 000 4zM12 2v2M12 22v-2M17 20.66l-1-1.73M11 10.27L7 3.34M20.66 17l-1.73-1M3.34 7l1.73 1M14 12h8M2 12h2M20.66 7l-1.73 1M3.34 17l1.73-1M17 3.34l-1 1.73M11 13.73l-4 6.93" />
    </Svg>
  );
}

export default ConfigIcon;
