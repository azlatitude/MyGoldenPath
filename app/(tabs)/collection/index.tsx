import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { CollectionGemTile } from '@/components/gems/CollectionGemTile';
import { RedeemGemPanel } from '@/components/family/RedeemGemPanel';
import { useGemStore } from '@/stores';

export default function CollectionScreen() {
  const inventory = useGemStore((s) => s.inventory);
  const markRedeemed = useGemStore((s) => s.markGemInventoryAsRedeemed);

  return (
    <AppScreen>
      <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 12 }}>Collection</Text>
      <ScrollView contentContainerStyle={{ gap: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {inventory.map((item) => (
          <CollectionGemTile key={item.id} item={item} onPress={() => router.push(`/(tabs)/collection/gem/${item.gemType}`)} />
        ))}
      </ScrollView>
      <View style={{ marginTop: 12 }}>
        <RedeemGemPanel onConfirmRedeem={(note) => markRedeemed(inventory.filter((i) => !i.isRedeemed).slice(0, 1).map((i) => i.id), note)} />
      </View>
    </AppScreen>
  );
}
