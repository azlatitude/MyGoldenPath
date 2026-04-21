import { isSameMonth } from 'date-fns';
import type { DailyTask, MonthlyObjective, Retrospective } from '@/models';
import { createId } from '@/utils/ids';
import { monthKeyFromDate, nowIso } from '@/utils/date';

export const generateRetrospectiveFromData = (profileId: string, tasks: DailyTask[], monthlyObjectives: MonthlyObjective[]): Retrospective => {
  const monthKey = monthKeyFromDate();
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const total = tasks.length || 1;
  const completedObj = monthlyObjectives.filter((m) => m.status === 'completed').length;
  const base: Retrospective = {
    id: createId(),
    profileId,
    monthKey,
    overallCompletionRate: completed / total,
    aspectStats: [],
    unlinkedTaskCount: tasks.filter((t) => t.isUnlinked).length,
    totalGemsEarned: completed,
    generatedAt: nowIso()
  };
  if (completedObj > 0 && isSameMonth(new Date(), new Date())) base.completedAt = nowIso();
  return base;
};
