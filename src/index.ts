import { RequestConfig, FoxiosResponse, FoxiosInstance } from "./types";
import { FoxiosError } from "./error";

async function request<T>(
  method: string,
  url: string,
  data?: any,
  config: RequestConfig = {}
): Promise<FoxiosResponse<T>> {
  let fullUrl: string;

  // Ensure the URL is properly formatted
  if (config.baseURL) {
    fullUrl = new URL(url, config.baseURL).toString();
  } else if (url.startsWith("http")) {
    fullUrl = url;
  } else {
    throw new FoxiosError(`Invalid URL: ${url}`, 0);
  }

  // Append query parameters
  if (config.queryParams) {
    const params = new URLSearchParams();
    for (const key in config.queryParams) {
      params.append(key, String(config.queryParams[key]));
    }
    fullUrl += `?${params.toString()}`;
  }

  const headers = new Headers(config.headers || {});
  if (data && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const init: RequestInit = {
    method,
    headers,
    cache: "no-store", // Avoid unnecessary cache hits
    keepalive: true, // Keeps the connection alive
  };

  if (data) {
    init.body = headers.get("Content-Type")?.includes("application/json")
      ? JSON.stringify(data)
      : data;
  }

  let response: Response;
  try {
    response = await fetch(fullUrl, init);
  } catch (err: any) {
    throw new FoxiosError(`Network Error: ${err.message}`, 0);
  }

  const contentType = response.headers.get("content-type");
  let responseData: any;
  try {
    responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch {
    responseData = null;
  }

  const foxiosResponse: FoxiosResponse<T> = {
    data: responseData,
    status: response.status,
    headers: response.headers,
  };

  if (!response.ok) {
    throw new FoxiosError(
      response.statusText,
      response.status,
      response,
      responseData
    );
  }

  return foxiosResponse;
}

const foxios: FoxiosInstance = {
  get: <T>(url: string, config?: RequestConfig) =>
    request<T>("GET", url, undefined, config),
  post: <T>(url: string, data?: any, config?: RequestConfig) =>
    request<T>("POST", url, data, config),
  put: <T>(url: string, data?: any, config?: RequestConfig) =>
    request<T>("PUT", url, data, config),
  delete: <T>(url: string, config?: RequestConfig) =>
    request<T>("DELETE", url, undefined, config),
};

export default foxios;
