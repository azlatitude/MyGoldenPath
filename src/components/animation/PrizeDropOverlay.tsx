import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import type { GemType, RarityTier } from '@/models';
import { ChestAnimation } from './ChestAnimation';
import { GemRevealAnimation } from './GemRevealAnimation';
import { SparkBurst } from './SparkBurst';
import { GemRarityBadge } from '@/components/gems/GemRarityBadge';

export interface PrizeDropOverlayProps {
  visible: boolean;
  gemType: GemType;
  rarity: RarityTier;
  sourceType: 'task_complete' | 'monthly_objective_complete';
  onComplete: () => void;
  onSkip: () => void;
}

export function PrizeDropOverlay({ visible, gemType, rarity, sourceType, onComplete, onSkip }: PrizeDropOverlayProps) {
  const [showGem, setShowGem] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [skipReady, setSkipReady] = useState(false);
  const overlayOpacity = useSharedValue(0);
  const chestScale = useSharedValue(0.4);
  const gemY = useSharedValue(60);
  const gemScale = useSharedValue(0.5);

  useEffect(() => {
    if (!visible) return;
    setShowGem(false);
    setShowBurst(false);
    setSkipReady(false);

    overlayOpacity.value = withTiming(1, { duration: 180 });
    chestScale.value = withSequence(
      withTiming(1.05, { duration: 360, easing: Easing.out(Easing.cubic) }),
      withSpring(1, { damping: 12, stiffness: 180, mass: 0.8 })
    );

    const openAt = sourceType === 'monthly_objective_complete' ? 1200 : 900;
    const dismissAt = sourceType === 'monthly_objective_complete' ? 3600 : 2400;

    const t1 = setTimeout(() => setSkipReady(true), openAt);
    const t2 = setTimeout(() => {
      setShowGem(true);
      setShowBurst(true);
      gemY.value = withSpring(0, { damping: 12, stiffness: 180, mass: 0.8 });
      gemScale.value = withSpring(1, { damping: 12, stiffness: 180, mass: 0.8 });
    }, openAt + 180);

    const t3 = setTimeout(() => {
      overlayOpacity.value = withTiming(0, { duration: 160 }, (done) => done && runOnJS(onComplete)());
    }, dismissAt);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible, sourceType, overlayOpacity, chestScale, gemY, gemScale, onComplete]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }));
  const chestStyle = useAnimatedStyle(() => ({ transform: [{ scale: chestScale.value }] }));
  const gemStyle = useAnimatedStyle(() => ({ transform: [{ translateY: gemY.value }, { scale: gemScale.value }] }));

  const title = useMemo(() => sourceType === 'monthly_objective_complete' ? 'Monthly Objective Complete!' : 'Collected!', [sourceType]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Pressable
        style={styles.root}
        onPress={() => {
          if (!skipReady) return;
          onSkip();
        }}
      >
        <Animated.View style={[styles.backdrop, overlayStyle]} />
        <View style={styles.center}>
          <Animated.View style={chestStyle}><ChestAnimation size={140} /></Animated.View>
          {showGem ? (
            <Animated.View style={[styles.gemWrap, gemStyle]}>
              <GemRevealAnimation gemType={gemType} rarity={rarity} />
              {showBurst ? <SparkBurst count={sourceType === 'monthly_objective_complete' ? 18 : 12} /> : null}
            </Animated.View>
          ) : null}
          <View style={styles.labels}>
            <Text style={styles.title}>{title}</Text>
            <GemRarityBadge rarity={rarity} />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,12,20,0.58)' },
  center: { alignItems: 'center', justifyContent: 'center', width: '100%' },
  gemWrap: { marginTop: -40, marginBottom: 14 },
  labels: { alignItems: 'center', gap: 8 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' }
});
