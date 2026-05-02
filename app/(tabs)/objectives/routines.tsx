import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTaskStore } from '@/stores';
import { todayKey } from '@/utils/date';

export default function RoutinesScreen() {
  const profile = useCurrentProfile();
  const recurring = useTaskStore((s) => s.recurringTasks).filter((r) => r.profileId === profile?.id);
  const addRecurringTask = useTaskStore((s) => s.addRecurringTask);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!profile || title.trim().length < 2) return;
    addRecurringTask({ profileId: profile.id, title: title.trim(), pattern: 'daily', startDate: todayKey() });
    setTitle('');
    setAdding(false);
  };

  return (
    <AppScreen>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Daily Routines</Text>
      </View>
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 40 }}>
        {recurring.map((r) => (
          <View key={r.id} style={s.card}>
            <Text style={s.cardTitle}>{r.title}</Text>
            <Text style={s.cardStatus}>{r.pattern}{r.isPaused ? ' · paused' : ''}</Text>
          </View>
        ))}
        {!recurring.length && !adding ? <Text style={{ color: '#6B7280' }}>No routines yet. Add recurring tasks that appear every day.</Text> : null}
        {adding ? (
          <View style={s.addForm}>
            <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder="e.g., Run 3km, Read 30 min, Practice piano" autoFocus />
            <View style={s.addActions}>
              <TouchableOpacity onPress={() => setAdding(false)}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleAdd} style={s.saveBtn}><Text style={s.saveBtnText}>Save</Text></TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setAdding(true)} style={s.addBtn}>
            <Text style={s.addBtnText}>+ Add Daily Routine</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </AppScreen>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { paddingRight: 12 },
  backText: { fontSize: 16, color: '#2563EB' },
  title: { fontSize: 24, fontWeight: '800', flex: 1 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardStatus: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  addForm: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#C7D2FE' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 12, fontSize: 15 },
  addActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  cancelText: { color: '#6B7280', fontSize: 15 },
  saveBtn: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  addBtn: { borderWidth: 1, borderColor: '#C7D2FE', borderRadius: 14, padding: 16, alignItems: 'center', borderStyle: 'dashed' },
  addBtnText: { color: '#2563EB', fontWeight: '600', fontSize: 15 },
});
