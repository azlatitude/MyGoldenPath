import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { DailyTask } from '@/models';
import { todayKey } from '@/utils/date';

interface TaskCardProps {
  task: DailyTask;
  onToggle: (id: string, done: boolean) => void;
}

function getTaskAge(task: DailyTask): number | null {
  if (task.source === 'recurring_generated') return null;
  const created = task.createdAt.slice(0, 10); // YYYY-MM-DD
  const today = todayKey();
  if (created >= today) return null;
  const diffMs = new Date(today).getTime() - new Date(created).getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const age = task.status !== 'completed' ? getTaskAge(task) : null;

  return (
    <Pressable style={styles.card} onPress={() => onToggle(task.id, task.status !== 'completed')}>
      <Text style={[styles.check, task.status === 'completed' && styles.done]}>{task.status === 'completed' ? '✓' : '○'}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, task.status === 'completed' && styles.strike]}>{task.title}</Text>
        {age !== null && age > 0 ? (
          <Text style={styles.ageBadge}>
            {age === 1 ? 'from yesterday' : `${age} days overdue`}
          </Text>
        ) : null}
      </View>
      {age !== null && age > 0 ? (
        <View style={[styles.ageIndicator, age >= 3 && styles.ageWarning]}>
          <Text style={styles.ageText}>{age}d</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB' },
  check: { fontSize: 18 },
  done: { color: '#10B981' },
  title: { fontSize: 16, color: '#111827' },
  strike: { textDecorationLine: 'line-through', color: '#6B7280' },
  ageBadge: { fontSize: 11, color: '#D97706', marginTop: 2 },
  ageIndicator: { backgroundColor: '#FEF3C7', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  ageWarning: { backgroundColor: '#FEE2E2' },
  ageText: { fontSize: 11, fontWeight: '700', color: '#92400E' },
});
