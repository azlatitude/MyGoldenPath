import { useMemo, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { SuggestionChips } from '@/components/common/SuggestionChips';
import { MONTHLY_SUGGESTIONS } from '@/constants/objective-suggestions';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore } from '@/stores';
import { monthKeyFromDate } from '@/utils/date';

export default function MonthlyObjectivesScreen() {
  const profile = useCurrentProfile();
  const monthly = usePlanningStore((s) => s.monthlyObjectives);
  const aspects = usePlanningStore((s) => s.aspects);
  const createMonthlyObjective = usePlanningStore((s) => s.createMonthlyObjective);
  const monthKey = monthKeyFromDate();
  const list = useMemo(() => monthly.filter((m) => m.profileId === profile?.id && m.monthKey === monthKey), [monthly, profile?.id, monthKey]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  const defaultAspect = aspects.find((a) => a.profileId === profile?.id);
  const aspectName = defaultAspect?.name?.toLowerCase() ?? 'self';
  const suggestions = MONTHLY_SUGGESTIONS[aspectName] ?? MONTHLY_SUGGESTIONS.self;

  const handleAdd = () => {
    if (!profile || !defaultAspect || title.trim().length < 3) return;
    createMonthlyObjective({ profileId: profile.id, aspectId: defaultAspect.id, title: title.trim(), monthKey });
    setTitle('');
    setAdding(false);
  };

  return (
    <AppScreen>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Monthly Objectives</Text>
      </View>
      <Text style={s.monthLabel}>{monthKey}</Text>
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 40 }}>
        {list.map((item) => (
          <View key={item.id} style={s.card}>
            <Text style={s.cardTitle}>{item.title}</Text>
            <Text style={s.cardStatus}>{item.status} · {item.progressCurrent}{item.target ? `/${item.target.value} ${item.target.unit}` : ''}</Text>
          </View>
        ))}
        {!list.length && !adding ? <Text style={{ color: '#6B7280' }}>No objectives for this month. Tap + to add.</Text> : null}
        {adding ? (
          <View style={s.addForm}>
            <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder="What will you do this month?" autoFocus />
            <SuggestionChips suggestions={suggestions} onSelect={setTitle} />
            <View style={s.addActions}>
              <TouchableOpacity onPress={() => setAdding(false)}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleAdd} style={s.saveBtn}><Text style={s.saveBtnText}>Save</Text></TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setAdding(true)} style={s.addBtn}>
            <Text style={s.addBtnText}>+ Add Monthly Objective</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </AppScreen>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  backBtn: { paddingRight: 12 },
  backText: { fontSize: 16, color: '#2563EB' },
  title: { fontSize: 24, fontWeight: '800', flex: 1 },
  monthLabel: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
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
