import { NotificationProps, notifications } from '@mantine/notifications';

type ShowNotificationOptions = {
  title?: string;
  message: string;
};

const show = (props: NotificationProps) => {
  notifications.show({ withBorder: true, ...props });
};

export const showError = (options: ShowNotificationOptions) => {
  show({ ...options, color: 'red' });
};
