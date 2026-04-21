import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AnnualObjective, Aspect, Category, MonthlyObjective } from '@/models';
import { jsonStorage } from '@/utils/storage';
import { createId } from '@/utils/ids';
import { monthKeyFromDate, nowIso } from '@/utils/date';
import { useGemStore } from './gem-store';

interface PlanningStore {
  schemaVersion: number;
  aspects: Aspect[];
  categories: Category[];
  annualObjectives: AnnualObjective[];
  monthlyObjectives: MonthlyObjective[];
  createAspect: (input: Pick<Aspect, 'profileId' | 'name' | 'icon' | 'colorHex'>) => string;
  updateAspect: (aspectId: string, patch: Partial<Aspect>) => void;
  archiveAspect: (aspectId: string) => void;
  createCategory: (input: Pick<Category, 'profileId' | 'aspectId' | 'name'>) => string;
  createAnnualObjective: (input: Omit<AnnualObjective, 'id' | 'status' | 'sortOrder' | 'createdAt' | 'updatedAt'>) => string;
  createMonthlyObjective: (input: Omit<MonthlyObjective, 'id' | 'status' | 'sortOrder' | 'progressCurrent' | 'createdAt' | 'updatedAt' | 'monthKey'> & { monthKey?: string }) => string;
  completeMonthlyObjective: (monthlyObjectiveId: string) => void;
}

export const usePlanningStore = create<PlanningStore>()(
  persist(
    (set, get) => ({
      schemaVersion: 1,
      aspects: [],
      categories: [],
      annualObjectives: [],
      monthlyObjectives: [],
      createAspect: (input) => {
        const id = createId();
        const now = nowIso();
        set((state) => ({
          aspects: [...state.aspects, { id, ...input, sortOrder: state.aspects.length, isSystemDefault: false, isArchived: false, createdAt: now, updatedAt: now }]
        }));
        return id;
      },
      updateAspect: (aspectId, patch) => set((state) => ({ aspects: state.aspects.map((a) => (a.id === aspectId ? { ...a, ...patch, updatedAt: nowIso() } : a)) })),
      archiveAspect: (aspectId) => set((state) => ({ aspects: state.aspects.map((a) => (a.id === aspectId ? { ...a, isArchived: true, updatedAt: nowIso() } : a)) })),
      createCategory: (input) => {
        const id = createId();
        const now = nowIso();
        set((state) => ({ categories: [...state.categories, { id, ...input, isSystemDefault: false, isArchived: false, createdAt: now, updatedAt: now }] }));
        return id;
      },
      createAnnualObjective: (input) => {
        const id = createId();
        const now = nowIso();
        set((state) => ({
          annualObjectives: [...state.annualObjectives, { ...input, id, status: 'active', sortOrder: state.annualObjectives.length, createdAt: now, updatedAt: now }]
        }));
        return id;
      },
      createMonthlyObjective: (input) => {
        const id = createId();
        const now = nowIso();
        set((state) => ({
          monthlyObjectives: [
            ...state.monthlyObjectives,
            {
              ...input,
              id,
              monthKey: input.monthKey ?? monthKeyFromDate(),
              progressCurrent: 0,
              status: 'active',
              sortOrder: state.monthlyObjectives.length,
              createdAt: now,
              updatedAt: now
            }
          ]
        }));
        return id;
      },
      completeMonthlyObjective: (monthlyObjectiveId) => {
        const monthly = get().monthlyObjectives.find((m) => m.id === monthlyObjectiveId);
        if (!monthly || monthly.status === 'completed') return;
        set((state) => ({
          monthlyObjectives: state.monthlyObjectives.map((m) =>
            m.id === monthlyObjectiveId ? { ...m, status: 'completed', completedAt: nowIso(), updatedAt: nowIso() } : m
          )
        }));
        useGemStore.getState().rollDropForMonthlyObjective(monthlyObjectiveId);
      }
    }),
    {
      name: 'mgp.planning.v1',
      storage: jsonStorage
    }
  )
);
