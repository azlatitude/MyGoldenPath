import { z } from 'zod';

export const nonEmptyTitle = z.string().trim().min(3).max(200);

export const monthKeySchema = z.string().regex(/^\d{4}-\d{2}$/);
