import { Suspense, type FC } from 'react';

import { Center, Loader, MantineProvider } from '@mantine/core';
import { RouterProvider } from 'atomic-router-react';

import { Pages } from '~/pages';
import { routingModel } from '~/shared/routing';

const GlobalLoader: FC = () => (
  <Center maw="100%" mih="100vh">
    <Loader />
  </Center>
);

const App: FC = () => <Pages />;

export const AppWithProviders: FC = () => (
  <RouterProvider router={routingModel.router}>
    <MantineProvider>
      <Suspense fallback={<GlobalLoader />}>
        <App />
      </Suspense>
    </MantineProvider>
  </RouterProvider>
);
