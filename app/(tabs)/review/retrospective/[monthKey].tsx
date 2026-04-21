import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { useRetrospectiveStore } from '@/stores';

export default function RetrospectiveDetailScreen() {
  const { monthKey } = useLocalSearchParams<{ monthKey: string }>();
  const retro = useRetrospectiveStore((s) => s.retrospectives.find((r) => r.monthKey === monthKey));

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '800' }}>Retrospective {monthKey}</Text>
      <Text style={{ marginTop: 10 }}>Completion: {Math.round((retro?.overallCompletionRate ?? 0) * 100)}%</Text>
      <Text>Unlinked tasks: {retro?.unlinkedTaskCount ?? 0}</Text>
      <Text>Gems earned: {retro?.totalGemsEarned ?? 0}</Text>
      <Text style={{ marginTop: 10 }}>Win: {retro?.reflectionWin ?? '-'}</Text>
      <Text>Improve: {retro?.reflectionImprove ?? '-'}</Text>
    </AppScreen>
  );
}
