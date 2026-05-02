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
  const aspects = usePlanningStore((s) => s.aspects).filter((a) => a.profileId === profile?.id && !a.isArchived);
  const monthly = usePlanningStore((s) => s.monthlyObjectives);
  const createMonthlyObjective = usePlanningStore((s) => s.createMonthlyObjective);
  const monthKey = monthKeyFromDate();
  const [addingForAspect, setAddingForAspect] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  return (
    <AppScreen>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.screenTitle}>Monthly Objectives</Text>
      </View>
      <Text style={s.monthLabel}>{monthKey}</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {aspects.map((aspect) => {
          const objectives = monthly.filter((m) => m.profileId === profile?.id && m.aspectId === aspect.id && m.monthKey === monthKey);
          const aspectKey = aspect.name.toLowerCase();
          const suggestions = MONTHLY_SUGGESTIONS[aspectKey] ?? MONTHLY_SUGGESTIONS.self;
          const isAdding = addingForAspect === aspect.id;

          return (
            <View key={aspect.id} style={s.aspectSection}>
              <View style={[s.aspectHeader, { borderLeftColor: aspect.colorHex }]}>
                <Text style={[s.aspectName, { color: aspect.colorHex }]}>{aspect.name}</Text>
                <Text style={s.aspectCount}>{objectives.length}/3</Text>
              </View>

              {objectives.map((obj) => (
                <View key={obj.id} style={s.card}>
                  <Text style={s.cardTitle}>{obj.title}</Text>
                  <Text style={s.cardStatus}>{obj.status} · {obj.progressCurrent}{obj.target ? `/${obj.target.value} ${obj.target.unit}` : ''}</Text>
                </View>
              ))}

              {!objectives.length && !isAdding ? (
                <Text style={s.emptyHint}>No {aspect.name.toLowerCase()} objectives this month</Text>
              ) : null}

              {isAdding ? (
                <View style={s.addForm}>
                  <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder={`${aspect.name} goal for this month...`} autoFocus />
                  <SuggestionChips suggestions={suggestions} onSelect={setTitle} />
                  <View style={s.addActions}>
                    <TouchableOpacity onPress={() => { setAddingForAspect(null); setTitle(''); }}>
                      <Text style={s.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (!profile || title.trim().length < 3) return;
                        createMonthlyObjective({ profileId: profile.id, aspectId: aspect.id, title: title.trim(), monthKey });
                        setTitle(''); setAddingForAspect(null);
                      }}
                      style={s.saveBtn}
                    >
                      <Text style={s.saveBtnText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : objectives.length < 3 ? (
                <TouchableOpacity onPress={() => { setAddingForAspect(aspect.id); setTitle(''); }} style={s.addBtn}>
                  <Text style={s.addBtnText}>+ Add {aspect.name} objective</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </AppScreen>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  backBtn: { paddingRight: 12 },
  backText: { fontSize: 16, color: '#2563EB' },
  screenTitle: { fontSize: 24, fontWeight: '800', flex: 1 },
  monthLabel: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  aspectSection: { marginBottom: 20 },
  aspectHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderLeftWidth: 4, paddingLeft: 10, marginBottom: 8 },
  aspectName: { fontSize: 16, fontWeight: '700' },
  aspectCount: { fontSize: 13, color: '#9CA3AF' },
  emptyHint: { color: '#9CA3AF', fontSize: 13, fontStyle: 'italic', marginBottom: 6, paddingLeft: 14 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardStatus: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  addForm: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#C7D2FE' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 12, fontSize: 15 },
  addActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  cancelText: { color: '#6B7280', fontSize: 15 },
  saveBtn: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  addBtn: { borderWidth: 1, borderColor: '#C7D2FE', borderRadius: 14, padding: 14, alignItems: 'center', borderStyle: 'dashed' },
  addBtnText: { color: '#2563EB', fontWeight: '600', fontSize: 14 },
});
