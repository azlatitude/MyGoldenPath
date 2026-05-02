import { format, parseISO, lastDayOfMonth, differenceInDays } from 'date-fns';

export const nowIso = () => new Date().toISOString();

export const todayKey = () => format(new Date(), 'yyyy-MM-dd');

export const monthKeyFromDate = (date: Date = new Date()) => format(date, 'yyyy-MM');

export const isSameMonthKey = (dateIso: string, monthKey: string) => format(parseISO(dateIso), 'yyyy-MM') === monthKey;

export function daysUntilMonthEnd(): number {
  const today = new Date();
  const lastDay = lastDayOfMonth(today);
  return differenceInDays(lastDay, today);
}

export function isLastFiveDaysOfMonth(): boolean {
  return daysUntilMonthEnd() <= 5;
}

export function isLastTwoDaysOfMonth(): boolean {
  return daysUntilMonthEnd() <= 2;
}
