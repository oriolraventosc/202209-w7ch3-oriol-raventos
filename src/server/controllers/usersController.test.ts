import enviroment from "../../loadEnviroment";
import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import mockUser from "../../mocks/mockUser.js";
import { userRegister } from "../controllers/usersController.js";
import CustomError from "../customError/customError.js";

beforeEach(async () => {
  await mongoose.disconnect();
  await mongoose.connect(enviroment.mongodbUrl);
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.connection.close();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a userRegister controller", () => {
  describe("When it receives a response with paco's credentials", () => {
    test("Then it should call it's method with a status 201", async () => {
      const expectedStatus = 201;

      const req: Partial<Request> = {
        body: mockUser,
      };

      await userRegister(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response without paco's username", () => {
    test("Then it should it should call it's method next", async () => {
      const customError = new CustomError(
        "Error registering",
        400,
        "Missing credentials"
      );

      const req: Partial<Request> = {
        body: { ...mockUser, username: "" },
      };

      await userRegister(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
