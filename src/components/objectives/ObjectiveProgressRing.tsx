import { View, Text } from 'react-native';

export function ObjectiveProgressRing({ value }: { value: number }) {
  return <View><Text>{Math.round(value * 100)}%</Text></View>;
}
