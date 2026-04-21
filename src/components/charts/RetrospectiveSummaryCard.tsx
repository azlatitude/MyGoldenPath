import { View, Text } from 'react-native';

export function RetrospectiveSummaryCard({ monthKey, completion }: { monthKey: string; completion: number }) {
  return <View><Text>{monthKey} - {Math.round(completion * 100)}%</Text></View>;
}
