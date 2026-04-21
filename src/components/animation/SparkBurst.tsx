import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

function SparkParticle({ angle, delay }: { angle: number; delay: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(1, { duration: 420, easing: Easing.out(Easing.quad) }));
  }, [delay, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [
      { translateX: Math.cos(angle) * (20 + 68 * progress.value) },
      { translateY: Math.sin(angle) * (20 + 68 * progress.value) },
      { scale: 1 - 0.4 * progress.value }
    ]
  }));

  return <Animated.View style={[styles.spark, style]} />;
}

export function SparkBurst({ count = 12 }: { count?: number }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: count }).map((_, idx) => (
        <SparkParticle key={idx} angle={(Math.PI * 2 * idx) / count} delay={idx * 20} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  spark: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: '#FFF'
  }
});
