import { ScrollView, Text, View } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { usePlanningStore } from '@/stores';

export default function AspectManagerModal() {
  const aspects = usePlanningStore((s) => s.aspects);
  return (
    <AppScreen>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>Aspect Manager</Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {aspects.map((a) => (
          <View key={a.id} style={{ padding: 10, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, backgroundColor: '#fff' }}>
            <Text style={{ fontWeight: '700' }}>{a.name}</Text>
            <Text style={{ color: '#6B7280' }}>{a.colorHex}</Text>
          </View>
        ))}
      </ScrollView>
    </AppScreen>
  );
}
