import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  BadDataError,
  ConflictError,
  ErrorStatus,
  ForbiddenError,
  HttpError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from './error';

export class HttpClient {
  private _axiosInstance: AxiosInstance;

  constructor(options: { baseURL: string }) {
    this._axiosInstance = axios.create({
      baseURL: options.baseURL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this._setInterceptors();
  }

  private _setInterceptors = () => {
    this._axiosInstance.interceptors.response.use(
      (res) => res.data,
      (err: AxiosError) => {
        const status = err.response?.status;
        let error: HttpError | null = null;
        switch (status) {
          case ErrorStatus.BAD_DATA:
            error = new BadDataError();
            break;
          case ErrorStatus.UNAUTHORIZED:
            error = new UnauthorizedError();
            break;
          case ErrorStatus.FORBIDDEN:
            error = new ForbiddenError();
            break;
          case ErrorStatus.NOT_FOUND:
            error = new NotFoundError();
            break;
          case ErrorStatus.CONFLICT:
            error = new ConflictError();
            break;
          default:
            error = new ServerError();
        }
        return Promise.reject(error);
      },
    );
  };

  get = <Res>(endpoint: string, config?: AxiosRequestConfig): Promise<Res> => this._axiosInstance.get(endpoint, config);

  post = <Res, Data = unknown>(url: string, data: Data, config?: AxiosRequestConfig): Promise<Res> =>
    this._axiosInstance.post(url, data, config);

  delete = <Res>(url: string, config?: AxiosRequestConfig): Promise<Res> => this._axiosInstance.delete(url, config);

  put = <Res, Data>(url: string, data: Data, config?: AxiosRequestConfig): Promise<Res> => this._axiosInstance.put(url, data, config);
}
