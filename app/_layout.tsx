import 'react-native-reanimated';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppStore, useProfileStore } from '@/stores';

export default function RootLayout() {
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);
  const router = useRouter();
  const segments = useSegments();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Small delay to let navigation mount
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const inOnboarding = segments[0] === '(onboarding)';
    const needsOnboarding = !onboardingCompleted || !activeProfileId;

    if (needsOnboarding && !inOnboarding) {
      router.replace('/(onboarding)/welcome');
    } else if (!needsOnboarding && inOnboarding) {
      router.replace('/(tabs)/home');
    }
  }, [ready, onboardingCompleted, activeProfileId, segments]);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F8FC' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return <GestureHandlerRootView style={{ flex: 1 }}><Slot /></GestureHandlerRootView>;
}
