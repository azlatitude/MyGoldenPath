import { ScrollView, Text } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { RetrospectiveSummaryCard } from '@/components/charts/RetrospectiveSummaryCard';
import { useRetrospectiveStore } from '@/stores';
import { Pressable } from 'react-native';

export default function ReviewScreen() {
  const retros = useRetrospectiveStore((s) => s.retrospectives);
  return (
    <AppScreen>
      <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 12 }}>Review</Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {retros.map((r) => (
          <Pressable key={r.id} onPress={() => router.push(`/(tabs)/review/retrospective/${r.monthKey}`)}>
            <RetrospectiveSummaryCard monthKey={r.monthKey} completion={r.overallCompletionRate} />
          </Pressable>
        ))}
      </ScrollView>
    </AppScreen>
  );
}
