import { Pressable, Text, StyleSheet } from 'react-native';

export function AspectPickerCard({ name, selected, onPress }: { name: string; selected: boolean; onPress: () => void }) {
  return <Pressable style={[styles.card, selected && styles.selected]} onPress={onPress}><Text>{name}</Text></Pressable>;
}

const styles = StyleSheet.create({ card: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, padding: 12 }, selected: { borderColor: '#111827', backgroundColor: '#F3F4F6' } });
