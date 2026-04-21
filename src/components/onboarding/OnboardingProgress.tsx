import { View, Text } from 'react-native';

export function OnboardingProgress({ step, total }: { step: number; total: number }) {
  return <View><Text>{step}/{total}</Text></View>;
}
