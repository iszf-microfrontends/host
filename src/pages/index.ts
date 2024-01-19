import { createRoutesView } from 'atomic-router-react';

import { IndexRoute } from './index/index';

export const Pages = createRoutesView({
  routes: [IndexRoute],
});
