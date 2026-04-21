import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { GemInventoryItem } from '@/models';
import { GemIcon } from './GemIcon';

export function CollectionGemTile({ item, count = 1, onPress }: { item: GemInventoryItem; count?: number; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.tile, item.isRedeemed && styles.redeemed]}>
      <GemIcon gemType={item.gemType} size={56} animated glow rarity={item.rarity} />
      <View style={styles.bottom}><Text style={styles.name}>{item.gemType.replace('_', ' ')}</Text><Text>x{count}</Text></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: { width: '48%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, padding: 10, alignItems: 'center', gap: 8, backgroundColor: '#FFF' },
  bottom: { alignItems: 'center' },
  name: { fontSize: 12, textTransform: 'capitalize' },
  redeemed: { opacity: 0.55 }
});
