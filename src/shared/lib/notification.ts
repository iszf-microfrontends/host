import { notifications, type NotificationData } from '@mantine/notifications';
import { createEffect, createEvent, sample } from 'effector';

export type NotifyOptions = Omit<NotificationData, 'color'>;

const notifyFx = createEffect((data: NotificationData) => notifications.show(data));

const infoNotified = createEvent<NotifyOptions>();
const successNotified = createEvent<NotifyOptions>();
const errorNotified = createEvent<NotifyOptions>();
const warningNotified = createEvent<NotifyOptions>();

sample({ clock: infoNotified, target: notifyFx });

sample({
  clock: successNotified,
  fn: (options): NotificationData => ({ ...options, color: 'green' }),
  target: notifyFx,
});

sample({ clock: errorNotified, fn: (options): NotificationData => ({ ...options, color: 'red' }), target: notifyFx });

sample({
  clock: warningNotified,
  fn: (options): NotificationData => ({ ...options, color: 'orange' }),
  target: notifyFx,
});

export const notificationModel = { infoNotified, successNotified, errorNotified, warningNotified };
