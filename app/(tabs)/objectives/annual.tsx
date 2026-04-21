import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { AnnualObjectiveCard } from '@/components/objectives/AnnualObjectiveCard';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore } from '@/stores';

export default function AnnualObjectivesScreen() {
  const profile = useCurrentProfile();
  const annual = usePlanningStore((s) => s.annualObjectives);
  const list = useMemo(() => annual.filter((a) => a.profileId === profile?.id), [annual, profile?.id]);

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Annual Objectives</Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {list.map((item) => <AnnualObjectiveCard key={item.id} objective={item} />)}
        {!list.length ? <Text style={{ color: '#6B7280' }}>No annual objectives yet.</Text> : null}
      </ScrollView>
    </AppScreen>
  );
}
