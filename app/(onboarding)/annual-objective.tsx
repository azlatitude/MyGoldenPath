import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useAppStore, usePlanningStore, useProfileStore, useUiStore } from '@/stores';

export default function AnnualObjectiveScreen() {
  const [title, setTitle] = useState('');
  const profileId = useProfileStore((s) => s.activeProfileId)!;
  const aspectId = useUiStore((s) => s.onboardingDraft.aspectIds[0]);
  const createAnnualObjective = usePlanningStore((s) => s.createAnnualObjective);
  const setOnboardingStep = useAppStore((s) => s.setOnboardingStep);

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Your First Annual Objective</Text>
      <TextInput style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, padding: 12 }} value={title} onChangeText={setTitle} placeholder="Enter your annual objective" />
      <View style={{ marginTop: 14 }}>
        <PrimaryButton
          label="Continue"
          onPress={() => {
            if (!aspectId || title.trim().length < 3) return;
            createAnnualObjective({ profileId, aspectId, year: new Date().getFullYear(), title: title.trim() });
            setOnboardingStep('monthly-objective');
            router.push('/(onboarding)/monthly-objective');
          }}
        />
      </View>
    </AppScreen>
  );
}
