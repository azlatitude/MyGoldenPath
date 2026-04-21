import { View, StyleSheet } from 'react-native';

export function ProgressBar({ value }: { value: number }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.max(0, Math.min(1, value)) * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, borderRadius: 999, backgroundColor: '#E5E7EB', overflow: 'hidden' },
  fill: { height: 8, backgroundColor: '#10B981' }
});
