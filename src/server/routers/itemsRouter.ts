import { validate } from "express-validation";
import multer from "multer";
import path from "path";
import express from "express";
import { createItem, loadItems } from "../controllers/itemsController.js";
import itemsValidation from "../schemas/itemsSchema.js";

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();

const upload = multer({
  dest: path.join("assets", "images"),
});

itemsRouter.get("/list", loadItems);

itemsRouter.post(
  "/create",
  validate(itemsValidation),
  createItem,
  upload.single("image")
);

export default itemsRouter;
