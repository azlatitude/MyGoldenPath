import { useMemo } from 'react';
import { GEM_VISUAL_SPECS } from '@/constants/gem-visuals';
import type { GemType } from '@/models';

export const useGemAnimations = (gemType: GemType) => {
  return useMemo(() => GEM_VISUAL_SPECS[gemType], [gemType]);
};
