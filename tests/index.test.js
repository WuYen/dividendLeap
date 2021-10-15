const supertest = require("supertest");
const app = require("../server");
const request = supertest(app.app);
const connectDB = require("../utility/connectDB");

//https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf
//https://www.freecodecamp.org/news/end-point-testing/

beforeAll(async () => {
  console.log("before All");
  await app.server;
});

//mock 的 path 是從test file 出發的相對路徑
jest.mock("../utility/dateTime", () => ({
  today: () => "123",
}));

describe("Tool Route Test", () => {
  //非同步測試
  test("/tool/test", async () => {
    const { status, body } = await request.get("/tool/test");
    expect(status).toBe(200);
    expect(body).toEqual({ success: true, data: { today: "123" } });
  });
});

afterAll(async () => {
  console.log("after All");
  let server = await app.server;
  server.close();
  await connectDB.disconnect();
});
