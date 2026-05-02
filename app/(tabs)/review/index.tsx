import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { RetrospectiveSummaryCard } from '@/components/charts/RetrospectiveSummaryCard';
import { useRetrospectiveStore } from '@/stores';
import { Pressable } from 'react-native';

export default function ReviewScreen() {
  const retros = useRetrospectiveStore((s) => s.retrospectives);
  return (
    <AppScreen>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Monthly Review</Text>
      </View>
      <ScrollView contentContainerStyle={{ gap: 8, paddingBottom: 40 }}>
        {retros.map((r) => (
          <Pressable key={r.id} onPress={() => router.push(`/(tabs)/review/retrospective/${r.monthKey}`)}>
            <RetrospectiveSummaryCard monthKey={r.monthKey} completion={r.overallCompletionRate} />
          </Pressable>
        ))}
        {!retros.length ? <Text style={{ color: '#6B7280' }}>No retrospectives yet. Reviews appear at the end of each month.</Text> : null}
      </ScrollView>
    </AppScreen>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { paddingRight: 12 },
  backText: { fontSize: 16, color: '#2563EB' },
  title: { fontSize: 24, fontWeight: '800', flex: 1 },
});
