import type { Request, Response, NextFunction } from "express";
import type { ItemStructure } from "./types.js";
import CustomError from "../customError/customError.js";
import { Item } from "../../database/models/Items/Items.js";

export const loadItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { owner } = req.body as ItemStructure;
  try {
    if (!owner) {
      const customError = new CustomError("Wrong owner", 400, "Wrong owner");
      next(customError);
      return;
    }

    const items = await Item.find({ owner });

    if (items.length === 0) {
      const customError = new CustomError("No items", 400, "No items");
      next(customError);
      return;
    }

    res.status(200).json({ items });
  } catch (error: unknown) {
    next(error);
  }
};
