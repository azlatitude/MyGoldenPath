export type ProfileRole = 'parent' | 'kid' | 'adult';
export type RarityTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type ObjectiveStatus = 'active' | 'completed' | 'archived';
export type TaskStatus = 'pending' | 'completed' | 'archived';
export type RecurrencePattern = 'daily' | 'weekdays' | 'custom';
export type GemSourceType = 'task_complete' | 'monthly_objective_complete' | 'achievement';

export type GemType =
  | 'obsidian' | 'agate' | 'jasper'
  | 'tigers_eye' | 'rose_quartz' | 'moonstone' | 'jade'
  | 'turquoise' | 'amethyst' | 'pearl' | 'opal'
  | 'garnet' | 'golden_coin' | 'topaz' | 'aquamarine' | 'ruby'
  | 'emerald' | 'sapphire' | 'alexandrite' | 'diamond';
