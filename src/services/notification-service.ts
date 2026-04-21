import * as Notifications from 'expo-notifications';

export const requestNotificationsAsync = () => Notifications.requestPermissionsAsync();

export const scheduleDailyReminder = async (hour: number, minute: number) => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: { title: 'MyGoldenPath', body: 'Plan and complete one task today.' },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute
    }
  });
};
