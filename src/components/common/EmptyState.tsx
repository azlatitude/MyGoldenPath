import { View, Text, StyleSheet } from 'react-native';

export function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB' }, title: { fontWeight: '700' }, sub: { color: '#6B7280', marginTop: 6 } });
