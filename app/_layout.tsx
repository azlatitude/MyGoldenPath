import 'react-native-reanimated';
import { Stack, Redirect } from 'expo-router';
import { useAppStore, useProfileStore } from '@/stores';

export default function RootLayout() {
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);

  if (!onboardingCompleted || !activeProfileId) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(modals)" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
