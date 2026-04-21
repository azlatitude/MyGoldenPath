import { StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

export function GemGlow({ color, size, opacity }: { color: string; size: number; opacity: number }) {
  const pulse = useSharedValue(0.9);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.9, { duration: 1800, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [pulse]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: opacity * pulse.value
  }));

  return <Animated.View style={[styles.glow, style, { width: size * 1.2, height: size * 1.2, borderRadius: size, backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8
  }
});
