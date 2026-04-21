import { View, Text, Pressable, StyleSheet } from 'react-native';

export function ProfileAvatarChip({ name, active, onPress }: { name: string; active?: boolean; onPress?: () => void }) {
  return <Pressable onPress={onPress} style={[styles.chip, active && styles.active]}><Text>{name}</Text></Pressable>;
}

const styles = StyleSheet.create({ chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: '#D1D5DB' }, active: { borderColor: '#111827', backgroundColor: '#F3F4F6' } });
