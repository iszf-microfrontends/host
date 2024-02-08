import queryString from 'query-string';

import {
  ApiErrorStatus,
  type ApiError,
  BadDataError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from './api-error';

type ContentType = 'application/json' | 'multipart/form-data';

type ResponseType = 'json' | 'arraybuffer' | 'stream';

type RequestOptions<T> = {
  url: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  data?: T;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  contentType?: ContentType;
  responseType?: ResponseType;
};

type RequestClient = {
  send: <TData, TResult>(options: RequestOptions<TData>) => Promise<TResult>;
};

type CreateRequestClientOptions = {
  baseUrl?: string;
  withCredentials?: boolean;
};

export const createRequestClient = ({ baseUrl, withCredentials }: CreateRequestClientOptions = {}): RequestClient => {
  const buildUrl = (url: string, query?: Record<string, any>): string =>
    [baseUrl, url].filter(Boolean).join('/') + queryToString(query);

  const send: RequestClient['send'] = async (options) => {
    const headers = new Headers(options.headers);
    if (options.contentType !== 'multipart/form-data') {
      contentDefault(headers, options.contentType ?? 'application/json');
    }

    const body =
      contentIs(headers, 'application/json') && options.data
        ? JSON.stringify(options.data)
        : (options.data as BodyInit);

    const response = await fetch(buildUrl(options.url, options.query), {
      method: options.method,
      headers,
      body,
      credentials: withCredentials ? 'include' : undefined,
    });

    if ([200, 201].includes(response.status)) {
      return parseResponse(response);
    }
    throw parseErrorStatus(response.status);
  };

  return {
    send,
  };
};

function contentIs(headers: Headers, type: ContentType): boolean {
  return Boolean(headers.get('content-type')?.includes(type));
}

function contentDefault(headers: Headers, type: ContentType): void {
  if (!headers.has('content-type')) {
    headers.set('content-type', type);
  }
}

function queryToString(query: Record<string, any> | undefined): string {
  return query ? `?${queryString.stringify(query)}` : '';
}

async function parseResponse(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type') ?? 'json';
  if (contentType === 'stream') {
    return response.text();
  }
  if (contentType === 'arraybuffer') {
    return response.arrayBuffer();
  }
  return response.json();
}

function parseErrorStatus(status: number): ApiError {
  if (status === ApiErrorStatus.BAD_DATA) {
    return new BadDataError();
  }
  if (status === ApiErrorStatus.UNAUTHORIZED) {
    return new UnauthorizedError();
  }
  if (status === ApiErrorStatus.FORBIDDEN) {
    return new ForbiddenError();
  }
  if (status === ApiErrorStatus.NOT_FOUND) {
    return new NotFoundError();
  }
  if (status === ApiErrorStatus.CONFLICT) {
    return new ConflictError();
  }
  return new ServerError();
}
