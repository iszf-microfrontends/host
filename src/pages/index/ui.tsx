import { type FC } from 'react';

import { Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import { i18nModel } from '~/shared/i18n';
import { useTitle } from '~/shared/lib/dom';

export const IndexPage: FC = () => {
  const t = useUnit(i18nModel.$t);

  useTitle(t('index.title'));

  return <Text>Index Page</Text>;
};
