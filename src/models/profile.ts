import type { ProfileRole } from './enums';
import type { UUID } from './ids';

export interface Profile {
  id: UUID;
  name: string;
  role: ProfileRole;
  avatarSeed: string;
  colorHex: string;
  isActive: boolean;
  parentProfileId?: UUID | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileSettings {
  profileId: UUID;
  dailyReminderEnabled: boolean;
  dailyReminderTime?: string | undefined;
  monthlyPlanningReminderEnabled: boolean;
  retrospectiveReminderEnabled: boolean;
  reducedMotionEnabled: boolean;
  showPrizeAnimation: boolean;
  updatedAt: string;
}
