import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { DailyTask } from '@/models';

interface TaskCardProps {
  task: DailyTask;
  onToggle: (id: string, done: boolean) => void;
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onToggle(task.id, task.status !== 'completed')}>
      <Text style={[styles.check, task.status === 'completed' && styles.done]}>{task.status === 'completed' ? '✓' : '○'}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, task.status === 'completed' && styles.strike]}>{task.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB' },
  check: { fontSize: 18 },
  done: { color: '#10B981' },
  title: { fontSize: 16, color: '#111827' },
  strike: { textDecorationLine: 'line-through', color: '#6B7280' }
});
