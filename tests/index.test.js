const supertest = require("supertest");
const app = require("../server");
const request = supertest(app.app);
const connectDB = require("../utility/connectDB");

//https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf
//https://www.freecodecamp.org/news/end-point-testing/

beforeAll(async () => {
  await app.server;
  console.log("before All");
});

//mock 的 path 是從test file 出發的相對路徑
// jest.mock("../utility/dateTime", () => ({
//   today: () => "123",
// }));

describe("Tool Route Test", () => {
  //非同步測試
  // test("/tool/test", async () => {
  //   const { status, body } = await request.get("/tool/test");
  //   expect(status).toBe(200);
  //   expect(body).toEqual({ success: true, data: { today: "123" } });
  // });

  test("/stock/schedule", async () => {
    const { status, body } = await request.get("/stock/scheudle");
    expect(status).toBe(200);

    const { success, data } = body;
    expect(success).toEqual(true);
    expect(data[0]).toMatchObject({
      _id: "616d29f39f3f2e5d1c96e7fa",
      stockNo: "006204",
      stockName: "永豐臺灣加權",
      year: "2021",
      month: "10",
      date: "20211019",
      cashDividen: 5.3,
      updateDate: "20211018",
      sourceType: "twse",
      __v: 0,
      rate: "5.81",
      price: 91.15,
      priceDate: "20211018",
    });
  });
});

afterAll(async () => {
  console.log("after All");
  let server = await app.server;
  server.close();
  await connectDB.disconnect();
});
