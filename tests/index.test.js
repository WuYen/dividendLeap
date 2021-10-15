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

describe("Test Route", () => {
  //非同步測試
  test("/tool/test", async () => {
    const response = await request.get("/tool/test");
    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  console.log("after All");
  let server = await app.server;
  server.close();
  await connectDB.disconnect();
});
