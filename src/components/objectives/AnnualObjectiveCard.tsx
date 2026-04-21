import { View, Text, StyleSheet } from 'react-native';
import type { AnnualObjective } from '@/models';

export function AnnualObjectiveCard({ objective }: { objective: AnnualObjective }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{objective.title}</Text>
      <Text style={styles.meta}>{objective.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ card: { padding: 12, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB' }, title: { fontWeight: '700' }, meta: { color: '#6B7280', marginTop: 4 } });
