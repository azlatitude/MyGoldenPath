import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { GemIcon } from '@/components/gems/GemIcon';
import type { GemType } from '@/models';

export default function GemDetailScreen() {
  const { gemType } = useLocalSearchParams<{ gemType: GemType }>();
  const type = (gemType ?? 'obsidian') as GemType;
  return (
    <AppScreen>
      <GemIcon gemType={type} size={180} animated glow />
      <Text style={{ fontSize: 22, fontWeight: '800', textTransform: 'capitalize' }}>{String(type).replace('_', ' ')}</Text>
    </AppScreen>
  );
}
