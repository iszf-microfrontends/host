import { NotificationProps, notifications } from '@mantine/notifications';

type ShowNotificationOptions = {
  title?: string;
  message: string;
};

const showNotification = (props: NotificationProps) => {
  notifications.show({ withBorder: true, ...props });
};

export const showErrorNotification = (options: ShowNotificationOptions) => {
  showNotification({ ...options, color: 'red' });
};
