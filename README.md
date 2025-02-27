# Fetch Wrapper TS

A simple and advanced wrapper around `fetch` for making HTTP requests easily with interceptors.

## Installation

```sh
npm install fetch-wrapper-ts
```

or with Yarn:

```sh
yarn add fetch-wrapper-ts
```

## Usage

```typescript
import AdvancedFetch from "fetch-wrapper-ts";

const api = new AdvancedFetch("https://jsonplaceholder.typicode.com");

// Add a request interceptor
api.addRequestInterceptor(async (url, options) => {
  console.log("Request URL:", url);
  console.log("Request Options:", options);
  return [url, options];
});

// Add a response interceptor
api.addResponseInterceptor(async (response) => {
  console.log("Response received:", response);
  return response;
});

(async () => {
  try {
    const posts = await api.get<any[]>("/posts", { queryParams: { _limit: 5 } });
    console.log("Posts:", posts.data);
  } catch (error) {
    console.error("API Error:", error);
  }
})();
```

## Features
- ✅ Simple GET, POST, PUT, DELETE requests
- ✅ Request & response interceptors
- ✅ Error handling

## License
MIT

