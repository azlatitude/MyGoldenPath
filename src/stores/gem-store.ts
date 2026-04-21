import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GemDefinition, GemInventoryItem, GemType, PrizeDropEvent, Redemption, RarityTier } from '@/models';
import { jsonStorage } from '@/utils/storage';
import { createId } from '@/utils/ids';
import { nowIso } from '@/utils/date';
import { rollMonthlyGemType, rollTaskGemType } from '@/services/drop-engine';
import { TASK_DROP_RATES, MONTHLY_OBJECTIVE_DROP_RATES } from '@/constants/gem-rarity';
import { useProfileStore } from './profile-store';

const rarityFromGem = (gemType: GemType): RarityTier => {
  if (['obsidian', 'agate', 'jasper'].includes(gemType)) return 'common';
  if (['tigers_eye', 'rose_quartz', 'moonstone', 'jade'].includes(gemType)) return 'uncommon';
  if (['turquoise', 'amethyst', 'pearl', 'opal'].includes(gemType)) return 'rare';
  if (['garnet', 'golden_coin', 'topaz', 'aquamarine', 'ruby'].includes(gemType)) return 'epic';
  return 'legendary';
};

const gemDefinitions: GemDefinition[] = (Object.keys(TASK_DROP_RATES) as GemType[]).map((type, index) => ({
  type,
  displayName: type.replace('_', ' '),
  rarity: rarityFromGem(type),
  taskDropRate: TASK_DROP_RATES[type],
  monthlyDropRate: MONTHLY_OBJECTIVE_DROP_RATES[type],
  sortOrder: index
}));

interface GemStore {
  schemaVersion: number;
  gemDefinitions: GemDefinition[];
  inventory: GemInventoryItem[];
  redemptions: Redemption[];
  dropQueue: PrizeDropEvent[];
  rollDropForTaskCompletion: (taskId: string) => void;
  rollDropForMonthlyObjective: (monthlyObjectiveId: string) => void;
  consumeNextDropForAnimation: () => PrizeDropEvent | undefined;
  markGemInventoryAsRedeemed: (gemInventoryIds: string[], note: string) => void;
}

export const useGemStore = create<GemStore>()(
  persist(
    (set, get) => ({
      schemaVersion: 1,
      gemDefinitions,
      inventory: [],
      redemptions: [],
      dropQueue: [],
      rollDropForTaskCompletion: (taskId) => {
        const gemType = rollTaskGemType();
        const now = nowIso();
        const profileId = useProfileStore.getState().activeProfileId ?? 'default-profile';
        const item: GemInventoryItem = {
          id: createId(),
          profileId,
          gemType,
          rarity: rarityFromGem(gemType),
          obtainedAt: now,
          sourceType: 'task_complete',
          sourceId: taskId,
          isRedeemed: false
        };
        const event: PrizeDropEvent = {
          id: createId(),
          profileId: item.profileId,
          gemType,
          sourceType: 'task_complete',
          sourceId: taskId,
          rarityBoostApplied: false,
          createdAt: now
        };
        set((state) => ({ inventory: [...state.inventory, item], dropQueue: [...state.dropQueue, event] }));
      },
      rollDropForMonthlyObjective: (monthlyObjectiveId) => {
        const gemType = rollMonthlyGemType();
        const now = nowIso();
        const profileId = useProfileStore.getState().activeProfileId ?? 'default-profile';
        const item: GemInventoryItem = {
          id: createId(),
          profileId,
          gemType,
          rarity: rarityFromGem(gemType),
          obtainedAt: now,
          sourceType: 'monthly_objective_complete',
          sourceId: monthlyObjectiveId,
          isRedeemed: false
        };
        const event: PrizeDropEvent = {
          id: createId(),
          profileId: item.profileId,
          gemType,
          sourceType: 'monthly_objective_complete',
          sourceId: monthlyObjectiveId,
          rarityBoostApplied: true,
          createdAt: now
        };
        set((state) => ({ inventory: [...state.inventory, item], dropQueue: [...state.dropQueue, event] }));
      },
      consumeNextDropForAnimation: () => {
        const queue = get().dropQueue;
        if (queue.length === 0) return undefined;
        const [first, ...rest] = queue;
        set({ dropQueue: rest });
        return first;
      },
      markGemInventoryAsRedeemed: (gemInventoryIds, note) => {
        const redemptionId = createId();
        const redeemedAt = nowIso();
        const redeemed = get().inventory.filter((i) => gemInventoryIds.includes(i.id));
        if (!redeemed.length) return;
        const redemption: Redemption = {
          id: redemptionId,
          profileId: redeemed[0]!.profileId,
          gemInventoryIds,
          gemTypes: redeemed.map((r) => r.gemType),
          note,
          redeemedAt,
          markedByProfileId: redeemed[0]!.profileId
        };
        set((state) => ({
          redemptions: [...state.redemptions, redemption],
          inventory: state.inventory.map((item) =>
            gemInventoryIds.includes(item.id) ? { ...item, isRedeemed: true, redeemedAt, redemptionId } : item
          )
        }));
      }
    }),
    {
      name: 'mgp.gems.v1',
      storage: jsonStorage
    }
  )
);
