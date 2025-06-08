import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function SvgComponent({size, color}: {size: number; color: string}) {
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
      <Rect width={7} height={9} x={3} y={3} rx={1} />
      <Rect width={7} height={5} x={14} y={3} rx={1} />
      <Rect width={7} height={9} x={14} y={12} rx={1} />
      <Rect width={7} height={5} x={3} y={16} rx={1} />
    </Svg>
  );
}

export default SvgComponent;
