export interface RequestOptions extends RequestInit {
  // Optional query parameters to append to the URL.
  queryParams?: Record<string, string | number | boolean>;
}

export interface FetchResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export type RequestInterceptor = (
  url: string,
  options: RequestOptions
) => Promise<[string, RequestOptions]> | [string, RequestOptions];

export type ResponseInterceptor<T = unknown> = (
  response: FetchResponse<T>
) => Promise<FetchResponse<T>> | FetchResponse<T>;
