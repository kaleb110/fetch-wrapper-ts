import foxios from '../src/core/foxios';

// ==============================
// Setup: Add an Interceptor for Authentication
// ==============================
// This interceptor automatically appends an Authorization header to every request.
foxios.interceptors.request.use((config) => {
  const token = 'your-auth-token'; // Replace this with dynamic retrieval (e.g., localStorage, context, etc.)
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
});

async function runExamples() {
  try {
    // Relative URL example (assumes you're running in a browser)
    console.log('=== GET Request Example (Relative URL) ===');
    const getResponseRelative = await foxios.get(
      '/posts', // relative URL
      {
        baseURL: 'https://jsonplaceholder.typicode.com', // or omit this if running in a browser
        queryParams: { _limit: 2 },
        timeout: 5000, // 5-second timeout
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log('Relative URL GET Response:', getResponseRelative.data);

    // Absolute URL example
    console.log('\n=== GET Request Example (Absolute URL) ===');
    const getResponseAbsolute = await foxios.get(
      'https://jsonplaceholder.typicode.com/posts?_limit=2',
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log('Absolute URL GET Response:', getResponseAbsolute.data);

    console.log('\n=== POST Request Example ===');
    const postResponse = await foxios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: 'New Post',
        body: 'This is a test post.',
        userId: 1,
      },
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log('POST Response:', postResponse.data);

    console.log('\n=== PUT Request Example ===');
    const putResponse = await foxios.put(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        title: 'Updated Post',
        body: 'Updated content.',
        userId: 1,
      },
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log('PUT Response:', putResponse.data);

    console.log('\n=== DELETE Request Example ===');
    const deleteResponse = await foxios.delete(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log(`Deleted with status ${deleteResponse.status}`);
  } catch (error) {
    console.error('Error during Foxios requests:', error);
  }
}

runExamples();
