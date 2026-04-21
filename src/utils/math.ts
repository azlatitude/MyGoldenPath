export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const weightedRoll = <T>(table: Array<{ item: T; weight: number }>): T => {
  const total = table.reduce((sum, t) => sum + t.weight, 0);
  const roll = Math.random() * total;
  let running = 0;
  for (const entry of table) {
    running += entry.weight;
    if (roll <= running) return entry.item;
  }
  return table[table.length - 1]!.item;
};
