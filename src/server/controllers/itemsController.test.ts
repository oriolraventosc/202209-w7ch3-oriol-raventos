import type { NextFunction, Request, Response } from "express";
import { Item } from "../../database/models/Items/Items";
import mockCreateItem from "../../mocks/mockCreateItem";
import mockItems from "../../mocks/mockItems";
import CustomError from "../customError/customError";
import { loadItems, createItem } from "./itemsController";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a loadItems controller", () => {
  describe("When it receives a response with 'John' owner", () => {
    test("Then it should return a response with status 200", async () => {
      const expectedStatus = 200;
      const req: Partial<Request> = {
        body: {
          owner: "John",
        },
      };

      Item.find = jest.fn().mockReturnValue(mockItems);
      await loadItems(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response with an empty body", () => {
    test("Then it should call it's method next with a customError", async () => {
      const req: Partial<Request> = {
        body: {},
      };
      const customError = new CustomError("Wrong owner", 400, "Wrong owner");

      Item.find = jest.fn().mockRejectedValue(customError);
      await loadItems(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a createItem controller", () => {
  describe("When it receives a response with 'John' owner and a 'Computer' name", () => {
    test("Then it should return a response with status 201", async () => {
      const expectedStatus = 201;
      const req: Partial<Request> = {
        body: mockCreateItem,
      };

      Item.create = jest.fn().mockReturnValue({});
      await createItem(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receies a response with a empty body", () => {
    test("Then it should call it's method next with a customError", async () => {
      const customError = new CustomError(
        "Missing information",
        400,
        "Missing information"
      );
      const req: Partial<Request> = {
        body: {},
      };

      await createItem(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
