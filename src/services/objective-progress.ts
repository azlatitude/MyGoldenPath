import type { MonthlyObjective } from '@/models';

export const objectiveProgressRatio = (objective: MonthlyObjective) => {
  const target = objective.target?.value ?? 1;
  return Math.max(0, Math.min(1, objective.progressCurrent / target));
};
