import { View, Text, StyleSheet } from 'react-native';
import type { RarityTier } from '@/models';
import { RARITY_THEME } from '@/constants/theme';

export function GemRarityBadge({ rarity }: { rarity: RarityTier }) {
  return (
    <View style={[styles.badge, { backgroundColor: `${RARITY_THEME[rarity]}22`, borderColor: RARITY_THEME[rarity] }]}>
      <Text style={[styles.text, { color: RARITY_THEME[rarity] }]}>{rarity.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ badge: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 }, text: { fontSize: 10, fontWeight: '800' } });
