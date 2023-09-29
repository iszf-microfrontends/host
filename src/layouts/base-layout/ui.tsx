import { Outlet } from 'react-router-dom';

import { AppShell } from '@mantine/core';

import { Navbar } from '~/widgets/navbar';

export const BaseLayout = () => (
  <AppShell
    navbar={<Navbar />}
    styles={(theme) => ({
      main: {
        position: 'relative',
        backgroundColor: theme.colors.gray[0],
      },
    })}
  >
    <Outlet />
  </AppShell>
);
