import { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTaskStore, usePlanningStore } from '@/stores';
import { todayKey, monthKeyFromDate } from '@/utils/date';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [linkedObjectiveId, setLinkedObjectiveId] = useState<string | undefined>();
  const profile = useCurrentProfile();
  const addTask = useTaskStore((s) => s.addTask);

  const monthlyObjectives = usePlanningStore((s) => s.monthlyObjectives)
    .filter((m) => m.profileId === profile?.id && m.monthKey === monthKeyFromDate() && m.status === 'active');
  const aspects = usePlanningStore((s) => s.aspects).filter((a) => a.profileId === profile?.id);

  const linkedObj = monthlyObjectives.find((m) => m.id === linkedObjectiveId);
  const linkedAspect = linkedObj ? aspects.find((a) => a.id === linkedObj.aspectId) : undefined;

  // Simple relevance check: warn if task title has no word overlap with any objective
  const showUnrelatedHint = title.trim().length > 5 && monthlyObjectives.length > 0 && !linkedObjectiveId &&
    !monthlyObjectives.some((m) => {
      const words = m.title.toLowerCase().split(/\s+/);
      const taskWords = title.toLowerCase().split(/\s+/);
      return words.some((w) => w.length > 3 && taskWords.some((tw) => tw.includes(w) || w.includes(tw)));
    });

  return (
    <AppScreen>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Add Task</Text>
      </View>

      {/* Monthly objectives as context */}
      {monthlyObjectives.length > 0 ? (
        <View style={s.objectiveSection}>
          <Text style={s.sectionLabel}>Link to a monthly objective:</Text>
          {monthlyObjectives.map((m) => {
            const aspect = aspects.find((a) => a.id === m.aspectId);
            const selected = linkedObjectiveId === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                style={[s.objectiveChip, selected && { backgroundColor: '#DBEAFE', borderColor: '#2563EB' }]}
                onPress={() => setLinkedObjectiveId(selected ? undefined : m.id)}
              >
                <View style={[s.aspectDot, { backgroundColor: aspect?.colorHex ?? '#9CA3AF' }]} />
                <Text style={[s.objectiveText, selected && { color: '#1E40AF' }]}>{m.title}</Text>
                {selected ? <Text style={s.checkmark}>✓</Text> : null}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={s.noObjectives}>
          <Text style={s.noObjectivesText}>No monthly objectives set. Tasks will be unlinked.</Text>
        </View>
      )}

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="What do you need to do today?"
        style={s.input}
        autoFocus
      />

      {showUnrelatedHint ? (
        <Text style={s.hint}>This task seems unrelated to your monthly objectives. Consider linking it or adding a relevant objective.</Text>
      ) : null}

      {linkedObj ? (
        <Text style={s.linkedInfo}>Linked to: {linkedObj.title} ({linkedAspect?.name})</Text>
      ) : null}

      <View style={{ marginTop: 14 }}>
        <PrimaryButton
          label="Add Task"
          onPress={() => {
            if (!profile || title.trim().length < 1) return;
            addTask({
              profileId: profile.id,
              title: title.trim(),
              dueDate: todayKey(),
              monthlyObjectiveId: linkedObjectiveId,
              aspectId: linkedAspect?.id,
            });
            router.back();
          }}
        />
      </View>
    </AppScreen>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { fontSize: 16, color: '#2563EB', marginRight: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  objectiveSection: { marginBottom: 14 },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginBottom: 6 },
  objectiveChip: {
    flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10,
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 6,
  },
  aspectDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  objectiveText: { fontSize: 14, color: '#374151', flex: 1 },
  checkmark: { fontSize: 16, color: '#2563EB', fontWeight: '700' },
  noObjectives: { backgroundColor: '#FEF3C7', borderRadius: 10, padding: 10, marginBottom: 14, borderWidth: 1, borderColor: '#FCD34D' },
  noObjectivesText: { fontSize: 13, color: '#92400E' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, padding: 12, fontSize: 16 },
  hint: { color: '#D97706', fontSize: 12, marginTop: 6, fontStyle: 'italic' },
  linkedInfo: { color: '#2563EB', fontSize: 12, marginTop: 6 },
});
