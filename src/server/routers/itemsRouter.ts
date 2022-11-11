import { validate } from "express-validation";
import express from "express";
import { createItem, loadItems } from "../controllers/itemsController.js";
import multer from "multer";
import path from "path";
import itemsValidation from "../schemas/itemsSchema.js";
import auth from "../middleware/auth.js";

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();
const upload = multer({
  dest: path.join("assets", "images"),
});

itemsRouter.get("/list", auth, loadItems);

itemsRouter.post(
  "/create",
  auth,
  upload.single("image"),
  validate(itemsValidation),
  createItem
);

export default itemsRouter;
