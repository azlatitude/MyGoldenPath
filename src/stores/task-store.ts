import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DailyTask, RecurringTask } from '@/models';
import { jsonStorage } from '@/utils/storage';
import { createId } from '@/utils/ids';
import { nowIso, todayKey } from '@/utils/date';
import { shouldGenerateRecurringTaskForDate } from '@/services/recurring-engine';
import { useGemStore } from './gem-store';

interface TaskStore {
  schemaVersion: number;
  tasks: DailyTask[];
  recurringTasks: RecurringTask[];
  addTask: (input: Omit<DailyTask, 'id' | 'status' | 'isUnlinked' | 'source' | 'createdAt' | 'updatedAt'> & { source?: DailyTask['source'] }) => string;
  toggleTaskComplete: (taskId: string, completed: boolean) => void;
  generateRecurringTasksForDate: (profileId: string, date: string) => void;
  addRecurringTask: (input: Omit<RecurringTask, 'id' | 'isPaused' | 'isArchived' | 'createdAt' | 'updatedAt'>) => string;
  updateRecurringTask: (id: string, patch: Partial<Pick<RecurringTask, 'title' | 'pattern'>>) => void;
  deleteRecurringTask: (id: string) => void;
  pauseRecurringTask: (recurringTaskId: string, paused: boolean) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      schemaVersion: 1,
      tasks: [],
      recurringTasks: [],
      addTask: (input) => {
        const id = createId();
        const now = nowIso();
        const task: DailyTask = {
          id,
          profileId: input.profileId,
          ...(input.aspectId ? { aspectId: input.aspectId } : {}),
          ...(input.categoryId ? { categoryId: input.categoryId } : {}),
          ...(input.monthlyObjectiveId ? { monthlyObjectiveId: input.monthlyObjectiveId } : {}),
          title: input.title,
          dueDate: input.dueDate,
          status: 'pending',
          isUnlinked: !input.monthlyObjectiveId,
          source: input.source ?? 'manual',
          ...(input.recurringTaskId ? { recurringTaskId: input.recurringTaskId } : {}),
          ...(input.archivedAt ? { archivedAt: input.archivedAt } : {}),
          createdAt: now,
          updatedAt: now
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
        return id;
      },
      toggleTaskComplete: (taskId, completed) => {
        const updatedAt = nowIso();
        const completedAt = completed ? nowIso() : undefined;
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: completed ? 'completed' : 'pending',
                  completedAt,
                  updatedAt
                }
              : task
          )
        }));
        if (completed) useGemStore.getState().rollDropForTaskCompletion(taskId);
      },
      generateRecurringTasksForDate: (profileId, date) => {
        const asDate = new Date(`${date}T00:00:00`);
        const existing = new Set(get().tasks.filter((t) => t.dueDate === date).map((t) => `${t.recurringTaskId}:${date}`));
        const toCreate = get().recurringTasks.filter((rt) => rt.profileId === profileId && shouldGenerateRecurringTaskForDate(rt, asDate));
        const now = nowIso();
        const generated = toCreate
          .filter((rt) => !existing.has(`${rt.id}:${date}`))
          .map<DailyTask>((rt) => ({
            id: createId(),
            profileId,
            ...(rt.aspectId ? { aspectId: rt.aspectId } : {}),
            ...(rt.categoryId ? { categoryId: rt.categoryId } : {}),
            ...(rt.monthlyObjectiveId ? { monthlyObjectiveId: rt.monthlyObjectiveId } : {}),
            title: rt.title,
            dueDate: date,
            status: 'pending',
            isUnlinked: !rt.monthlyObjectiveId,
            source: 'recurring_generated',
            recurringTaskId: rt.id,
            createdAt: now,
            updatedAt: now
          }));
        if (generated.length) set((state) => ({ tasks: [...state.tasks, ...generated] }));
      },
      addRecurringTask: (input) => {
        const id = createId();
        const now = nowIso();
        set((state) => ({ recurringTasks: [...state.recurringTasks, { ...input, id, isPaused: false, isArchived: false, createdAt: now, updatedAt: now }] }));
        return id;
      },
      updateRecurringTask: (id, patch) => set((state) => ({
        recurringTasks: state.recurringTasks.map((r) => (r.id === id ? { ...r, ...patch, updatedAt: nowIso() } : r))
      })),
      deleteRecurringTask: (id) => set((state) => ({
        recurringTasks: state.recurringTasks.filter((r) => r.id !== id)
      })),
      pauseRecurringTask: (recurringTaskId, paused) =>
        set((state) => ({ recurringTasks: state.recurringTasks.map((r) => (r.id === recurringTaskId ? { ...r, isPaused: paused, updatedAt: nowIso() } : r)) }))
    }),
    {
      name: 'mgp.tasks.v1',
      storage: jsonStorage
    }
  )
);
