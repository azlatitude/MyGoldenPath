import { useMemo } from 'react';
import { ScrollView, Text } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { MonthlyObjectiveCard } from '@/components/objectives/MonthlyObjectiveCard';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore } from '@/stores';
import { monthKeyFromDate } from '@/utils/date';

export default function MonthlyObjectivesScreen() {
  const profile = useCurrentProfile();
  const monthly = usePlanningStore((s) => s.monthlyObjectives);
  const monthKey = monthKeyFromDate();
  const list = useMemo(() => monthly.filter((m) => m.profileId === profile?.id && m.monthKey === monthKey), [monthly, profile?.id, monthKey]);

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Monthly Objectives</Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {list.map((item) => <MonthlyObjectiveCard key={item.id} objective={item} />)}
        {!list.length ? <Text style={{ color: '#6B7280' }}>No monthly objectives for {monthKey}.</Text> : null}
      </ScrollView>
    </AppScreen>
  );
}
