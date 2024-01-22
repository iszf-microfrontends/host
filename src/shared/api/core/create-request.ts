import queryString from 'query-string';

export type ContentType = 'application/json' | 'multipart/form-data' | 'auto';

export type ResponseType = 'json' | 'arraybuffer' | 'stream';

export type RequestOptions<T> = {
  path: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  body?: T;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  contentType?: ContentType;
  responseType?: ResponseType;
};

export type Responder<T> = {
  ok: boolean;
  data: T;
  status: number;
};

export type CreateRequestOptions = {
  baseUrl?: string;
};

export const createRequest =
  ({ baseUrl }: CreateRequestOptions = {}) =>
  async <B = unknown, D = unknown>(options: RequestOptions<B>): Promise<Responder<D>> => {
    const headers = new Headers(options.headers);
    if (options.contentType !== 'auto') {
      contentDefault(headers, options.contentType ?? 'application/json');
    } else {
      headers.delete('content-type');
    }

    const url = baseUrl ? `${baseUrl}/${options.path}` : options.path;
    const query = queryToString(options.query);
    const body = contentIs(headers, 'application/json') ? JSON.stringify(options.body) : (options.body as any);

    const response = await fetch(`${url}${query}`, {
      method: options.method,
      headers,
      body,
      credentials: 'include',
    });

    const data: D = await parseResponse(response);
    const responder: Responder<D> = {
      ok: response.ok,
      data,
      status: response.status,
    };

    if (responder.ok) {
      return responder;
    }

    throw responder;
  };

const contentIs = (headers: Headers, type: ContentType): boolean =>
  headers.get('content-type')?.includes(type) ?? false;

const contentDefault = (headers: Headers, type: ContentType): Headers => {
  if (!headers.has('content-type')) {
    headers.set('content-type', type);
  }
  return headers;
};

const queryToString = (query: Record<string, string> | undefined): string =>
  query ? `?${queryString.stringify(query)}` : '';

const parseResponse = async (response: Response): Promise<any> => {
  const contentType = response.headers.get('content-type');
  if (contentType) {
    if (contentType.includes('stream')) {
      return response.text();
    }
    if (contentType.includes('arraybuffer')) {
      return response.arrayBuffer();
    }
  }
  return response.json();
};
