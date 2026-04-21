import type { RecurrencePattern } from './enums';
import type { UUID } from './ids';

export interface RecurringTask {
  id: UUID;
  profileId: UUID;
  aspectId?: UUID | undefined;
  categoryId?: UUID | undefined;
  monthlyObjectiveId?: UUID | undefined;
  title: string;
  pattern: RecurrencePattern;
  daysOfWeek?: number[] | undefined;
  startDate: string;
  endDate?: string | undefined;
  isPaused: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
