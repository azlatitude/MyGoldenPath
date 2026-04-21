import type { GemType, RarityTier } from './enums';
import type { UUID } from './ids';

export interface GemDefinition {
  type: GemType;
  displayName: string;
  rarity: RarityTier;
  taskDropRate: number;
  monthlyDropRate: number;
  sortOrder: number;
}

export interface GemInventoryItem {
  id: UUID;
  profileId: UUID;
  gemType: GemType;
  rarity: RarityTier;
  obtainedAt: string;
  sourceType: 'task_complete' | 'monthly_objective_complete' | 'achievement';
  sourceId?: UUID | undefined;
  isRedeemed: boolean;
  redeemedAt?: string | undefined;
  redemptionId?: UUID | undefined;
}

export interface GemCounters {
  [gemType: string]: {
    total: number;
    available: number;
    redeemed: number;
  };
}
