import { Suspense, type FC } from 'react';

import { Loader, Center, MantineProvider } from '@mantine/core';

import { Pages } from '~/pages';

const App: FC = () => <Pages />;

export const AppWithProviders: FC = () => (
  <MantineProvider>
    <Suspense
      fallback={
        <Center maw="100%" mih="100vh">
          <Loader />
        </Center>
      }
    >
      <App />
    </Suspense>
  </MantineProvider>
);
