import { useMemo } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { GemIcon } from '@/components/gems/GemIcon';
import { useGemStore } from '@/stores';
import type { GemType } from '@/models';

const RARITY_ORDER: Record<string, number> = { legendary: 0, epic: 1, rare: 2, uncommon: 3, common: 4 };
const RARITY_LABELS: Record<string, { label: string; color: string }> = {
  legendary: { label: 'Legendary', color: '#F59E0B' },
  epic: { label: 'Epic', color: '#A855F7' },
  rare: { label: 'Rare', color: '#3B82F6' },
  uncommon: { label: 'Uncommon', color: '#22C55E' },
  common: { label: 'Common', color: '#9CA3AF' },
};

interface GemGroup { gemType: GemType; rarity: string; count: number; }

export default function CollectionScreen() {
  const inventory = useGemStore((s) => s.inventory);

  const grouped = useMemo(() => {
    const map = new Map<string, GemGroup>();
    inventory.forEach((item) => {
      const key = item.gemType;
      const existing = map.get(key);
      if (existing) { existing.count++; }
      else { map.set(key, { gemType: item.gemType, rarity: item.rarity, count: 1 }); }
    });
    return Array.from(map.values()).sort((a, b) => (RARITY_ORDER[a.rarity] ?? 5) - (RARITY_ORDER[b.rarity] ?? 5));
  }, [inventory]);

  const totalGems = inventory.length;
  const uniqueTypes = grouped.length;

  // Group by rarity for shelves
  const shelves = useMemo(() => {
    const byRarity = new Map<string, GemGroup[]>();
    grouped.forEach((g) => {
      const arr = byRarity.get(g.rarity) || [];
      arr.push(g);
      byRarity.set(g.rarity, arr);
    });
    return Array.from(byRarity.entries()).sort(([a], [b]) => (RARITY_ORDER[a] ?? 5) - (RARITY_ORDER[b] ?? 5));
  }, [grouped]);

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        {/* Vault Header */}
        <View style={s.header}>
          <Text style={s.vaultTitle}>Treasure Vault</Text>
          <Text style={s.vaultStats}>{totalGems} gems · {uniqueTypes} types discovered</Text>
        </View>

        {shelves.length === 0 ? (
          <View style={s.emptyVault}>
            <Text style={s.emptyText}>Your vault is empty.</Text>
            <Text style={s.emptySubtext}>Complete tasks to collect gems!</Text>
          </View>
        ) : null}

        {/* Gem shelves by rarity */}
        {shelves.map(([rarity, gems]) => {
          const info = RARITY_LABELS[rarity] || RARITY_LABELS.common;
          return (
            <View key={rarity} style={s.shelfSection}>
              {/* Shelf label */}
              <View style={s.shelfHeader}>
                <View style={[s.rarityDot, { backgroundColor: info.color }]} />
                <Text style={[s.shelfLabel, { color: info.color }]}>{info.label}</Text>
              </View>
              {/* Shelf with gems */}
              <View style={s.shelf}>
                <View style={s.shelfGems}>
                  {gems.map((g) => (
                    <View key={g.gemType} style={s.gemSlot}>
                      <View style={s.gemGlowBg}>
                        <GemIcon gemType={g.gemType} size={52} animated glow rarity={g.rarity as any} />
                      </View>
                      <Text style={s.gemName}>{g.gemType.replace(/_/g, ' ')}</Text>
                      <Text style={s.gemCount}>x{g.count}</Text>
                    </View>
                  ))}
                </View>
                {/* Shelf edge */}
                <View style={s.shelfEdge} />
                <View style={s.shelfShadow} />
              </View>
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1120' },
  scroll: { paddingHorizontal: 16, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 24 },
  vaultTitle: { fontSize: 28, fontWeight: '800', color: '#F5D680', letterSpacing: 1 },
  vaultStats: { fontSize: 13, color: '#8B8FA3', marginTop: 4 },
  emptyVault: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 18, color: '#4B5068', fontWeight: '600' },
  emptySubtext: { fontSize: 14, color: '#3A3E52', marginTop: 4 },
  shelfSection: { marginBottom: 20 },
  shelfHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingLeft: 4 },
  rarityDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  shelfLabel: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5 },
  shelf: { position: 'relative' },
  shelfGems: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
    paddingHorizontal: 12, paddingTop: 16, paddingBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  shelfEdge: {
    height: 4,
    backgroundColor: '#2A2D42',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginHorizontal: 2,
  },
  shelfShadow: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginHorizontal: 6,
  },
  gemSlot: { alignItems: 'center', width: 80 },
  gemGlowBg: {
    width: 68, height: 68, borderRadius: 34,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  gemName: { fontSize: 10, color: '#A0A4B8', marginTop: 4, textTransform: 'capitalize', textAlign: 'center' },
  gemCount: { fontSize: 12, color: '#F5D680', fontWeight: '700' },
});
