import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SearchCharacterIcon({size, color}: {size: number; color: string}) {
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
      <Path d="M6 18h8" />
      <Path d="M3 22h18" />
      <Path d="M14 22a7 7 0 100-14h-1" />
      <Path d="M9 14h2" />
      <Path d="M9 12a2 2 0 01-2-2V6h6v4a2 2 0 01-2 2z" />
      <Path d="M12 6V3a1 1 0 00-1-1H9a1 1 0 00-1 1v3" />
    </Svg>
  );
}

export default SearchCharacterIcon;
