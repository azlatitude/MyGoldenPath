import type { RecurringTask } from '@/models';

const isWeekday = (day: number) => day >= 1 && day <= 5;

export const shouldGenerateRecurringTaskForDate = (task: RecurringTask, date: Date) => {
  if (task.isPaused || task.isArchived) return false;
  const dayOfWeek = date.getDay();
  if (task.pattern === 'daily') return true;
  if (task.pattern === 'weekdays') return isWeekday(dayOfWeek);
  if (task.pattern === 'custom') return task.daysOfWeek?.includes(dayOfWeek) ?? false;
  return false;
};
