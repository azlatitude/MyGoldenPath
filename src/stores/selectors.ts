import { useGemStore } from './gem-store';
import { useTaskStore } from './task-store';
import { usePlanningStore } from './planning-store';

export const selectAvailableGemCount = () => useGemStore.getState().inventory.filter((i) => !i.isRedeemed).length;

export const selectTodayTasks = (profileId: string, date: string) => useTaskStore.getState().tasks.filter((t) => t.profileId === profileId && t.dueDate === date);

export const selectMonthlyObjectives = (profileId: string, monthKey: string) =>
  usePlanningStore.getState().monthlyObjectives.filter((m) => m.profileId === profileId && m.monthKey === monthKey);
