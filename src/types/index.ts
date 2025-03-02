/**
 * Defines the configuration options for a request.
 */
export interface RequestConfig {
  baseURL?: string;
  queryParams?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  withCredentials?: boolean;
}

/**
 * Represents the response structure of Foxios.
 */
export interface FoxiosResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
}

/**
 * Represents the Foxios instance with HTTP methods and interceptors.
 */
export interface FoxiosInstance {
  get<T>(url: string, config?: RequestConfig): Promise<FoxiosResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<FoxiosResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<FoxiosResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<FoxiosResponse<T>>;
  interceptors: {
    request: { use: (interceptor: RequestInterceptor) => void };
    response: { use: (interceptor: ResponseInterceptor) => void };
  };
}

/**
 * Type for request interceptors.
 */
export type RequestInterceptor = (config: RequestConfig) => RequestConfig;

/**
 * Type for response interceptors.
 */
export type ResponseInterceptor = (
  response: FoxiosResponse<any>
) => FoxiosResponse<any>;
