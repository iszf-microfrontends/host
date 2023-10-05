import { type HttpClient } from './client';

export class HttpRequestService {
  constructor(protected httpClient: HttpClient) {}
}
