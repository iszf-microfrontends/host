import { type FC } from 'react';

import { Menu, Image, UnstyledButton, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import { i18nModel } from '~/shared/i18n';

import { menuItems } from '../config';

import styles from './styles.module.css';

export const PickLocale: FC = () => {
  const [locale, localeChanged] = useUnit([i18nModel.$locale, i18nModel.localeChanged]);
  const t = useUnit(i18nModel.$t);

  const [opened, { open, close }] = useDisclosure();

  const selected = menuItems.find((item) => item.locale === locale) ?? menuItems[0];

  const items = menuItems.map((item) => (
    <Menu.Item
      key={item.locale}
      leftSection={<Image src={item.image} width={18} height={18} />}
      onClick={() => localeChanged(item.locale)}
    >
      {t(item.label)}
    </Menu.Item>
  ));

  return (
    <Menu radius="md" width="target" withinPortal onOpen={open} onClose={close}>
      <Menu.Target>
        <UnstyledButton className={styles.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={styles.label}>{t(selected.label)}</span>
          </Group>
          <IconChevronDown className={styles.icon} size="1rem" stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
