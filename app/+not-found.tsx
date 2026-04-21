import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen not found.</Text>
      <Link href="/(tabs)/home">Go home</Link>
    </View>
  );
}
