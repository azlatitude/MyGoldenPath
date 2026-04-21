import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useAppStore, usePlanningStore, useProfileStore, useUiStore } from '@/stores';
import { monthKeyFromDate } from '@/utils/date';

export default function MonthlyObjectiveScreen() {
  const [title, setTitle] = useState('');
  const profileId = useProfileStore((s) => s.activeProfileId)!;
  const aspectId = useUiStore((s) => s.onboardingDraft.aspectIds[0]);
  const createMonthlyObjective = usePlanningStore((s) => s.createMonthlyObjective);
  const setOnboardingDraft = useUiStore((s) => s.setOnboardingDraft);
  const setOnboardingStep = useAppStore((s) => s.setOnboardingStep);

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Your First Monthly Objective</Text>
      <TextInput style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, padding: 12 }} value={title} onChangeText={setTitle} placeholder="Enter monthly objective" />
      <View style={{ marginTop: 14 }}>
        <PrimaryButton
          label="Continue"
          onPress={() => {
            if (!aspectId || title.trim().length < 3) return;
            const id = createMonthlyObjective({ profileId, aspectId, title: title.trim(), monthKey: monthKeyFromDate() });
            setOnboardingDraft({ monthlyObjectiveId: id });
            setOnboardingStep('first-task');
            router.push('/(onboarding)/first-task');
          }}
        />
      </View>
    </AppScreen>
  );
}
