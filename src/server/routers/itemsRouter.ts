import { validate } from "express-validation";
import express from "express";
import { createItem, loadItems } from "../controllers/itemsController.js";
import itemsValidation from "../schemas/itemsSchema.js";
import auth from "../middleware/auth.js";

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();

itemsRouter.get("/list", auth, loadItems);

itemsRouter.post("/create", auth, validate(itemsValidation), createItem);

export default itemsRouter;
