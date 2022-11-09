import enviroment from "../../loadEnviroment.js";
import chalk from "chalk";
import type { NextFunction, Request, Response } from "express";
import debugCreator from "debug";
import bcrypt from "bcryptjs";
import type RegisterData from "../types.js";
import { User } from "../../database/models/Users/Users.js";
import CustomError from "../customError/customError.js";

const debug = debugCreator(`${enviroment.debug}controllers`);

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body as RegisterData;
  try {
    if (!username || !password || !email) {
      const customError = new CustomError(
        "Error registering",
        401,
        "Missing credentials!"
      );
      next(customError);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToRegister = User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json(userToRegister);
    debug(chalk.greenBright(`User ${username} registered!`));
  } catch (error: unknown) {
    next(error);
  }
};
