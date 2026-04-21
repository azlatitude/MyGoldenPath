import type { GemType } from '@/models';
import { TASK_DROP_RATES, MONTHLY_OBJECTIVE_DROP_RATES } from '@/constants/gem-rarity';
import { weightedRoll } from '@/utils/math';

const toTable = (rates: Record<GemType, number>) =>
  (Object.entries(rates) as Array<[GemType, number]>).filter(([, weight]) => weight > 0).map(([item, weight]) => ({ item, weight }));

export const rollTaskGemType = () => weightedRoll(toTable(TASK_DROP_RATES));

export const rollMonthlyGemType = () => weightedRoll(toTable(MONTHLY_OBJECTIVE_DROP_RATES));
