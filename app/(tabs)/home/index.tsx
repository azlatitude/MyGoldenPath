import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { AppScreen } from '@/components/common/AppScreen';
import { TaskSection } from '@/components/tasks/TaskSection';
import { QuickAddTaskFab } from '@/components/tasks/QuickAddTaskFab';
import { PrizeDropOverlay } from '@/components/animation/PrizeDropOverlay';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTodayTasks } from '@/hooks/useTodayTasks';
import { useGemStore, useTaskStore } from '@/stores';

export default function HomeScreen() {
  const profile = useCurrentProfile();
  const tasks = useTodayTasks();
  const toggleTaskComplete = useTaskStore((s) => s.toggleTaskComplete);
  const consumeNextDropForAnimation = useGemStore((s) => s.consumeNextDropForAnimation);
  const [drop, setDrop] = useState<ReturnType<typeof consumeNextDropForAnimation>>();

  const pending = useMemo(() => tasks.filter((t) => t.status !== 'completed'), [tasks]);
  const completed = useMemo(() => tasks.filter((t) => t.status === 'completed'), [tasks]);

  return (
    <AppScreen>
      <Text style={{ fontSize: 28, fontWeight: '800' }}>Home</Text>
      <Text style={{ color: '#6B7280', marginBottom: 12 }}>{profile?.name ?? 'Profile'}</Text>
      <View style={{ gap: 12 }}>
        <TaskSection
          title="Today"
          tasks={pending}
          onToggle={(id, done) => {
            toggleTaskComplete(id, done);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if (done) setDrop(consumeNextDropForAnimation());
          }}
        />
        <TaskSection title="Completed" tasks={completed} onToggle={toggleTaskComplete} />
      </View>
      <QuickAddTaskFab onPress={() => router.push('/(tabs)/home/add-task')} />
      {drop ? (
        <PrizeDropOverlay
          visible={Boolean(drop)}
          gemType={drop.gemType}
          rarity={drop.rarityBoostApplied ? 'rare' : 'common'}
          sourceType={drop.sourceType === 'monthly_objective_complete' ? 'monthly_objective_complete' : 'task_complete'}
          onComplete={() => setDrop(undefined)}
          onSkip={() => setDrop(undefined)}
        />
      ) : null}
    </AppScreen>
  );
}
