import { View, Text, StyleSheet } from 'react-native';

export function IconBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.wrap}>
      <Text>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { flexDirection: 'row', gap: 6, alignItems: 'center' }, label: { color: '#374151' } });
