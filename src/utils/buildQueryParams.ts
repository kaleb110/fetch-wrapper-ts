/**
 * Recursively builds a query string from an object.
 *
 * Supports nested objects and arrays.
 *
 * @param obj - The query parameters object.
 * @param prefix - (Optional) The key prefix for nested values.
 * @returns A URL-encoded query string.
 */
export function buildQueryParams(
  obj: Record<string, any>,
  prefix?: string
): string {
  const pairs: string[] = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const prefixedKey = prefix
      ? `${prefix}[${encodeURIComponent(key)}]`
      : encodeURIComponent(key);

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      pairs.push(buildQueryParams(value, prefixedKey));
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        pairs.push(`${prefixedKey}[]=${encodeURIComponent(String(item))}`);
      });
    } else {
      pairs.push(`${prefixedKey}=${encodeURIComponent(String(value))}`);
    }
  });

  return pairs.join('&');
}
