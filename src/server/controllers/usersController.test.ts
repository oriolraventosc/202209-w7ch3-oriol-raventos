import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mockUser from "../../mocks/mockUser.js";
import { userRegister, userLogin } from "../controllers/usersController.js";
import CustomError from "../customError/customError.js";
import { User } from "../../database/models/Users/Users";
import mockUsersData from "../../mocks/mockUsersData.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const tokenPayload = {};

const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY);

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

describe("Given a userLogin controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call it's method with a status 200", async () => {
      const status = 200;

      const req: Partial<Request> = {
        body: mockUsersData,
      };

      User.findOne = jest.fn().mockResolvedValue(mockUsersData);
      jwt.sign = jest.fn().mockReturnValueOnce(token);
      bcrypt.compare = jest.fn().mockReturnValueOnce(true);

      await userLogin(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call it's method json with the user token", async () => {
      const req: Partial<Request> = {
        body: mockUsersData,
      };

      User.findOne = jest.fn().mockResolvedValue(mockUsersData);
      jwt.sign = jest.fn().mockReturnValueOnce(token);
      bcrypt.compare = jest.fn().mockReturnValueOnce(true);

      await userLogin(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({ accessToken: token });
    });
  });

  describe("When it receives a response with an empty body", () => {
    test("Then it should call the next function with a customError", async () => {
      const customError = new CustomError("", 401, "User not found!");
      const req: Partial<Request> = {
        body: {},
      };

      User.findOne = jest.fn().mockRejectedValue(customError);
      await userLogin(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
