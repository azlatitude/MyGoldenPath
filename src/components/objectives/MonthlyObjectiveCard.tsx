import { View, Text, StyleSheet } from 'react-native';
import type { MonthlyObjective } from '@/models';
import { ProgressBar } from '@/components/common/ProgressBar';

export function MonthlyObjectiveCard({ objective }: { objective: MonthlyObjective }) {
  const ratio = objective.target?.value ? objective.progressCurrent / objective.target.value : 0;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{objective.title}</Text>
      <ProgressBar value={ratio} />
    </View>
  );
}

const styles = StyleSheet.create({ card: { padding: 12, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', gap: 8 }, title: { fontWeight: '700' } });
