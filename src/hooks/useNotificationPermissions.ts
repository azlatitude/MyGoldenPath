import { useEffect, useState } from 'react';
import { requestNotificationsAsync } from '@/services/notification-service';

export const useNotificationPermissions = () => {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    requestNotificationsAsync().then((res) => setGranted(res.status === 'granted'));
  }, []);

  return granted;
};
