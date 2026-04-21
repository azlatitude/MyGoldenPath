import { router } from 'expo-router';
import { Text } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useAppStore, useProfileStore } from '@/stores';

export default function WelcomeScreen() {
  const createProfile = useProfileStore((s) => s.createProfile);
  const setOnboardingStep = useAppStore((s) => s.setOnboardingStep);

  return (
    <AppScreen>
      <Text style={{ fontSize: 32, fontWeight: '800', marginBottom: 8 }}>MyGoldenPath</Text>
      <Text style={{ marginBottom: 20 }}>Turn life goals into a rewarding daily path.</Text>
      <PrimaryButton
        label="Get Started"
        onPress={() => {
          createProfile({ name: 'Me', role: 'adult', avatarSeed: 'seed-me', colorHex: '#3B82F6' });
          setOnboardingStep('aspects');
          router.push('/(onboarding)/aspects');
        }}
      />
    </AppScreen>
  );
}
