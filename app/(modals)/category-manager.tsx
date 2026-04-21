import { ScrollView, Text, View } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { usePlanningStore } from '@/stores';

export default function CategoryManagerModal() {
  const categories = usePlanningStore((s) => s.categories);
  return (
    <AppScreen>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>Category Manager</Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {categories.map((c) => (
          <View key={c.id} style={{ padding: 10, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, backgroundColor: '#fff' }}>
            <Text style={{ fontWeight: '700' }}>{c.name}</Text>
            <Text style={{ color: '#6B7280' }}>{c.aspectId}</Text>
          </View>
        ))}
      </ScrollView>
    </AppScreen>
  );
}
