import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore } from '@/stores';

const COLOR_PRESETS = ['#3B82F6', '#F97316', '#10B981', '#A855F7', '#EF4444', '#F59E0B', '#06B6D4', '#EC4899'];

export default function AspectManagerScreen() {
  const profile = useCurrentProfile();
  const aspects = usePlanningStore((s) => s.aspects).filter((a) => a.profileId === profile?.id && !a.isArchived);
  const updateAspect = usePlanningStore((s) => s.updateAspect);
  const archiveAspect = usePlanningStore((s) => s.archiveAspect);
  const createAspect = usePlanningStore((s) => s.createAspect);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(COLOR_PRESETS[0]);

  return (
    <AppScreen>
      <Text style={s.title}>Manage Aspects</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {aspects.map((a) => (
          <View key={a.id} style={s.card}>
            {editingId === a.id ? (
              <View>
                <TextInput style={s.input} value={editName} onChangeText={setEditName} autoFocus />
                <View style={s.colorRow}>
                  {COLOR_PRESETS.map((c) => (
                    <TouchableOpacity key={c} onPress={() => updateAspect(a.id, { colorHex: c })}>
                      <View style={[s.colorDot, { backgroundColor: c }, a.colorHex === c && s.colorSelected]} />
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={s.editActions}>
                  <TouchableOpacity onPress={() => setEditingId(null)}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => { updateAspect(a.id, { name: editName }); setEditingId(null); }} style={s.saveBtn}>
                    <Text style={s.saveBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={s.cardRow} onPress={() => { setEditingId(a.id); setEditName(a.name); }}>
                <View style={[s.aspectDot, { backgroundColor: a.colorHex }]} />
                <Text style={s.aspectName}>{a.name}</Text>
                <TouchableOpacity onPress={() => Alert.alert('Delete Aspect', `Archive "${a.name}" and its objectives?`, [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Archive', style: 'destructive', onPress: () => archiveAspect(a.id) },
                ])}>
                  <Text style={s.deleteText}>Remove</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {adding ? (
          <View style={s.addForm}>
            <TextInput style={s.input} value={newName} onChangeText={setNewName} placeholder="New aspect name" autoFocus />
            <View style={s.colorRow}>
              {COLOR_PRESETS.map((c) => (
                <TouchableOpacity key={c} onPress={() => setNewColor(c)}>
                  <View style={[s.colorDot, { backgroundColor: c }, newColor === c && s.colorSelected]} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.editActions}>
              <TouchableOpacity onPress={() => setAdding(false)}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if (!profile || !newName.trim()) return;
                createAspect({ profileId: profile.id, name: newName.trim(), icon: 'star', colorHex: newColor });
                setNewName(''); setAdding(false);
              }} style={s.saveBtn}>
                <Text style={s.saveBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : aspects.length < 7 ? (
          <TouchableOpacity onPress={() => setAdding(true)} style={s.addBtn}>
            <Text style={s.addBtnText}>+ Add Aspect</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </AppScreen>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 8 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  aspectDot: { width: 20, height: 20, borderRadius: 10, marginRight: 12 },
  aspectName: { fontSize: 16, fontWeight: '600', flex: 1 },
  deleteText: { fontSize: 13, color: '#EF4444' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10, fontSize: 15 },
  colorRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  colorDot: { width: 28, height: 28, borderRadius: 14 },
  colorSelected: { borderWidth: 3, borderColor: '#111827' },
  editActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  cancelText: { color: '#6B7280', fontSize: 15 },
  saveBtn: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  addForm: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#C7D2FE' },
  addBtn: { borderWidth: 1, borderColor: '#C7D2FE', borderRadius: 14, padding: 14, alignItems: 'center', borderStyle: 'dashed' },
  addBtnText: { color: '#2563EB', fontWeight: '600', fontSize: 14 },
});
