import AdvancedFetch from "../src/index";

// Create an instance with a base URL.
const api = new AdvancedFetch("https://jsonplaceholder.typicode.com");

// Add a request interceptor to log outgoing requests.
api.addRequestInterceptor((url, options) => {
  console.log("Request URL:", url);
  console.log("Request Options:", options);
  return [url, options];
});

// Add a response interceptor to log responses.
api.addResponseInterceptor((response) => {
  console.log("Response received:", response);
  return response;
});

(async () => {
  try {
    // GET request with query params.
    const postsResponse = await api.get<any[]>("/posts", {
      queryParams: { _limit: 2 },
    });
    console.log("Posts:", postsResponse.data);

    // POST request.
    const newPostResponse = await api.post("/posts", {
      title: "Hello World",
      body: "This is a test post.",
      userId: 1,
    });
    console.log("New Post:", newPostResponse.data);
  } catch (error) {
    console.error("API Error:", error);
  }
})();
