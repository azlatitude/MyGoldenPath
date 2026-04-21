import { ScrollView, Text, View } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTaskStore } from '@/stores';

export default function RoutinesScreen() {
  const profile = useCurrentProfile();
  const recurring = useTaskStore((s) => s.recurringTasks).filter((r) => r.profileId === profile?.id);

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Recurring Routines</Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {recurring.map((r) => (
          <View key={r.id} style={{ backgroundColor: '#fff', borderColor: '#E5E7EB', borderWidth: 1, borderRadius: 12, padding: 12 }}>
            <Text style={{ fontWeight: '700' }}>{r.title}</Text>
            <Text style={{ color: '#6B7280' }}>{r.pattern}</Text>
          </View>
        ))}
        {!recurring.length ? <Text style={{ color: '#6B7280' }}>No routines configured.</Text> : null}
      </ScrollView>
    </AppScreen>
  );
}
