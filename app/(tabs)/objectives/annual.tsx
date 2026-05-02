import { useMemo, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { SuggestionChips } from '@/components/common/SuggestionChips';
import { ANNUAL_SUGGESTIONS } from '@/constants/objective-suggestions';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore } from '@/stores';

export default function AnnualObjectivesScreen() {
  const profile = useCurrentProfile();
  const annual = usePlanningStore((s) => s.annualObjectives);
  const aspects = usePlanningStore((s) => s.aspects);
  const createAnnualObjective = usePlanningStore((s) => s.createAnnualObjective);
  const list = useMemo(() => annual.filter((a) => a.profileId === profile?.id), [annual, profile?.id]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  const defaultAspect = aspects.find((a) => a.profileId === profile?.id);
  const aspectName = defaultAspect?.name?.toLowerCase() ?? 'self';
  const suggestions = ANNUAL_SUGGESTIONS[aspectName] ?? ANNUAL_SUGGESTIONS.self;

  const handleAdd = () => {
    if (!profile || !defaultAspect || title.trim().length < 3) return;
    createAnnualObjective({ profileId: profile.id, aspectId: defaultAspect.id, year: new Date().getFullYear(), title: title.trim() });
    setTitle('');
    setAdding(false);
  };

  return (
    <AppScreen>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Annual Objectives</Text>
      </View>
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 40 }}>
        {list.map((item) => (
          <View key={item.id} style={s.card}>
            <Text style={s.cardTitle}>{item.title}</Text>
            <Text style={s.cardStatus}>{item.status}</Text>
          </View>
        ))}
        {!list.length && !adding ? <Text style={{ color: '#6B7280' }}>No annual objectives yet. Tap + to add one.</Text> : null}
        {adding ? (
          <View style={s.addForm}>
            <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder="What do you want to achieve this year?" autoFocus />
            <SuggestionChips suggestions={suggestions} onSelect={setTitle} />
            <View style={s.addActions}>
              <TouchableOpacity onPress={() => setAdding(false)}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleAdd} style={s.saveBtn}><Text style={s.saveBtnText}>Save</Text></TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setAdding(true)} style={s.addBtn}>
            <Text style={s.addBtnText}>+ Add Annual Objective</Text>
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
