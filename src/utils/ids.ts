import { customAlphabet } from 'nanoid/non-secure';

const nano = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);

export const createId = (): string => nano();
