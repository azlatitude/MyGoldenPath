import { View, StyleSheet } from 'react-native';
import { GemIcon } from '@/components/gems/GemIcon';
import type { GemType, RarityTier } from '@/models';

export function GemRevealAnimation({ gemType, rarity }: { gemType: GemType; rarity: RarityTier }) {
  return (
    <View style={styles.wrap}>
      <GemIcon gemType={gemType} size={148} animated glow rarity={rarity} />
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { alignItems: 'center', justifyContent: 'center' } });
