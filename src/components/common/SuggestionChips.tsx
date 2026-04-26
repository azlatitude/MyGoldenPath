import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (value: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <>
      <Text style={styles.label}>Tap for inspiration:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {suggestions.map((s) => (
          <TouchableOpacity key={s} style={styles.chip} onPress={() => onSelect(s)}>
            <Text style={styles.chipText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  label: { color: '#9CA3AF', fontSize: 13, marginTop: 12, marginBottom: 6 },
  container: { gap: 8, paddingBottom: 8 },
  chip: {
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  chipText: { color: '#4338CA', fontSize: 13, fontWeight: '500' },
});
