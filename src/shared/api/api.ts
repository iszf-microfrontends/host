import { MCS_URL } from '../config';

import { HttpClient } from './http';
import { McsService } from './mcs';

class Api {
  mcsService = new McsService(new HttpClient({ baseURL: MCS_URL }));
}

export const api = new Api();
