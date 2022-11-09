import express from "express";
import { userRegister } from "../controllers/usersController.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post("/register", userRegister);

export default usersRouter;
