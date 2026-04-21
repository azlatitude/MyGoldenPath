import { useMemo } from 'react';
import { monthKeyFromDate } from '@/utils/date';
import { useCurrentProfile } from './useCurrentProfile';
import { usePlanningStore } from '@/stores';

export const useMonthlyProgress = () => {
  const profile = useCurrentProfile();
  const monthly = usePlanningStore((s) => s.monthlyObjectives);
  const monthKey = monthKeyFromDate();

  return useMemo(() => monthly.filter((m) => m.profileId === profile?.id && m.monthKey === monthKey), [monthly, profile?.id, monthKey]);
};
