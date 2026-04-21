import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore, useUiStore } from '@/stores';
import { monthKeyFromDate } from '@/utils/date';

export default function MonthlyObjectiveEditorModal() {
  const profile = useCurrentProfile();
  const aspectId = useUiStore((s) => s.onboardingDraft.aspectIds[0]);
  const createMonthlyObjective = usePlanningStore((s) => s.createMonthlyObjective);
  const [title, setTitle] = useState('');

  return (
    <AppScreen>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>Monthly Objective Editor</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Objective title" style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10 }} />
      <View style={{ marginTop: 12 }}>
        <PrimaryButton label="Save" onPress={() => {
          if (!profile || !aspectId) return;
          createMonthlyObjective({ profileId: profile.id, aspectId, title: title || 'Monthly Objective', monthKey: monthKeyFromDate() });
          router.back();
        }} />
      </View>
    </AppScreen>
  );
}
