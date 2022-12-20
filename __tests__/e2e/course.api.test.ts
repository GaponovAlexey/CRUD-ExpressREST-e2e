import request from "supertest"
import { app, HTTP_STATUSES } from "../../src"
import { CreateInputModel } from "../../src/model/createModel"

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
    const data: CreateInputModel = { title: "" }
    await request(app)
      .post("/skill")
      .send()
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
  })
  it("shouldn't create skill 400 if bad and 200 after create ", async () => {
    const data: CreateInputModel = { title: "" }
    await request(app)
    .post("/skill")
    .send(data)
    .expect(HTTP_STATUSES.BAD_REQUEST_400)
    
    await request(app).get("/skill").expect(HTTP_STATUSES.OK_200, [])
  })
  it("should create skill request 200, and body after create", async () => {
    const data: CreateInputModel = { title: "big Data" }
    const createResponse = await request(app)
      .post("/skill")
      .send(data)
      .expect(HTTP_STATUSES.CREATED_201)

    expect(createResponse.body).toEqual({
      id: expect.any(Number),
      title: "big Data",
    })

    await request(app)
      .get("/skill")
      .expect(HTTP_STATUSES.OK_200, [createResponse.body])
  })
})
