import { RequestConfig, FoxiosResponse } from '../types';

// Define interceptor types
type RequestInterceptor = (config: RequestConfig) => RequestConfig;
type ResponseInterceptor = (
  response: FoxiosResponse<any>
) => FoxiosResponse<any>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

/**
 * Executes all registered request interceptors.
 * @param config The request configuration.
 * @returns The modified request configuration after interceptors are applied.
 */
export function executeRequestInterceptors(
  config: RequestConfig
): RequestConfig {
  return requestInterceptors.reduce(
    (modifiedConfig, interceptor) => interceptor(modifiedConfig),
    config
  );
}

/**
 * Executes all registered response interceptors.
 * @param response The response object.
 * @returns The modified response after interceptors are applied.
 */
export function executeResponseInterceptors(
  response: FoxiosResponse<any>
): FoxiosResponse<any> {
  return responseInterceptors.reduce(
    (modifiedResponse, interceptor) => interceptor(modifiedResponse),
    response
  );
}

/**
 * Adds a request interceptor.
 * @param interceptor The request interceptor function.
 */
export function addRequestInterceptor(interceptor: RequestInterceptor) {
  requestInterceptors.push(interceptor);
}

/**
 * Adds a response interceptor.
 * @param interceptor The response interceptor function.
 */
export function addResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptors.push(interceptor);
}
