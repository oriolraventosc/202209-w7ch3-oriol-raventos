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

describe("Given a POST /users/register endpoint", () => {
  const userdata = {
    username: "oriol",
    password: "password",
    email: "oriol@gmail.com",
  };
  describe("When it receives a request with username 'oriol' and password 'password' and email 'oriol@gmail.com'", () => {
    test("Then it should respond with a 201 status and the new user", async () => {
      const expectedStatus = 201;

      const response = await request(app)
        .post("/users/register")
        .send(userdata)
        .expect(expectedStatus);

      expect(response.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});

describe("Given a POST /users/login endpoint", () => {
  const userdata = {
    username: "Marcel",
    password: "marcel2",
    email: "marcel2@gmail.com",
  };
  describe("When it receives a request with username 'Marcel' and password 'marcel2' and email 'marcel2@gmail.com'", () => {
    test("Then it should respond with a 200 status and return the token", async () => {
      const expectedStatus = 200;

      const response = await request(app)
        .post("/users/login")
        .send(userdata)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("accessToken");
    });
  });
});
