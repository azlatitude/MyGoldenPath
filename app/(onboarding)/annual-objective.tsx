import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SuggestionChips } from '@/components/common/SuggestionChips';
import { ANNUAL_SUGGESTIONS } from '@/constants/objective-suggestions';
import { useAppStore, usePlanningStore, useProfileStore, useUiStore } from '@/stores';

export default function AnnualObjectiveScreen() {
  const [title, setTitle] = useState('');
  const profileId = useProfileStore((s) => s.activeProfileId)!;
  const aspectId = useUiStore((s) => s.onboardingDraft.aspectIds[0]);
  const aspects = usePlanningStore((s) => s.aspects);
  const createAnnualObjective = usePlanningStore((s) => s.createAnnualObjective);
  const setOnboardingStep = useAppStore((s) => s.setOnboardingStep);

  const aspectName = aspects.find((a) => a.id === aspectId)?.name?.toLowerCase() ?? 'self';
  const suggestions = ANNUAL_SUGGESTIONS[aspectName] ?? ANNUAL_SUGGESTIONS.self;

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 4 }}>Your First Annual Objective</Text>
      <Text style={{ color: '#6B7280', marginBottom: 12 }}>What do you want to achieve this year?</Text>
      <TextInput style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, padding: 12 }} value={title} onChangeText={setTitle} placeholder="Type or pick one below" />
      <SuggestionChips suggestions={suggestions} onSelect={setTitle} />
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
