import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTaskStore } from '@/stores';
import { todayKey } from '@/utils/date';

export default function TaskEditorModal() {
  const profile = useCurrentProfile();
  const addTask = useTaskStore((s) => s.addTask);
  const [title, setTitle] = useState('');

  return (
    <AppScreen>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>Task Editor</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Task title" style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10 }} />
      <View style={{ marginTop: 12 }}>
        <PrimaryButton label="Save" onPress={() => {
          if (!profile) return;
          addTask({ profileId: profile.id, title: title || 'New Task', dueDate: todayKey() });
          router.back();
        }} />
      </View>
    </AppScreen>
  );
}
