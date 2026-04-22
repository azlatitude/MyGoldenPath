import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack, useRouter, useRootNavigationState } from 'expo-router';
import { useAppStore, useProfileStore } from '@/stores';

export default function RootLayout() {
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    if (!onboardingCompleted || !activeProfileId) {
      router.replace('/(onboarding)/welcome');
    }
  }, [navigationState?.key, onboardingCompleted, activeProfileId]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(modals)" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
