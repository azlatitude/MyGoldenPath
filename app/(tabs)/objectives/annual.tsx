import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AppScreen } from '@/components/common/AppScreen';
import { SuggestionChips } from '@/components/common/SuggestionChips';
import { SwipeableRow } from '@/components/common/SwipeableRow';
import { ANNUAL_SUGGESTIONS } from '@/constants/objective-suggestions';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { usePlanningStore } from '@/stores';
import type { AnnualObjective } from '@/models';

function ObjectiveCard({ obj, aspects, onUpdate, onDelete, onMove }: {
  obj: AnnualObjective;
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
          <>
            <TouchableOpacity onPress={() => { setEditTitle(obj.title); setEditing(true); }} activeOpacity={0.7}>
              <Text style={s.cardTitle}>{obj.title}</Text>
              <Text style={s.cardHint}>tap to edit · swipe to delete</Text>
            </TouchableOpacity>
            {otherAspects.length > 0 ? (
              <>
                <TouchableOpacity onPress={() => setShowMove(!showMove)} style={s.moveToggle}>
                  <Text style={s.moveToggleText}>{showMove ? 'Cancel move' : 'Move to...'}</Text>
                </TouchableOpacity>
                {showMove ? (
                  <View style={s.moveSection}>
                    {otherAspects.map((a) => (
                      <TouchableOpacity key={a.id} style={s.moveChip} onPress={() => { onMove(obj.id, a.id); setShowMove(false); }}>
                        <View style={[s.moveDot, { backgroundColor: a.colorHex }]} />
                        <Text style={s.moveText}>{a.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}
              </>
            ) : null}
          </>
        )}
      </View>
    </SwipeableRow>
  );
}

export default function AnnualObjectivesScreen() {
  const profile = useCurrentProfile();
  const aspects = usePlanningStore((s) => s.aspects).filter((a) => a.profileId === profile?.id && !a.isArchived);
  const annual = usePlanningStore((s) => s.annualObjectives);
  const createAnnualObjective = usePlanningStore((s) => s.createAnnualObjective);
  const updateAnnualObjective = usePlanningStore((s) => s.updateAnnualObjective);
  const deleteAnnualObjective = usePlanningStore((s) => s.deleteAnnualObjective);
  const [addingForAspect, setAddingForAspect] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const year = new Date().getFullYear();

  return (
    <AppScreen>
      <Text style={s.screenTitle}>Annual Objectives</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {aspects.map((aspect) => {
          const objectives = annual.filter((a) => a.profileId === profile?.id && a.aspectId === aspect.id);
          const aspectKey = aspect.name.toLowerCase();
          const suggestions = ANNUAL_SUGGESTIONS[aspectKey] ?? ANNUAL_SUGGESTIONS.self;
          const isAdding = addingForAspect === aspect.id;

          return (
            <View key={aspect.id} style={s.aspectSection}>
              <View style={[s.aspectHeader, { borderLeftColor: aspect.colorHex }]}>
                <Text style={[s.aspectName, { color: aspect.colorHex }]}>{aspect.name}</Text>
                <Text style={s.aspectCount}>{objectives.length}/3</Text>
              </View>
              {objectives.map((obj) => (
                <ObjectiveCard key={obj.id} obj={obj} aspects={aspects}
                  onUpdate={(id, t) => updateAnnualObjective(id, { title: t })}
                  onDelete={deleteAnnualObjective}
                  onMove={(id, aid) => updateAnnualObjective(id, { aspectId: aid })} />
              ))}
              {isAdding ? (
                <View style={s.addForm}>
                  <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder={`${aspect.name} goal for ${year}...`} autoFocus />
                  <SuggestionChips suggestions={suggestions} onSelect={setTitle} />
                  <View style={s.editActions}>
                    <TouchableOpacity onPress={() => { setAddingForAspect(null); setTitle(''); }}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      if (!profile || title.trim().length < 3) return;
                      createAnnualObjective({ profileId: profile.id, aspectId: aspect.id, year, title: title.trim() });
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
  screenTitle: { fontSize: 24, fontWeight: '800', marginBottom: 16 },
  aspectSection: { marginBottom: 20 },
  aspectHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderLeftWidth: 4, paddingLeft: 10, marginBottom: 8 },
  aspectName: { fontSize: 16, fontWeight: '700' },
  aspectCount: { fontSize: 13, color: '#9CA3AF' },
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
