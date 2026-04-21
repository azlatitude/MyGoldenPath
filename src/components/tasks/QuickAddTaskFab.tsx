import { Pressable, StyleSheet, Text } from 'react-native';

export function QuickAddTaskFab({ onPress }: { onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.fab}><Text style={styles.label}>+</Text></Pressable>;
}

const styles = StyleSheet.create({ fab: { position: 'absolute', right: 18, bottom: 24, width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827' }, label: { color: '#fff', fontSize: 28, marginTop: -2 } });
