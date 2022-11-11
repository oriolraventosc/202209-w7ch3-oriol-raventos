import enviroment from "../../loadEnviroment";
import request from "supertest";
import connectToDatabase from "../../database";
import mongoose from "mongoose";
import app from "../app";

beforeAll(async () => {
  await connectToDatabase(enviroment.mongodbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
});

const tokenValue =
  "Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRkMWRkNDY3YWVkZDRhZGU5Yjg4YSIsInVzZXJuYW1lIjoiTWFzdGVyIiwiaWF0IjoxNjY4MTUzMjk2LCJleHAiOjE2Njg0MTI0OTZ9.x-R7RSu_DBkHeMvEHGWZiid0eYdL3PtXgKRzwzUQays";

const commonHeader = {
  authorization: tokenValue,
};

describe("Given a GET /items/list endpoint", () => {
  const userData = {
    owner: "Master",
  };
  describe("When it receives a request with the owner 'Master'", () => {
    test("Then it should respond with a 200 status and a list of items", async () => {
      const expectedStatus = 200;

      const itemsList = {
        items: [
          {
            owner: "Master",
            name: "Game",
            id: "636dd25c467aedd4ade9b88f",
          },
        ],
      };

      const response = await request(app)
        .get("/items/list")
        .send(userData)
        .set(commonHeader)
        .expect(expectedStatus);

      expect(response.body).toStrictEqual(itemsList);
    });
  });
});
