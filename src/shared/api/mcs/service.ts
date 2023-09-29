import { MicrofrontendDto } from './types';

import { HttpRequestService } from '../http';

export class McsService extends HttpRequestService {
  getAll = () => this.httpClient.get<MicrofrontendDto[]>('microfrontends');
}
