import type { ObjectiveStatus } from './enums';
import type { UUID } from './ids';

export interface AnnualObjective {
  id: UUID;
  profileId: UUID;
  aspectId: UUID;
  categoryId?: UUID | undefined;
  year: number;
  title: string;
  status: ObjectiveStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string | undefined;
  archivedAt?: string | undefined;
}

export interface MonthlyObjectiveTarget {
  value: number;
  unit: string;
}

export interface MonthlyObjective {
  id: UUID;
  profileId: UUID;
  aspectId: UUID;
  annualObjectiveId?: UUID | undefined;
  categoryId?: UUID | undefined;
  monthKey: string;
  title: string;
  target?: MonthlyObjectiveTarget | undefined;
  progressCurrent: number;
  status: ObjectiveStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string | undefined;
  archivedAt?: string | undefined;
}
