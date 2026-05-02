import { Link, usePathname, useSegments } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  const pathname = usePathname();
  const segments = useSegments();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Screen not found</Text>
      <Text style={{ marginTop: 10, color: '#666' }}>Path: {pathname}</Text>
      <Text style={{ marginTop: 4, color: '#666' }}>Segments: {JSON.stringify(segments)}</Text>
      <Link href="/(tabs)/home" style={{ marginTop: 20, color: '#2563EB' }}>Go home</Link>
    </View>
  );
}
