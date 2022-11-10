import type { NextFunction, Request, Response } from "express";
import { Item } from "../../database/models/Items/Items";
import mockItems from "../../mocks/mockItems";
import CustomError from "../customError/customError";
import { loadItems } from "./itemsController";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a loadItems controller", () => {
  describe("When it receives a response with 'John' owner", () => {
    test("Then it should return tow items", async () => {
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
    test("Then it should return a customError", async () => {
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
