import express from "express";
import { createItem, loadItems } from "../controllers/itemsController.js";

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();

itemsRouter.get("/list", loadItems);

itemsRouter.post("/create", createItem);

export default itemsRouter;
