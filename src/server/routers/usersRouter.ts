import { validate } from "express-validation";
import express from "express";
import { userRegister } from "../controllers/usersController.js";
import userRegisterValidation from "../schemas/userRegisterSchema.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post("/register", validate(userRegisterValidation), userRegister);

export default usersRouter;
