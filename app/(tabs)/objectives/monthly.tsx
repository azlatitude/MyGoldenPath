import { useMemo, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { SuggestionChips } from '@/components/common/SuggestionChips';
import { MONTHLY_SUGGESTIONS } from '@/constants/objective-suggestions';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore } from '@/stores';
import { monthKeyFromDate } from '@/utils/date';
import type { MonthlyObjective } from '@/models';

function ObjectiveCard({ obj, aspects, onUpdate, onDelete, onMove }: {
  obj: MonthlyObjective;
  aspects: { id: string; name: string; colorHex: string }[];
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, newAspectId: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(obj.title);
  const [showMove, setShowMove] = useState(false);
  const otherAspects = aspects.filter((a) => a.id !== obj.aspectId);

  return (
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
        <>
          <Text style={s.cardTitle}>{obj.title}</Text>
          <Text style={s.cardStatus}>{obj.status} · {obj.progressCurrent}{obj.target ? `/${obj.target.value} ${obj.target.unit}` : ''}</Text>
          <View style={s.cardActions}>
            <TouchableOpacity onPress={() => { setEditTitle(obj.title); setEditing(true); }}>
              <Text style={s.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowMove(!showMove)}>
              <Text style={s.actionText}>Move</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete "${obj.title}"?`, [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => onDelete(obj.id) },
            ])}>
              <Text style={[s.actionText, { color: '#EF4444' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
          {showMove && otherAspects.length > 0 ? (
            <View style={s.moveSection}>
              <Text style={s.moveLabel}>Move to:</Text>
              {otherAspects.map((a) => (
                <TouchableOpacity key={a.id} style={s.moveChip} onPress={() => { onMove(obj.id, a.id); setShowMove(false); }}>
                  <View style={[s.moveDot, { backgroundColor: a.colorHex }]} />
                  <Text style={s.moveText}>{a.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </>
      )}
    </View>
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
                <ObjectiveCard
                  key={obj.id}
                  obj={obj}
                  aspects={aspects}
                  onUpdate={(id, t) => updateMonthlyObjective(id, { title: t })}
                  onDelete={deleteMonthlyObjective}
                  onMove={(id, newAspectId) => updateMonthlyObjective(id, { aspectId: newAspectId })}
                />
              ))}

              {!objectives.length && !isAdding ? (
                <Text style={s.emptyHint}>No {aspect.name.toLowerCase()} objectives this month</Text>
              ) : null}

              {isAdding ? (
                <View style={s.addForm}>
                  <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder={`${aspect.name} goal for this month...`} autoFocus />
                  <SuggestionChips suggestions={suggestions} onSelect={setTitle} />
                  <View style={s.editActions}>
                    <TouchableOpacity onPress={() => { setAddingForAspect(null); setTitle(''); }}>
                      <Text style={s.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      if (!profile || title.trim().length < 3) return;
                      createMonthlyObjective({ profileId: profile.id, aspectId: aspect.id, title: title.trim(), monthKey });
                      setTitle(''); setAddingForAspect(null);
                    }} style={s.saveBtn}>
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
  cardStatus: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  cardActions: { flexDirection: 'row', gap: 16, marginTop: 8 },
  actionText: { fontSize: 13, color: '#2563EB', fontWeight: '600' },
  editInput: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10, fontSize: 15 },
  editActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelText: { color: '#6B7280', fontSize: 15 },
  saveBtn: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  moveSection: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  moveLabel: { fontSize: 12, color: '#6B7280', width: '100%' },
  moveChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#E5E7EB' },
  moveDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  moveText: { fontSize: 13, color: '#374151' },
  addForm: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#C7D2FE' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 12, fontSize: 15 },
  addBtn: { borderWidth: 1, borderColor: '#C7D2FE', borderRadius: 14, padding: 14, alignItems: 'center', borderStyle: 'dashed' },
  addBtnText: { color: '#2563EB', fontWeight: '600', fontSize: 14 },
});
