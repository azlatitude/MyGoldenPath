import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import type { GemType, RarityTier } from '@/models';
import { GEM_VISUAL_SPECS } from '@/constants/gem-visuals';
import { GemGradientDefs } from './GemGradientDefs';
import { GemGlow } from './GemGlow';
import { GemSparkleLayer } from './GemSparkleLayer';

export interface GemIconProps {
  gemType: GemType;
  size: number;
  animated?: boolean;
  glow?: boolean;
  rarity?: RarityTier;
}

export const GemIcon = memo(function GemIcon({ gemType, size, animated = true, glow = true }: GemIconProps) {
  const spec = GEM_VISUAL_SPECS[gemType];
  const shimmer = useSharedValue(0);

  useEffect(() => {
    if (!animated) return;
    shimmer.value = withRepeat(
      withTiming(1, { duration: spec.shimmerDurationMs, easing: Easing.inOut(Easing.cubic) }),
      -1,
      false
    );
  }, [animated, shimmer, spec.shimmerDurationMs]);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 0.5, 1], [0.2, 0.7, 0.2]),
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-size * 0.2, size * 0.2]) }]
  }));

  const gradientId = `gem-${gemType}`;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {glow ? <GemGlow color={spec.glowColor} size={size} opacity={spec.glowOpacity} /> : null}
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <GemGradientDefs gemType={gemType} gradientId={gradientId} />
        <Path d={spec.shapePath} fill={`url(#${gradientId})`} />
        {spec.facetPaths.map((path) => <Path key={path} d={path} stroke="rgba(255,255,255,0.36)" strokeWidth={1.2} fill="none" />)}
      </Svg>
      {animated ? <Animated.View pointerEvents="none" style={[styles.shimmer, shimmerStyle]} /> : null}
      {animated ? <GemSparkleLayer density={spec.sparkleDensity} /> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  shimmer: {
    position: 'absolute',
    width: 24,
    height: '90%',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 999
  }
});
