import { format, parseISO } from 'date-fns';

export const nowIso = () => new Date().toISOString();

export const todayKey = () => format(new Date(), 'yyyy-MM-dd');

export const monthKeyFromDate = (date: Date = new Date()) => format(date, 'yyyy-MM');

export const isSameMonthKey = (dateIso: string, monthKey: string) => format(parseISO(dateIso), 'yyyy-MM') === monthKey;
