import request from "supertest";
import { app } from "../../src";

describe("/skille", () => {
  it("da", async () => {
    const t = await request(app);

    t.get("/skill").expect(200, [
      { id: 1, title: "front" },
      { id: 2, title: "back" },
      { id: 3, title: "web3" },
    ]);
  });
});
