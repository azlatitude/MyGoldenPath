import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jsonStorage } from '@/utils/storage';

interface AppStoreState {
  schemaVersion: number;
  hydrated: boolean;
  onboardingCompleted: boolean;
  onboardingStep: 'welcome' | 'aspects' | 'annual-objective' | 'monthly-objective' | 'first-task' | 'first-drop';
  setHydrated: (hydrated: boolean) => void;
  setOnboardingStep: (step: AppStoreState['onboardingStep']) => void;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      schemaVersion: 1,
      hydrated: false,
      onboardingCompleted: false,
      onboardingStep: 'welcome',
      setHydrated: (hydrated) => set({ hydrated }),
      setOnboardingStep: (onboardingStep) => set({ onboardingStep }),
      completeOnboarding: () => set({ onboardingCompleted: true, onboardingStep: 'first-drop' })
    }),
    {
      name: 'mgp.app.v1',
      storage: jsonStorage,
      partialize: (state) => ({
        schemaVersion: state.schemaVersion,
        onboardingCompleted: state.onboardingCompleted,
        onboardingStep: state.onboardingStep
      })
    }
  )
);
