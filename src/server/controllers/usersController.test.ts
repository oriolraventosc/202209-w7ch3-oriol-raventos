import type { NextFunction, Request, Response } from "express";
import mockUser from "../../mocks/mockUser.js";
import { userRegister } from "../controllers/usersController.js";
import CustomError from "../customError/customError.js";
import { User } from "../../database/models/Users/Users";

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
      User.create = jest.fn().mockResolvedValue(mockUser);
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

  describe("When it receives a response without paco's password", () => {
    test("Then it should call it's method next", async () => {
      const customError = new CustomError(
        "Error registering",
        400,
        "Missing credentials"
      );

      const req: Partial<Request> = {
        body: { ...mockUser, password: "" },
      };

      await userRegister(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a response without paco's email", () => {
    test("Then it should call it's method next", async () => {
      const customError = new CustomError(
        "Error registering",
        400,
        "Missing credentials"
      );

      const req: Partial<Request> = {
        body: { ...mockUser, email: "" },
      };

      await userRegister(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
