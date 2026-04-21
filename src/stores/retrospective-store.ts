import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Retrospective } from '@/models';
import { jsonStorage } from '@/utils/storage';
import { generateRetrospectiveFromData } from '@/services/retrospective-engine';
import { useTaskStore } from './task-store';
import { usePlanningStore } from './planning-store';

interface RetrospectiveStore {
  schemaVersion: number;
  retrospectives: Retrospective[];
  generateMonthRetrospective: (profileId: string, monthKey: string) => string;
  saveReflection: (retrospectiveId: string, patch: Pick<Retrospective, 'reflectionWin' | 'reflectionImprove' | 'completedAt'>) => void;
}

export const useRetrospectiveStore = create<RetrospectiveStore>()(
  persist(
    (set, get) => ({
      schemaVersion: 1,
      retrospectives: [],
      generateMonthRetrospective: (profileId) => {
        const tasks = useTaskStore.getState().tasks.filter((t) => t.profileId === profileId);
        const monthly = usePlanningStore.getState().monthlyObjectives.filter((m) => m.profileId === profileId);
        const retro = generateRetrospectiveFromData(profileId, tasks, monthly);
        set((state) => ({ retrospectives: [...state.retrospectives, retro] }));
        return retro.id;
      },
      saveReflection: (retrospectiveId, patch) =>
        set((state) => ({ retrospectives: state.retrospectives.map((r) => (r.id === retrospectiveId ? { ...r, ...patch } : r)) }))
    }),
    {
      name: 'mgp.retro.v1',
      storage: jsonStorage
    }
  )
);
