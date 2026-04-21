import { useMemo } from 'react';
import { useProfileStore } from '@/stores';

export const useCurrentProfile = () => {
  const { profiles, activeProfileId } = useProfileStore();
  return useMemo(() => profiles.find((p) => p.id === activeProfileId), [profiles, activeProfileId]);
};
