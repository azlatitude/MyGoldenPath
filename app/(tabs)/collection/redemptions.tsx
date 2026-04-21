import { ScrollView, Text, View } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { useGemStore } from '@/stores';

export default function RedemptionsScreen() {
  const redemptions = useGemStore((s) => s.redemptions);
  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Redemptions</Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {redemptions.map((r) => (
          <View key={r.id} style={{ padding: 12, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#fff' }}>
            <Text style={{ fontWeight: '700' }}>{new Date(r.redeemedAt).toLocaleDateString()}</Text>
            <Text style={{ color: '#6B7280' }}>{r.gemTypes.join(', ')}</Text>
            <Text>{r.note || 'No note'}</Text>
          </View>
        ))}
        {!redemptions.length ? <Text style={{ color: '#6B7280' }}>No redemptions yet.</Text> : null}
      </ScrollView>
    </AppScreen>
  );
}
