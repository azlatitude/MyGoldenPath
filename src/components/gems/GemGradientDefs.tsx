import { Defs, LinearGradient, Stop } from 'react-native-svg';
import type { GemType } from '@/models';
import { GEM_VISUAL_SPECS } from '@/constants/gem-visuals';

export function GemGradientDefs({ gemType, gradientId }: { gemType: GemType; gradientId: string }) {
  const spec = GEM_VISUAL_SPECS[gemType];
  return (
    <Defs>
      <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
        {spec.gradientStops.map((stop) => (
          <Stop key={`${stop.offset}-${stop.color}`} offset={`${stop.offset * 100}%`} stopColor={stop.color} stopOpacity={stop.opacity ?? 1} />
        ))}
      </LinearGradient>
    </Defs>
  );
}
