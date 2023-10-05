import { type NotificationProps, notifications } from '@mantine/notifications';

interface ShowNotificationOptions {
  title?: string;
  message: string;
}

const showNotification = (props: NotificationProps): void => {
  notifications.show({ withBorder: true, ...props });
};

export const showErrorNotification = (options: ShowNotificationOptions): void => {
  showNotification({ ...options, color: 'red' });
};
