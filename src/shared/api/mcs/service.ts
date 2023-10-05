import { HttpRequestService } from '../http';

import { type MicrofrontendDto } from './types';

export class McsService extends HttpRequestService {
  async getAll(): Promise<MicrofrontendDto[]> {
    return this.httpClient.get('microfrontends');
  }
}
