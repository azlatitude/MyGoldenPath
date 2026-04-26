import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore, useRetrospectiveStore } from '@/stores';
import { monthKeyFromDate } from '@/utils/date';

function MenuCard({ title, subtitle, onPress }: { title: string; subtitle: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <Text style={styles.cardArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const profile = useCurrentProfile();
  const annualCount = usePlanningStore((s) => s.annualObjectives.filter((a) => a.profileId === profile?.id).length);
  const monthlyCount = usePlanningStore((s) => s.monthlyObjectives.filter((m) => m.profileId === profile?.id && m.monthKey === monthKeyFromDate()).length);
  const retroCount = useRetrospectiveStore((s) => s.retrospectives.filter((r) => r.profileId === profile?.id).length);

  return (
    <AppScreen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile?.name?.[0]?.toUpperCase() ?? '?'}</Text>
          </View>
          <Text style={styles.name}>{profile?.name ?? 'User'}</Text>
          <Text style={styles.role}>{profile?.role ?? 'adult'}</Text>
        </View>

        {/* Goals Section */}
        <Text style={styles.sectionTitle}>My Goals</Text>
        <MenuCard
          title="Annual Objectives"
          subtitle={`${annualCount} objective${annualCount !== 1 ? 's' : ''} set for ${new Date().getFullYear()}`}
          onPress={() => router.push('/(tabs)/objectives/annual')}
        />
        <MenuCard
          title="Monthly Objectives"
          subtitle={`${monthlyCount} objective${monthlyCount !== 1 ? 's' : ''} this month`}
          onPress={() => router.push('/(tabs)/objectives/monthly')}
        />
        <MenuCard
          title="Daily Routines"
          subtitle="Recurring tasks that auto-appear each day"
          onPress={() => router.push('/(tabs)/objectives/routines')}
        />

        {/* Review Section */}
        <Text style={styles.sectionTitle}>Review</Text>
        <MenuCard
          title="Monthly Retrospective"
          subtitle={`${retroCount} review${retroCount !== 1 ? 's' : ''} completed`}
          onPress={() => router.push('/(tabs)/review')}
        />

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <MenuCard
          title="Switch Profile"
          subtitle="Manage family profiles"
          onPress={() => router.push('/(modals)/profile-switcher')}
        />
        <MenuCard
          title="Manage Aspects"
          subtitle="Work, Family, Self — customize your life dimensions"
          onPress={() => router.push('/(modals)/aspect-manager')}
        />
        <MenuCard
          title="App Settings"
          subtitle="Notifications, preferences"
          onPress={() => router.push('/(modals)/settings')}
        />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingVertical: 24 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', marginTop: 10, color: '#111827' },
  role: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#9CA3AF', marginTop: 24, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 8, borderWidth: 1, borderColor: '#E5E7EB',
    flexDirection: 'column',
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  cardSubtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  cardArrow: { position: 'absolute', right: 16, top: 18, fontSize: 22, color: '#D1D5DB' },
});
