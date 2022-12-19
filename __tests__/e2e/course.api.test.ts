import request from "supertest"
import { app, HTTP_STATUSES } from "../../src"

describe("/", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data")
  }) //clean db
  it("should return 200 and entry array", async () => {
    await request(app).get("/skill").expect(HTTP_STATUSES.OK_200, [])
  })
  it("should return 404 for not existing skill", async () => {
    await request(app).get("/skill/1").expect(HTTP_STATUSES.NOT_FOUND_404)
  })
  it("shouldn't create skill with correct input data 400", async () => {
    await request(app)
      .post("/skill")
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
  })
})
