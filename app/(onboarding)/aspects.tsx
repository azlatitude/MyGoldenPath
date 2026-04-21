import { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { AspectPickerCard } from '@/components/onboarding/AspectPickerCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useProfileStore, usePlanningStore, useAppStore, useUiStore } from '@/stores';

const defaults = [
  { name: 'Work', icon: 'briefcase', colorHex: '#3B82F6' },
  { name: 'Family', icon: 'users', colorHex: '#F97316' },
  { name: 'Self', icon: 'sparkles', colorHex: '#10B981' }
];

export default function AspectsScreen() {
  const profileId = useProfileStore((s) => s.activeProfileId)!;
  const createAspect = usePlanningStore((s) => s.createAspect);
  const setOnboardingStep = useAppStore((s) => s.setOnboardingStep);
  const setOnboardingDraft = useUiStore((s) => s.setOnboardingDraft);
  const [selected, setSelected] = useState<string[]>(defaults.map((d) => d.name));

  const canContinue = useMemo(() => selected.length > 0, [selected]);

  return (
    <AppScreen>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Choose Your Aspects</Text>
      <FlatList
        data={defaults}
        renderItem={({ item }) => (
          <AspectPickerCard
            name={item.name}
            selected={selected.includes(item.name)}
            onPress={() => setSelected((curr) => (curr.includes(item.name) ? curr.filter((n) => n !== item.name) : [...curr, item.name]))}
          />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ gap: 10 }}
      />
      <View style={{ marginTop: 16 }}>
        <PrimaryButton
          label="Continue"
          onPress={() => {
            const ids = defaults.filter((d) => selected.includes(d.name)).map((d) => createAspect({ profileId, name: d.name, icon: d.icon, colorHex: d.colorHex }));
            setOnboardingDraft({ aspectIds: ids });
            setOnboardingStep('annual-objective');
            router.push('/(onboarding)/annual-objective');
          }}
        />
      </View>
    </AppScreen>
  );
}
