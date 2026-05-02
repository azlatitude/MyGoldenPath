import { Text, View } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';

export default function SettingsModal() {
  const profile = useCurrentProfile();
  return (
    <AppScreen>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>Settings</Text>
      <View style={{ gap: 8 }}>
        <Text>Active profile: {profile?.name ?? 'None'}</Text>
        <Text>Reduced motion: Off</Text>
        <Text>Prize animation: On</Text>
      </View>
    </AppScreen>
  );
}
