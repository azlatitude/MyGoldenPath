import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '@/models';
import { jsonStorage } from '@/utils/storage';
import { createId } from '@/utils/ids';
import { nowIso } from '@/utils/date';

interface ProfileStore {
  schemaVersion: number;
  profiles: Profile[];
  activeProfileId: string | undefined;
  createProfile: (input: Pick<Profile, 'name' | 'role' | 'avatarSeed' | 'colorHex'> & { parentProfileId?: string }) => string;
  updateProfile: (profileId: string, patch: Partial<Profile>) => void;
  switchActiveProfile: (profileId: string) => void;
  getChildrenOfParent: (parentProfileId: string) => Profile[];
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      schemaVersion: 1,
      profiles: [],
      activeProfileId: undefined,
      createProfile: (input) => {
        const id = createId();
        const now = nowIso();
        const profile: Profile = {
          id,
          name: input.name,
          role: input.role,
          avatarSeed: input.avatarSeed,
          colorHex: input.colorHex,
          isActive: get().profiles.length === 0,
          ...(input.parentProfileId ? { parentProfileId: input.parentProfileId } : {}),
          createdAt: now,
          updatedAt: now
        };
        set((state) => ({
          profiles: [...state.profiles.map((p) => ({ ...p, isActive: false })), profile],
          activeProfileId: state.activeProfileId ?? id
        }));
        return id;
      },
      updateProfile: (profileId, patch) => {
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === profileId ? { ...p, ...patch, updatedAt: nowIso() } : p))
        }));
      },
      switchActiveProfile: (profileId) => {
        set((state) => ({
          activeProfileId: profileId,
          profiles: state.profiles.map((p) => ({ ...p, isActive: p.id === profileId, updatedAt: nowIso() }))
        }));
      },
      getChildrenOfParent: (parentProfileId) => get().profiles.filter((p) => p.parentProfileId === parentProfileId)
    }),
    {
      name: 'mgp.profile.v1',
      storage: jsonStorage
    }
  )
);
