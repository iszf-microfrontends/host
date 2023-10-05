import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { Navbar } from '~/widgets/navbar';

export const BaseLayout = (): JSX.Element => (
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
