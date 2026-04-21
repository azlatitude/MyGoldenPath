import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore, useUiStore } from '@/stores';

export default function AnnualObjectiveEditorModal() {
  const profile = useCurrentProfile();
  const aspectId = useUiStore((s) => s.onboardingDraft.aspectIds[0]);
  const createAnnualObjective = usePlanningStore((s) => s.createAnnualObjective);
  const [title, setTitle] = useState('');

  return (
    <AppScreen>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>Annual Objective Editor</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Objective title" style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10 }} />
      <View style={{ marginTop: 12 }}>
        <PrimaryButton label="Save" onPress={() => {
          if (!profile || !aspectId) return;
          createAnnualObjective({ profileId: profile.id, aspectId, year: new Date().getFullYear(), title: title || 'Annual Objective' });
          router.back();
        }} />
      </View>
    </AppScreen>
  );
}
