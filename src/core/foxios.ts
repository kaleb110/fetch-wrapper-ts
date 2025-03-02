import { RequestConfig, FoxiosResponse, FoxiosInstance } from '../types';
import { FoxiosError } from '../errors/foxiosError';
import { buildQueryParams } from '../utils/buildQueryParams';
import {
  executeRequestInterceptors,
  executeResponseInterceptors,
  addRequestInterceptor,
  addResponseInterceptor,
} from './interceptors';

/**
 * Core request function for Foxios.
 */
async function request<T>(
  method: string,
  url: string,
  data?: any,
  config: RequestConfig = {}
): Promise<FoxiosResponse<T>> {
  // Apply request interceptors before modifying request config
  config = executeRequestInterceptors(config);

  let fullUrl: string;

  // Handle baseURL and absolute/relative URLs
  if (config.baseURL) {
    fullUrl = new URL(url, config.baseURL).toString();
  } else if (url.match(/^https?:\/\//)) {
    fullUrl = url;
  } else {
    throw new FoxiosError(`Invalid URL: ${url}`, 0);
  }

  // Append query parameters if provided
  if (config.queryParams) {
    const queryString = buildQueryParams(config.queryParams);
    fullUrl += fullUrl.includes('?') ? `&${queryString}` : `?${queryString}`;
  }

  // Set up headers
  const headers = new Headers(config.headers || {});
  if (data && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Fetch options
  const init: RequestInit = {
    method,
    headers,
    cache: 'no-store',
    keepalive: true,
    credentials: config.withCredentials ? 'include' : 'same-origin', // ✅ Added withCredentials support
  };

  if (data) {
    init.body = headers.get('Content-Type')?.includes('application/json')
      ? JSON.stringify(data)
      : data;
  }

  return fetch(fullUrl, init).then(async (response) => {
    const contentType = response.headers.get('content-type');
    const responseData = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new FoxiosError(
        response.statusText,
        response.status,
        response,
        responseData
      );
    }

    let finalResponse = {
      data: responseData,
      status: response.status,
      headers: response.headers,
    };

    // Apply response interceptors before returning
    finalResponse = executeResponseInterceptors(finalResponse);

    return finalResponse;
  });
}

/**
 * Foxios instance with HTTP methods and interceptor functionality.
 */
const foxios: FoxiosInstance = {
  get: <T>(url: string, config?: RequestConfig) =>
    request<T>('GET', url, undefined, config),
  post: <T>(url: string, data?: any, config?: RequestConfig) =>
    request<T>('POST', url, data, config),
  put: <T>(url: string, data?: any, config?: RequestConfig) =>
    request<T>('PUT', url, data, config),
  delete: <T>(url: string, config?: RequestConfig) =>
    request<T>('DELETE', url, undefined, config),

  interceptors: {
    request: { use: addRequestInterceptor },
    response: { use: addResponseInterceptor },
  },
};

export default foxios;
