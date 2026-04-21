import type { UUID } from './ids';

export interface Aspect {
  id: UUID;
  profileId: UUID;
  name: string;
  icon: string;
  colorHex: string;
  sortOrder: number;
  isSystemDefault: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
