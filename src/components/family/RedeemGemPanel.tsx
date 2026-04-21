import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export function RedeemGemPanel({ onConfirmRedeem }: { onConfirmRedeem: (note: string) => void }) {
  const [note, setNote] = useState('');
  return (
    <View style={styles.wrap}>
      <TextInput value={note} onChangeText={setNote} placeholder="Redeem note" style={styles.input} />
      <Pressable style={styles.button} onPress={() => onConfirmRedeem(note)}><Text style={styles.buttonText}>Mark as Redeemed</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { gap: 8 }, input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 10 }, button: { backgroundColor: '#111827', borderRadius: 10, padding: 10, alignItems: 'center' }, buttonText: { color: '#fff', fontWeight: '700' } });
