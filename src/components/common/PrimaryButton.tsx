import { Pressable, Text, StyleSheet } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
}

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#111827', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, alignItems: 'center' },
  label: { color: '#FFFFFF', fontWeight: '700' }
});
