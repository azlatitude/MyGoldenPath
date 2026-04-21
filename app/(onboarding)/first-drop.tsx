import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrizeDropOverlay } from '@/components/animation/PrizeDropOverlay';
import { useAppStore, useGemStore } from '@/stores';

export default function FirstDropScreen() {
  const [visible, setVisible] = useState(true);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const inventory = useGemStore((s) => s.inventory);

  useEffect(() => {
    const now = new Date().toISOString();
    if (!inventory.some((i) => i.gemType === 'golden_coin' && i.sourceType === 'achievement')) {
      useGemStore.setState((state) => ({
        inventory: [
          ...state.inventory,
          {
            id: `onboard-${Date.now()}`,
            profileId: 'active-profile',
            gemType: 'golden_coin',
            rarity: 'epic',
            obtainedAt: now,
            sourceType: 'achievement',
            sourceId: 'onboarding',
            isRedeemed: false
          }
        ]
      }));
    }
  }, [inventory]);

  return (
    <AppScreen>
      <PrizeDropOverlay
        visible={visible}
        gemType="golden_coin"
        rarity="epic"
        sourceType="task_complete"
        onSkip={() => {
          setVisible(false);
          completeOnboarding();
          router.replace('/(tabs)/home');
        }}
        onComplete={() => {
          setVisible(false);
          completeOnboarding();
          router.replace('/(tabs)/home');
        }}
      />
    </AppScreen>
  );
}
