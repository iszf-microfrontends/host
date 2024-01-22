import { MCS_URL } from '~/shared/config/env';

import { createRequest } from './create-request';

export const requestMcs = createRequest({ baseUrl: MCS_URL });
