import {
  RequestOptions,
  FetchResponse,
  RequestInterceptor,
  ResponseInterceptor,
} from "./types";
import { FetchError } from "./error";

export class AdvancedFetch {
  private baseUrl: string;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  public setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  public addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  private async applyRequestInterceptors(
    url: string,
    options: RequestOptions
  ): Promise<[string, RequestOptions]> {
    let modifiedUrl = url;
    let modifiedOptions = { ...options };
    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(modifiedUrl, modifiedOptions);
      modifiedUrl = result[0];
      modifiedOptions = result[1];
    }
    return [modifiedUrl, modifiedOptions];
  }

  private async applyResponseInterceptors<T>(
    response: FetchResponse<T>
  ): Promise<FetchResponse<T>> {
    let modifiedResponse = response;
    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse) as FetchResponse<T>;
    }
    return modifiedResponse;
  }

  private buildQueryParams(
    queryParams?: Record<string, string | number | boolean>
  ): string {
    if (!queryParams) return "";
    const query = new URLSearchParams();
    for (const key in queryParams) {
      query.append(key, String(queryParams[key]));
    }
    return `?${query.toString()}`;
  }

  public async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<FetchResponse<T>> {
    let url = this.baseUrl + endpoint;
    if (options.queryParams) {
      url += this.buildQueryParams(options.queryParams);
      delete options.queryParams;
    }

    // Apply request interceptors.
    [url, options] = await this.applyRequestInterceptors(url, options);

    const response = await fetch(url, options);
    const headers = response.headers;
    const status = response.status;
    let data: T;

    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }
    } catch (error) {
      throw new FetchError("Failed to parse response", status, response);
    }

    const fetchResponse: FetchResponse<T> = { data, status, headers };

    if (!response.ok) {
      throw new FetchError(response.statusText, status, response, data);
    }

    return await this.applyResponseInterceptors(fetchResponse);
  }

  public get<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  }

  public put<T>(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  }

  public delete<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export default AdvancedFetch;
