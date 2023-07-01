import { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { AppShell, createStyles, Header, Navbar, Stack, Text, Title, Tooltip } from '@mantine/core';

import { useRemoteModules } from '~/shared/lib';

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

type LinkProps = {
  to: string;
  children: ReactNode;
};

function Link({ to, children }: LinkProps): JSX.Element | null {
  const { classes, cx } = useStyles();

  return (
    <NavLink to={to} className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive })}>
      {children}
    </NavLink>
  );
}

export function Layout(): JSX.Element | null {
  const { classes } = useStyles();

  const { remoteModules, isPending } = useRemoteModules();

  const remoteModuleLinks = remoteModules.map((module) =>
    module.isBackendActive ? (
      <Link key={module.name} to={module.path}>
        {module.name}
      </Link>
    ) : (
      <Tooltip key={module.name} label="Backend is not active" className={classes.link}>
        <Text>{module.name}</Text>
      </Tooltip>
    ),
  );

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="100%" p="md">
          <Stack spacing="xs">
            <Link to="/">Home</Link>
            {isPending ? <div>Loading...</div> : remoteModuleLinks}
          </Stack>
        </Navbar>
      }
      header={
        <Header
          height={60}
          p="md"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Title>Header</Title>
        </Header>
      }
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
}
