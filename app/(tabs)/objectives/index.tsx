import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { useMonthlyProgress } from '@/hooks/useMonthlyProgress';
import { MonthlyObjectiveCard } from '@/components/objectives/MonthlyObjectiveCard';

export default function ObjectivesScreen() {
  const monthly = useMonthlyProgress();
  return (
    <AppScreen>
      <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 12 }}>Objectives</Text>
      <View style={{ gap: 8 }}>{monthly.map((m) => <MonthlyObjectiveCard key={m.id} objective={m} />)}</View>
      <View style={{ marginTop: 12, gap: 8 }}>
        <Link href="/(tabs)/objectives/annual">Annual</Link>
        <Link href="/(tabs)/objectives/monthly">Monthly</Link>
        <Link href="/(tabs)/objectives/routines">Routines</Link>
      </View>
    </AppScreen>
  );
}
