import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, ActionSheetIOS, Platform, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { SuggestionChips } from '@/components/common/SuggestionChips';
import { SwipeableRow } from '@/components/common/SwipeableRow';
import { MONTHLY_SUGGESTIONS } from '@/constants/objective-suggestions';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore } from '@/stores';
import { monthKeyFromDate } from '@/utils/date';
import type { MonthlyObjective } from '@/models';

function showMoveSheet(aspectNames: string[], onSelect: (index: number) => void) {
  const options = [...aspectNames, 'Cancel'];
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      { options, cancelButtonIndex: options.length - 1, title: 'Move to aspect' },
      (idx) => { if (idx < aspectNames.length) onSelect(idx); }
    );
  } else {
    Alert.alert('Move to aspect', undefined, [
      ...aspectNames.map((name, i) => ({ text: name, onPress: () => onSelect(i) })),
      { text: 'Cancel', style: 'cancel' as const },
    ]);
  }
}

function ObjectiveCard({ obj, aspects, onUpdate, onDelete, onMove }: {
  obj: MonthlyObjective;
  aspects: { id: string; name: string; colorHex: string }[];
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, newAspectId: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(obj.title);
  const otherAspects = aspects.filter((a) => a.id !== obj.aspectId);

  const handleLongPress = () => {
    if (otherAspects.length === 0) return;
    showMoveSheet(otherAspects.map((a) => a.name), (idx) => onMove(obj.id, otherAspects[idx].id));
  };

  return (
    <SwipeableRow onDelete={() => onDelete(obj.id)}>
      <View style={s.card}>
        {editing ? (
          <View>
            <TextInput style={s.editInput} value={editTitle} onChangeText={setEditTitle} autoFocus />
            <View style={s.editActions}>
              <TouchableOpacity onPress={() => setEditing(false)}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => { onUpdate(obj.id, editTitle); setEditing(false); }} style={s.saveBtn}>
                <Text style={s.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => { setEditTitle(obj.title); setEditing(true); }}
            onLongPress={handleLongPress}
            activeOpacity={0.7}
          >
            <Text style={s.cardTitle}>{obj.title}</Text>
            <Text style={s.cardHint}>{obj.status} · tap to edit · long-press to move</Text>
          </TouchableOpacity>
        )}
      </View>
    </SwipeableRow>
  );
}

export default function MonthlyObjectivesScreen() {
  const profile = useCurrentProfile();
  const aspects = usePlanningStore((s) => s.aspects).filter((a) => a.profileId === profile?.id && !a.isArchived);
  const monthly = usePlanningStore((s) => s.monthlyObjectives);
  const createMonthlyObjective = usePlanningStore((s) => s.createMonthlyObjective);
  const updateMonthlyObjective = usePlanningStore((s) => s.updateMonthlyObjective);
  const deleteMonthlyObjective = usePlanningStore((s) => s.deleteMonthlyObjective);
  const monthKey = monthKeyFromDate();
  const [addingForAspect, setAddingForAspect] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  return (
    <AppScreen>
      <Text style={s.screenTitle}>Monthly Objectives</Text>
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
                <ObjectiveCard key={obj.id} obj={obj} aspects={aspects}
                  onUpdate={(id, t) => updateMonthlyObjective(id, { title: t })}
                  onDelete={deleteMonthlyObjective}
                  onMove={(id, aid) => updateMonthlyObjective(id, { aspectId: aid })} />
              ))}
              {!objectives.length && !isAdding ? (
                <Text style={s.emptyHint}>No {aspect.name.toLowerCase()} objectives this month</Text>
              ) : null}
              {isAdding ? (
                <View style={s.addForm}>
                  <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder={`${aspect.name} goal for this month...`} autoFocus />
                  <SuggestionChips suggestions={suggestions} onSelect={setTitle} />
                  <View style={s.editActions}>
                    <TouchableOpacity onPress={() => { setAddingForAspect(null); setTitle(''); }}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      if (!profile || title.trim().length < 3) return;
                      createMonthlyObjective({ profileId: profile.id, aspectId: aspect.id, title: title.trim(), monthKey });
                      setTitle(''); setAddingForAspect(null);
                    }} style={s.saveBtn}><Text style={s.saveBtnText}>Save</Text></TouchableOpacity>
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
  screenTitle: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  monthLabel: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  aspectSection: { marginBottom: 20 },
  aspectHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderLeftWidth: 4, paddingLeft: 10, marginBottom: 8 },
  aspectName: { fontSize: 16, fontWeight: '700' },
  aspectCount: { fontSize: 13, color: '#9CA3AF' },
  emptyHint: { color: '#9CA3AF', fontSize: 13, fontStyle: 'italic', marginBottom: 6, paddingLeft: 14 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardHint: { fontSize: 11, color: '#C0C4CC', marginTop: 2 },
  editInput: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10, fontSize: 15 },
  editActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelText: { color: '#6B7280', fontSize: 15 },
  saveBtn: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  moveToggle: { marginTop: 8 },
  moveToggleText: { fontSize: 13, color: '#2563EB', fontWeight: '600' },
  moveSection: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  moveChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#E5E7EB' },
  moveDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  moveText: { fontSize: 13, color: '#374151' },
  addForm: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#C7D2FE' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 12, fontSize: 15 },
  addBtn: { borderWidth: 1, borderColor: '#C7D2FE', borderRadius: 14, padding: 14, alignItems: 'center', borderStyle: 'dashed' },
  addBtnText: { color: '#2563EB', fontWeight: '600', fontSize: 14 },
});
