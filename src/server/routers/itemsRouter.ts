import express from "express";
import { loadItems } from "../controllers/itemsController.js";

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();

itemsRouter.post("/list", loadItems);

export default itemsRouter;
