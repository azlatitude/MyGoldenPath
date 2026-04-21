import { useMemo } from 'react';
import { todayKey } from '@/utils/date';
import { useCurrentProfile } from './useCurrentProfile';
import { useTaskStore } from '@/stores';

export const useTodayTasks = () => {
  const profile = useCurrentProfile();
  const tasks = useTaskStore((s) => s.tasks);
  const date = todayKey();

  return useMemo(() => tasks.filter((t) => t.profileId === profile?.id && t.dueDate === date), [tasks, profile?.id, date]);
};
