import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { SwipeableRow } from '@/components/common/SwipeableRow';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTaskStore } from '@/stores';
import { todayKey } from '@/utils/date';

export default function RoutinesScreen() {
  const profile = useCurrentProfile();
  const recurring = useTaskStore((s) => s.recurringTasks).filter((r) => r.profileId === profile?.id && !r.isArchived);
  const addRecurringTask = useTaskStore((s) => s.addRecurringTask);
  const updateRecurringTask = useTaskStore((s) => s.updateRecurringTask);
  const deleteRecurringTask = useTaskStore((s) => s.deleteRecurringTask);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAdd = () => {
    if (!profile || title.trim().length < 2) return;
    addRecurringTask({ profileId: profile.id, title: title.trim(), pattern: 'daily', startDate: todayKey() });
    setTitle('');
    setAdding(false);
  };

  return (
    <AppScreen>
      <Text style={s.title}>Daily Routines</Text>
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 40 }}>
        {recurring.map((r) => (
          <SwipeableRow key={r.id} onDelete={() => deleteRecurringTask(r.id)}>
            <View style={s.card}>
              {editingId === r.id ? (
                <View>
                  <TextInput style={s.input} value={editTitle} onChangeText={setEditTitle} autoFocus />
                  <View style={s.editActions}>
                    <TouchableOpacity onPress={() => setEditingId(null)}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { updateRecurringTask(r.id, { title: editTitle }); setEditingId(null); }} style={s.saveBtn}>
                      <Text style={s.saveBtnText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity onPress={() => { setEditingId(r.id); setEditTitle(r.title); }}>
                  <Text style={s.cardTitle}>{r.title}</Text>
                  <Text style={s.cardStatus}>{r.pattern} · tap to edit · swipe to delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </SwipeableRow>
        ))}
        {!recurring.length && !adding ? <Text style={{ color: '#6B7280' }}>No routines yet. Add recurring tasks that appear every day.</Text> : null}
        {adding ? (
          <View style={s.addForm}>
            <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder="e.g., Run 3km, Read 30 min, Practice piano" autoFocus />
            <View style={s.editActions}>
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
  title: { fontSize: 24, fontWeight: '800', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardStatus: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  deleteText: { fontSize: 13, color: '#EF4444', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10, fontSize: 15 },
  editActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelText: { color: '#6B7280', fontSize: 15 },
  saveBtn: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  addForm: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#C7D2FE' },
  addBtn: { borderWidth: 1, borderColor: '#C7D2FE', borderRadius: 14, padding: 14, alignItems: 'center', borderStyle: 'dashed' },
  addBtnText: { color: '#2563EB', fontWeight: '600', fontSize: 14 },
});
