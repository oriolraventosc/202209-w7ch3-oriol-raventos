import { validate } from "express-validation";
import express from "express";
import { createItem, loadItems } from "../controllers/itemsController.js";
import itemsValidation from "../schemas/itemsSchema.js";

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();

itemsRouter.get("/list", loadItems);

itemsRouter.post("/create", validate(itemsValidation), createItem);

export default itemsRouter;
