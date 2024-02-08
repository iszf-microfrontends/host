import { MCS_URL } from '../config/env';

import { createRequestClient } from './core';

export type Microfrontend = {
  id: string;
  name: string;
  url: string;
  contentComponent: string;
  backendName: string;
  isActive: boolean;
};

const mcsRequestClient = createRequestClient({ baseUrl: MCS_URL, withCredentials: true });

export const api = {
  getMicrofrontendList: async (): Promise<Microfrontend[]> =>
    mcsRequestClient.send({
      url: 'microfrontends',
      method: 'GET',
    }),
};
