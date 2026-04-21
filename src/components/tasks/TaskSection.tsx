import { StyleSheet, Text, View } from 'react-native';
import type { DailyTask } from '@/models';
import { TaskCard } from './TaskCard';

export function TaskSection({ title, tasks, onToggle }: { title: string; tasks: DailyTask[]; onToggle: (id: string, done: boolean) => void }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.list}>{tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} />)}</View>
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { gap: 10 }, title: { fontSize: 18, fontWeight: '700' }, list: { gap: 8 } });
