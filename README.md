 <p align="center">
  <img src="https://i.postimg.cc/ydGxpJHT/logo-4.png" alt="Logo">
</p>
<p align="center">
  a lightweight fetch api wrapper
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/foxios.svg?style=flat-square)](https://www.npmjs.org/package/foxios)
![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=foxios&query=$.install.pretty&label=install%20size&style=flat-square)
[![Known Vulnerabilities](https://snyk.io/test/npm/foxios/badge.svg)](https://snyk.io/test/npm/foxios)




</div>
Foxios is a simple HTTP client inspired by foxios but built around the Fetch API. It provides a clean interface for making HTTP requests with support for query parameters, request/response interceptors, and error handling.

## Installation

```sh
npm install foxios
```

or

```sh
yarn add foxios
```

## Usage

### Import Foxios

```typescript
import foxios from 'foxios';
```

### GET Request

```typescript
const response = await foxios.get('/posts', {
  baseURL: 'https://jsonplaceholder.typicode.com',
  queryParams: { _limit: 5 },
});
console.log(response.data);
```

### POST Request

```typescript
const response = await foxios.post(
  '/posts',
  {
    title: 'Hello World',
    body: 'This is a test post.',
    userId: 1,
  },
  {
    baseURL: 'https://jsonplaceholder.typicode.com',
  }
);
console.log(response.data);
```

### PUT Request

```typescript
const response = await foxios.put(
  '/posts/1',
  {
    title: 'Updated Title',
    body: 'Updated Content.',
  },
  {
    baseURL: 'https://jsonplaceholder.typicode.com',
  }
);
console.log(response.data);
```

### DELETE Request

```typescript
const response = await foxios.delete('/posts/1', {
  baseURL: 'https://jsonplaceholder.typicode.com',
});
console.log(response.data);
```

## Error Handling

```typescript
try {
  const response = await foxios.get('/invalid-url', {
    baseURL: 'https://jsonplaceholder.typicode.com',
  });
} catch (error) {
  console.error('Request failed:', error);
}
```

## Contribution Guidelines

### How to Contribute

- Fork the repository.
- Create a feature branch.
- Commit your changes with clear messages.
- Open a pull request.

### Code Style

- Follow TypeScript best practices.
- Use meaningful variable and function names.
- Maintain clean and readable code.

### Reporting Issues

- Open an issue with clear reproduction steps.
- Provide expected and actual behavior.

Foxios is open-source and contributions are welcome! 🚀
