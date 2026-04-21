import type { TaskStatus } from './enums';
import type { UUID } from './ids';

export interface DailyTask {
  id: UUID;
  profileId: UUID;
  aspectId?: UUID;
  categoryId?: UUID;
  monthlyObjectiveId?: UUID;
  title: string;
  dueDate: string;
  status: TaskStatus;
  isUnlinked: boolean;
  source: 'manual' | 'recurring_generated';
  recurringTaskId?: UUID;
  completedAt?: string | undefined;
  archivedAt?: string | undefined;
  createdAt: string;
  updatedAt: string;
}
