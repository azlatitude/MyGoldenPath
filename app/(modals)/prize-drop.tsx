import { PrizeDropOverlay } from '@/components/animation/PrizeDropOverlay';
import { useState } from 'react';
import { router } from 'expo-router';

export default function PrizeDropModal() {
  const [visible, setVisible] = useState(true);
  return (
    <PrizeDropOverlay
      visible={visible}
      gemType="diamond"
      rarity="legendary"
      sourceType="monthly_objective_complete"
      onComplete={() => {
        setVisible(false);
        router.back();
      }}
      onSkip={() => {
        setVisible(false);
        router.back();
      }}
    />
  );
}
