import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTaskStore } from '@/stores';
import { todayKey } from '@/utils/date';

export default function RoutineEditorModal() {
  const profile = useCurrentProfile();
  const [title, setTitle] = useState('');
  const addRecurringTask = useTaskStore((s) => s.addRecurringTask);

  return (
    <AppScreen>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>Routine Editor</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Routine title" style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10 }} />
      <View style={{ marginTop: 12 }}>
        <PrimaryButton label="Save" onPress={() => {
          if (!profile) return;
          addRecurringTask({ profileId: profile.id, title: title || 'Routine', pattern: 'daily', startDate: todayKey() });
          router.back();
        }} />
      </View>
    </AppScreen>
  );
}
