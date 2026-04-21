import { ScrollView } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { ProfileAvatarChip } from '@/components/family/ProfileAvatarChip';
import { useProfileStore } from '@/stores';

export default function ProfileSwitcherModal() {
  const profiles = useProfileStore((s) => s.profiles);
  const active = useProfileStore((s) => s.activeProfileId);
  const switchActiveProfile = useProfileStore((s) => s.switchActiveProfile);
  return (
    <AppScreen>
      <ScrollView horizontal contentContainerStyle={{ gap: 8 }}>
        {profiles.map((p) => <ProfileAvatarChip key={p.id} name={p.name} active={p.id === active} onPress={() => switchActiveProfile(p.id)} />)}
      </ScrollView>
    </AppScreen>
  );
}
