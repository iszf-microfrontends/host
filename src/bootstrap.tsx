import { createRoot } from 'react-dom/client';

import { allSettled, createEvent, fork, sample } from 'effector';
import { Provider } from 'effector-react';

import { routerInitialized } from '~/shared/routing';

import { AppWithProviders } from './app';

import '@mantine/core/styles.css';

const scope = fork();

const appStarted = createEvent();

sample({ clock: appStarted, target: [routerInitialized] });

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

allSettled(appStarted, { scope })
  .then(() =>
    root.render(
      <Provider value={scope}>
        <AppWithProviders />
      </Provider>,
    ),
  )
  .catch((err) => {
    console.log(`App start failed: ${err}`);
  });
