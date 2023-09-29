import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar as MantineNavbar, Stack, Text, Tooltip } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { RemoteModule, remoteModuleStore } from '~/shared/lib';

import { useStyles } from './styles';

type NavbarLinkProps = {
  to: string;
  children: ReactNode;
};

const NavbarLink = ({ to, children }: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <NavLink to={to} className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive })}>
      {children}
    </NavLink>
  );
};

export const Navbar = observer(() => {
  const { classes } = useStyles();

  const renderLink = (module: RemoteModule) =>
    module.isActive ? (
      <NavbarLink key={module.name} to={module.path}>
        {module.name}
      </NavbarLink>
    ) : (
      <Tooltip key={module.name} label="Сервис временно не доступен">
        <Text className={classes.link}>{module.name}</Text>
      </Tooltip>
    );

  const renderLinks = () =>
    remoteModuleStore.data?.case({ pending: () => <div>Загрузка...</div>, fulfilled: (modules) => <>{modules.map(renderLink)}</> });

  return (
    <MantineNavbar width={{ base: 300 }} h="100%" p="md">
      <Stack spacing="xs">
        <NavbarLink to="/">Главная</NavbarLink>
        {renderLinks()}
      </Stack>
    </MantineNavbar>
  );
});
