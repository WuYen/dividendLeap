//const request = require("supertest");
//const server = require("../server");
//const connectDB = require("../utility/connectDB");

//https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf

beforeAll((done) => {
  console.log("before All");
  done();
});

describe("Test Route", () => {
  test("stock/scheudle", (done) => {
    request(server).get("/stock/scheudle").expect("Content-Type", /json/).expect(200);
  });
});

describe("Test example", () => {
  test("Sample", () => {
    expect(2).toBe(2);
  });
});

afterAll((done) => {
  console.log("after All");
  // Closing the DB connection allows Jest to exit successfully.
  // connectDB.disconnect();
  done();
});
