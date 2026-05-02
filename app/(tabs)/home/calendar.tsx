import { useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AppScreen } from '@/components/common/AppScreen';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useTaskStore } from '@/stores';
import { todayKey } from '@/utils/date';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday = 0
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function CalendarScreen() {
  const profile = useCurrentProfile();
  const tasks = useTaskStore((s) => s.tasks).filter((t) => t.profileId === profile?.id);
  const today = todayKey();
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Build day stats: { dateKey: { total, completed } }
  const dayStats = useMemo(() => {
    const map = new Map<string, { total: number; completed: number }>();
    tasks.forEach((t) => {
      const key = t.dueDate;
      const stat = map.get(key) || { total: 0, completed: 0 };
      stat.total++;
      if (t.status === 'completed') stat.completed++;
      map.set(key, stat);
    });
    return map;
  }, [tasks]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  // Tasks for selected date
  const selectedTasks = selectedDate ? tasks.filter((t) => t.dueDate === selectedDate) : [];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <AppScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Month navigation */}
        <View style={s.monthNav}>
          <TouchableOpacity onPress={prevMonth}><Text style={s.navArrow}>‹</Text></TouchableOpacity>
          <Text style={s.monthTitle}>{MONTH_NAMES[month]} {year}</Text>
          <TouchableOpacity onPress={nextMonth}><Text style={s.navArrow}>›</Text></TouchableOpacity>
        </View>

        {/* Weekday headers */}
        <View style={s.weekRow}>
          {WEEKDAYS.map((d) => (
            <Text key={d} style={s.weekDay}>{d}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={s.grid}>
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <View key={`empty-${i}`} style={s.cell} />
          ))}
          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = formatDateKey(year, month, day);
            const stat = dayStats.get(dateKey);
            const isToday = dateKey === today;
            const isSelected = dateKey === selectedDate;
            const completionRate = stat ? stat.completed / stat.total : 0;

            let dotColor = 'transparent';
            if (stat && stat.total > 0) {
              if (completionRate === 1) dotColor = '#10B981';
              else if (completionRate >= 0.5) dotColor = '#F59E0B';
              else if (completionRate > 0) dotColor = '#EF4444';
              else dotColor = '#D1D5DB';
            }

            return (
              <TouchableOpacity
                key={day}
                style={[s.cell, isToday && s.todayCell, isSelected && s.selectedCell]}
                onPress={() => setSelectedDate(isSelected ? null : dateKey)}
              >
                <Text style={[s.dayText, isToday && s.todayText, isSelected && s.selectedText]}>{day}</Text>
                <View style={[s.dot, { backgroundColor: dotColor }]} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Legend */}
        <View style={s.legend}>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#10B981' }]} /><Text style={s.legendText}>All done</Text></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#F59E0B' }]} /><Text style={s.legendText}>Partial</Text></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#EF4444' }]} /><Text style={s.legendText}>Low</Text></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#D1D5DB' }]} /><Text style={s.legendText}>None done</Text></View>
        </View>

        {/* Selected date details */}
        {selectedDate ? (
          <View style={s.details}>
            <Text style={s.detailsTitle}>{selectedDate}</Text>
            {selectedTasks.length === 0 ? (
              <Text style={s.detailsEmpty}>No tasks for this day.</Text>
            ) : (
              <>
                <Text style={s.detailsSummary}>
                  {selectedTasks.filter((t) => t.status === 'completed').length}/{selectedTasks.length} completed
                </Text>
                {selectedTasks.map((t) => (
                  <View key={t.id} style={s.taskRow}>
                    <Text style={s.taskCheck}>{t.status === 'completed' ? '✓' : '○'}</Text>
                    <Text style={[s.taskTitle, t.status === 'completed' && s.taskDone]}>{t.title}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        ) : null}
      </ScrollView>
    </AppScreen>
  );
}

const s = StyleSheet.create({
  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  navArrow: { fontSize: 28, color: '#2563EB', paddingHorizontal: 16 },
  monthTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  weekRow: { flexDirection: 'row', marginBottom: 4 },
  weekDay: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '600', color: '#9CA3AF' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', padding: 2 },
  todayCell: { backgroundColor: '#EEF2FF', borderRadius: 12 },
  selectedCell: { backgroundColor: '#2563EB', borderRadius: 12 },
  dayText: { fontSize: 15, color: '#374151', fontWeight: '500' },
  todayText: { color: '#2563EB', fontWeight: '800' },
  selectedText: { color: '#FFFFFF', fontWeight: '800' },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 2 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 12, marginBottom: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: '#6B7280' },
  details: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  detailsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  detailsSummary: { fontSize: 13, color: '#6B7280', marginBottom: 8 },
  detailsEmpty: { color: '#9CA3AF', fontSize: 13 },
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  taskCheck: { fontSize: 16 },
  taskTitle: { fontSize: 14, color: '#111827' },
  taskDone: { textDecorationLine: 'line-through', color: '#6B7280' },
});
