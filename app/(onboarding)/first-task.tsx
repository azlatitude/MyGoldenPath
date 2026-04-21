import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useAppStore, useTaskStore, useProfileStore, useUiStore } from '@/stores';
import { todayKey } from '@/utils/date';

export default function FirstTaskScreen() {
  const [title, setTitle] = useState('');
  const profileId = useProfileStore((s) => s.activeProfileId)!;
  const monthlyObjectiveId = useUiStore((s) => s.onboardingDraft.monthlyObjectiveId);
  const addTask = useTaskStore((s) => s.addTask);
  const setOnboardingDraft = useUiStore((s) => s.setOnboardingDraft);
  const setOnboardingStep = useAppStore((s) => s.setOnboardingStep);

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Your First Task</Text>
      <TextInput style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, padding: 12 }} value={title} onChangeText={setTitle} placeholder="What can you do today?" />
      <View style={{ marginTop: 14 }}>
        <PrimaryButton
          label="Start Your Quest"
          onPress={() => {
            const id = addTask({
              profileId,
              title: title.trim() || 'First task',
              dueDate: todayKey(),
              ...(monthlyObjectiveId ? { monthlyObjectiveId } : {})
            });
            setOnboardingDraft({ firstTaskId: id });
            setOnboardingStep('first-drop');
            router.push('/(onboarding)/first-drop');
          }}
        />
      </View>
    </AppScreen>
  );
}
