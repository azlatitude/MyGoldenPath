import Svg, { Rect } from 'react-native-svg';

export function ChestAnimation({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect x="14" y="42" width="72" height="44" rx="10" fill="#7A4A00" />
      <Rect x="14" y="30" width="72" height="20" rx="10" fill="#A86A08" />
      <Rect x="46" y="48" width="8" height="16" rx="2" fill="#FFD56A" />
    </Svg>
  );
}
