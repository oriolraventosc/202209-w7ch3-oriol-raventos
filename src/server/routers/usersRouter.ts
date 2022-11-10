import { validate } from "express-validation";
import express from "express";
import { userRegister, userLogin } from "../controllers/usersController.js";
import userRegisterValidation from "../schemas/userRegisterSchema.js";
import userLoginValidation from "../schemas/userLoginSchema.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post("/register", validate(userRegisterValidation), userRegister);

usersRouter.post("/login", validate(userLoginValidation), userLogin);

export default usersRouter;
