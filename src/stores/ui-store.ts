import { create } from 'zustand';

interface UiStore {
  activeModal: string | undefined;
  onboardingDraft: {
    aspectIds: string[];
    annualObjectiveId?: string;
    monthlyObjectiveId?: string;
    firstTaskId?: string;
  };
  setActiveModal: (activeModal: string | undefined) => void;
  setOnboardingDraft: (patch: Partial<UiStore['onboardingDraft']>) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  activeModal: undefined,
  onboardingDraft: { aspectIds: [] },
  setActiveModal: (activeModal) => set({ activeModal }),
  setOnboardingDraft: (patch) => set((state) => ({ onboardingDraft: { ...state.onboardingDraft, ...patch } }))
}));
