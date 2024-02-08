import { Center, Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Suspense, type FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Pages } from '~/pages';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: FC = () => <Pages />;

const queryClient = new QueryClient();

export const AppWithProviders: FC = () => (
  <BrowserRouter>
    <MantineProvider withCssVariables>
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <Center maw="100%" mih="100vh">
              <Loader />
            </Center>
          }
        >
          <App />
        </Suspense>
      </QueryClientProvider>
    </MantineProvider>
  </BrowserRouter>
);
