import { useEffect, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { AppScreen } from '@/components/common/AppScreen';
import { TaskSection } from '@/components/tasks/TaskSection';
import { QuickAddTaskFab } from '@/components/tasks/QuickAddTaskFab';
import { PrizeDropOverlay } from '@/components/animation/PrizeDropOverlay';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTodayTasks } from '@/hooks/useTodayTasks';
import { useGemStore, useTaskStore, usePlanningStore } from '@/stores';
import { todayKey, monthKeyFromDate, isLastFiveDaysOfMonth, isLastTwoDaysOfMonth } from '@/utils/date';

export default function HomeScreen() {
  const profile = useCurrentProfile();
  const tasks = useTodayTasks();
  const toggleTaskComplete = useTaskStore((s) => s.toggleTaskComplete);
  const generateRecurringTasksForDate = useTaskStore((s) => s.generateRecurringTasksForDate);
  const carryOverUnfinishedTasks = useTaskStore((s) => s.carryOverUnfinishedTasks);
  const consumeNextDropForAnimation = useGemStore((s) => s.consumeNextDropForAnimation);
  const [drop, setDrop] = useState<ReturnType<typeof consumeNextDropForAnimation>>();

  // Auto-carry-over unfinished tasks + generate recurring tasks on mount
  useEffect(() => {
    if (profile?.id) {
      const today = todayKey();
      carryOverUnfinishedTasks(profile.id, today);
      generateRecurringTasksForDate(profile.id, today);
    }
  }, [profile?.id]);

  const pending = useMemo(() => tasks.filter((t) => t.status !== 'completed'), [tasks]);
  const completed = useMemo(() => tasks.filter((t) => t.status === 'completed'), [tasks]);

  // Monthly objective context
  const monthlyObjectives = usePlanningStore((s) => s.monthlyObjectives)
    .filter((m) => m.profileId === profile?.id && m.monthKey === monthKeyFromDate() && m.status === 'active');

  // Banner flags
  const showPlanBanner = isLastFiveDaysOfMonth() && !isLastTwoDaysOfMonth();
  const showRetroBanner = isLastTwoDaysOfMonth();

  return (
    <AppScreen>
      {/* Banners */}
      {showPlanBanner ? (
        <TouchableOpacity style={s.bannerPlan} onPress={() => router.push('/(tabs)/objectives/monthly')}>
          <Text style={s.bannerText}>Plan next month's objectives →</Text>
        </TouchableOpacity>
      ) : null}
      {showRetroBanner ? (
        <TouchableOpacity style={s.bannerRetro} onPress={() => router.push('/(tabs)/review')}>
          <Text style={s.bannerText}>Time for your monthly review! →</Text>
        </TouchableOpacity>
      ) : null}

      <Text style={{ fontSize: 28, fontWeight: '800' }}>Today</Text>
      <View style={s.headerRow}>
        <Text style={{ color: '#6B7280', flex: 1 }}>{profile?.name ?? 'Profile'}</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home/calendar')} style={s.calendarBtn}>
          <Text style={s.calendarText}>📅 Calendar</Text>
        </TouchableOpacity>
      </View>

      {/* Monthly objectives reminder */}
      {monthlyObjectives.length > 0 ? (
        <View style={s.objectivesReminder}>
          <Text style={s.reminderLabel}>This month's focus:</Text>
          {monthlyObjectives.map((m) => (
            <Text key={m.id} style={s.reminderItem}>• {m.title}</Text>
          ))}
        </View>
      ) : null}

      <View style={{ gap: 12, flex: 1 }}>
        <TaskSection
          title="To Do"
          tasks={pending}
          onToggle={(id, done) => {
            toggleTaskComplete(id, done);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if (done) setDrop(consumeNextDropForAnimation());
          }}
        />
        {completed.length > 0 ? (
          <TaskSection title="Done" tasks={completed} onToggle={toggleTaskComplete} />
        ) : null}
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

const s = StyleSheet.create({
  bannerPlan: { backgroundColor: '#EEF2FF', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#C7D2FE' },
  bannerRetro: { backgroundColor: '#FEF3C7', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#FCD34D' },
  bannerText: { fontSize: 14, fontWeight: '600', color: '#1E3A8A', textAlign: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  calendarBtn: { backgroundColor: '#EEF2FF', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  calendarText: { fontSize: 13, color: '#2563EB', fontWeight: '600' },
  objectivesReminder: { backgroundColor: '#F0FDF4', borderRadius: 10, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#BBF7D0' },
  reminderLabel: { fontSize: 12, fontWeight: '600', color: '#166534', marginBottom: 4 },
  reminderItem: { fontSize: 13, color: '#15803D' },
});
