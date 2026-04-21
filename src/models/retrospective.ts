import type { UUID } from './ids';

export interface AspectMonthStat {
  aspectId: UUID;
  taskCompleted: number;
  taskTotal: number;
  monthlyObjectivesCompleted: number;
  monthlyObjectivesTotal: number;
}

export interface Retrospective {
  id: UUID;
  profileId: UUID;
  monthKey: string;
  overallCompletionRate: number;
  aspectStats: AspectMonthStat[];
  unlinkedTaskCount: number;
  totalGemsEarned: number;
  topGemType?: string | undefined;
  reflectionWin?: string | undefined;
  reflectionImprove?: string | undefined;
  generatedAt: string;
  completedAt?: string | undefined;
}
