import { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete: () => void;
}

export function SwipeableRow({ children, onDelete }: SwipeableRowProps) {
  const ref = useRef<Swipeable>(null);

  const renderRightActions = (_progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    const trans = dragX.interpolate({ inputRange: [-80, 0], outputRange: [0, 80], extrapolate: 'clamp' });
    return (
      <Animated.View style={[s.deleteContainer, { transform: [{ translateX: trans }] }]}>
        <TouchableOpacity
          style={s.deleteBtn}
          onPress={() => {
            ref.current?.close();
            onDelete();
          }}
        >
          <Text style={s.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable ref={ref} renderRightActions={renderRightActions} overshootRight={false} friction={2}>
      {children}
    </Swipeable>
  );
}

const s = StyleSheet.create({
  deleteContainer: { width: 80, justifyContent: 'center', alignItems: 'center' },
  deleteBtn: { backgroundColor: '#EF4444', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, height: '90%', justifyContent: 'center' },
  deleteText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
