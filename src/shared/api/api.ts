import { HttpClient } from './http';
import { McsService } from './mcs';

import { MCS_URL } from '../config';

class Api {
  mcsService = new McsService(new HttpClient({ baseURL: MCS_URL }));
}

export const api = new Api();
