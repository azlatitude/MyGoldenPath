export const ONBOARDING_STEPS = [
  'welcome',
  'aspects',
  'annual-objective',
  'monthly-objective',
  'first-task',
  'first-drop'
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
