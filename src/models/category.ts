import type { UUID } from './ids';

export interface Category {
  id: UUID;
  profileId: UUID;
  aspectId: UUID;
  name: string;
  colorHex?: string;
  isSystemDefault: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
