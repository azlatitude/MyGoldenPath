import type { GemType, GemSourceType } from './enums';
import type { UUID } from './ids';

export interface PrizeDropEvent {
  id: UUID;
  profileId: UUID;
  gemType: GemType;
  sourceType: GemSourceType;
  sourceId: UUID;
  rarityBoostApplied: boolean;
  createdAt: string;
}
