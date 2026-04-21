import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTaskStore } from '@/stores';
import { todayKey } from '@/utils/date';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const profile = useCurrentProfile();
  const addTask = useTaskStore((s) => s.addTask);

  return (
    <AppScreen>
      <TextInput value={title} onChangeText={setTitle} placeholder="Task title" style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, padding: 12 }} />
      <View style={{ marginTop: 12 }}>
        <PrimaryButton
          label="Add Task"
          onPress={() => {
            if (!profile) return;
            addTask({ profileId: profile.id, title: title || 'New Task', dueDate: todayKey() });
            router.back();
          }}
        />
      </View>
    </AppScreen>
  );
}
