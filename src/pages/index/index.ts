import { lazy } from 'react';

import { BaseLayout } from '~/layouts/base';
import { delay } from '~/shared/lib/time';
import { routeMap } from '~/shared/routing';

const IndexPage = lazy(async () => {
  await delay(5000);
  const module = await import('./ui');
  return { default: module.IndexPage };
});

export const IndexRoute = {
  route: routeMap.index,
  view: IndexPage,
  layout: BaseLayout,
};
