import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const buildSparkles = (density: number): Sparkle[] => {
  const count = Math.max(6, Math.round(6 + density * 10));
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 1200
  }));
};

function Spark({ sparkle }: { sparkle: Sparkle }) {
  const v = useSharedValue(0);

  useEffect(() => {
    v.value = withDelay(
      sparkle.delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 160, easing: Easing.out(Easing.back(1.8)) }),
          withTiming(0, { duration: 340 })
        ),
        -1,
        true
      )
    );
  }, [sparkle.delay, v]);

  const style = useAnimatedStyle(() => ({
    opacity: v.value,
    transform: [{ scale: 0.5 + v.value }]
  }));

  return <Animated.View style={[styles.spark, style, { left: `${sparkle.x}%`, top: `${sparkle.y}%`, width: sparkle.size, height: sparkle.size }]} />;
}

export function GemSparkleLayer({ density }: { density: number }) {
  const sparkles = buildSparkles(density);
  return <View pointerEvents="none" style={StyleSheet.absoluteFill}>{sparkles.map((sparkle) => <Spark key={sparkle.id} sparkle={sparkle} />)}</View>;
}

const styles = StyleSheet.create({
  spark: { position: 'absolute', borderRadius: 99, backgroundColor: '#FFFFFF' }
});
