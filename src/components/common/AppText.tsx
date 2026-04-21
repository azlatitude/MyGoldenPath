import { Text, StyleSheet } from 'react-native';
import type { PropsWithChildren } from 'react';

export function AppText({ children }: PropsWithChildren) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({ text: { color: '#111827', fontSize: 16 } });
