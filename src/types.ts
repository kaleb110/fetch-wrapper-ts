export interface RequestConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | boolean>;
}

export interface FoxiosResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

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
}
