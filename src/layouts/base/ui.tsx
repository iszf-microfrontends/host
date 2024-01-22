import { type ReactNode, type FC } from 'react';

import { AppShell, Group, Burger, Skeleton, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useGate } from 'effector-react';

import { PickLocale } from '~/features/pick-locale';

import * as model from './model';

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  useGate(model.Gate);

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Header
          <PickLocale />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <ScrollArea type="always" h="calc(100vh - var(--app-shell-header-height))" p="md">
          {children}
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
};
