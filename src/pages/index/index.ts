import { lazy } from 'react';

import { BaseLayout } from '~/layouts/base';
import { delay } from '~/shared/lib/time';
import { routingModel } from '~/shared/routing';

const IndexPage = lazy(async () => {
  await delay(2000);
  const module = await import('./ui');
  return { default: module.IndexPage };
});

export const IndexRoute = {
  route: routingModel.routeMap.index,
  view: IndexPage,
  layout: BaseLayout,
};
