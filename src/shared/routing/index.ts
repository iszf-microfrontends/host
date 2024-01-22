import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { appStarted } from '../config/init';

export type RouteType = ReturnType<typeof createRoute>;

const routeMap = {
  index: createRoute(),
  service: createRoute<{ serviceId: string }>(),
};

const controls = createRouterControls();

const router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routeMap.index,
    },
    {
      path: '/services/:serviceId',
      route: routeMap.service,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});

export const routingModel = { router, controls, routeMap };
