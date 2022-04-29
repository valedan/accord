import { createMocks } from "node-mocks-http";

import hello from "./hello.api";

// It would be much better to test the API with Supertest, which would let us test the full route end-to-end rather than just the route handler. But it's hard to set up with Next API routes because it needs access to the express app object.
describe("/api/hello", () => {
  it("returns a welcome message", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    hello(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Hello world!",
      })
    );
  });
});
