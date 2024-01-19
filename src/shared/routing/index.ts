import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { createBrowserHistory } from 'history';

export type RouteType = ReturnType<typeof createRoute>;

export const routeMap = {
  index: createRoute(),
};

export const routerControls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routeMap.index,
    },
  ],
});

export const routerInitialized = createEvent();

sample({
  clock: routerInitialized,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
