import { createEffect } from 'effector';

import { requestMcs } from '../core';
import { type Responder } from '../core/create-request';

import { type Microfrontend } from './types';

export const getAllFx = createEffect<void, Responder<Microfrontend[]>>(async () =>
  requestMcs({
    path: 'microfrontends',
    method: 'GET',
  }),
);
