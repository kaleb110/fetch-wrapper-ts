import { describe, it, expect, vi, beforeEach } from 'vitest';
import foxios from "../src/core/foxios"

describe('foxios HTTP Client', () => {
  // Reset mocks before each test to ensure test isolation.
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should perform a GET request', async () => {
    // Provide a mock fetch with a JSON content-type header.
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1, title: 'Test Post' }),
        // Set content-type so our code calls .json() instead of .text()
        headers: new Headers({ 'content-type': 'application/json' }),
      })
    ) as unknown as typeof fetch;

    const response = await foxios.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data).toHaveProperty('id', 1);
  });

  it('should perform a POST request', async () => {
    // Mock a POST request returning JSON with proper content-type header.
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ id: 101, title: 'New Post' }),
        headers: new Headers({ 'content-type': 'application/json' }),
      })
    ) as unknown as typeof fetch;

    const response = await foxios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: 'New Post',
      }
    );

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id', 101);
  });

  it('should perform a PUT request', async () => {
    // Mock a PUT request returning updated JSON data.
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1, title: 'Updated Post' }),
        headers: new Headers({ 'content-type': 'application/json' }),
      })
    ) as unknown as typeof fetch;

    const response = await foxios.put(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        title: 'Updated Post',
      }
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('title', 'Updated Post');
  });

  it('should perform a DELETE request', async () => {
    // Mock a DELETE request; often returns a 204 with no content.
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 204,
        json: () => Promise.resolve({}),
        headers: new Headers({ 'content-type': 'application/json' }),
      })
    ) as unknown as typeof fetch;

    const response = await foxios.delete(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status).toBe(204);
  });

  it('should handle network errors', async () => {
    // Simulate a network error by rejecting the fetch promise.
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    await expect(foxios.get('https://invalid-url.com')).rejects.toThrow(
      'Network Error'
    );
  });

  it('should handle non-JSON responses', async () => {
    // Mock a response with a plain text content-type.
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve('Plain text response'),
        headers: new Headers({ 'content-type': 'text/plain' }),
      })
    ) as unknown as typeof fetch;

    const response = await foxios.get('https://example.com/plain-text');
    expect(response.status).toBe(200);
    expect(response.data).toBe('Plain text response');
  });

  it('should throw an error on HTTP errors', async () => {
    // Simulate a 404 error with a JSON response.
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ error: 'Not Found' }),
        headers: new Headers({ 'content-type': 'application/json' }),
      })
    ) as unknown as typeof fetch;

    await expect(
      foxios.get('https://jsonplaceholder.typicode.com/invalid')
    ).rejects.toThrow('Not Found');
  });
});
