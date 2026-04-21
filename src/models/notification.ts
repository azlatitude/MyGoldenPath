import type { UUID } from './ids';

export interface NotificationPrefs {
  profileId: UUID;
  expoPushToken?: string;
  lastScheduledAt?: string;
}
