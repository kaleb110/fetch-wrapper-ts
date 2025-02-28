import { describe, it, expect } from "vitest";
import foxios from "../src/index";

describe("foxios HTTP Client", () => {
  it("should perform a GET request", async () => {
    const response = await foxios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("id", 1);
  });

  it("should handle network errors", async () => {
    try {
      await foxios.get("https://invalid-url.com");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
