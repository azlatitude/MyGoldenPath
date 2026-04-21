import { SafeAreaView, StyleSheet, View } from 'react-native';
import type { PropsWithChildren } from 'react';
import { colors } from '@/theme/colors';

export function AppScreen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 16 }
});
