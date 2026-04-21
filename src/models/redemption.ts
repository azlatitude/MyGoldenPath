import type { GemType } from './enums';
import type { UUID } from './ids';

export interface Redemption {
  id: UUID;
  profileId: UUID;
  gemInventoryIds: UUID[];
  gemTypes: GemType[];
  note: string;
  redeemedAt: string;
  markedByProfileId: UUID;
}
