import enviroment from "../../loadEnviroment.js";
import chalk from "chalk";
import type { Request, Response } from "express";
import debugCreator from "debug";
import bcrypt from "bcryptjs";
import type RegisterData from "../types.js";
import { User } from "../../database/models/Users/Users.js";

const debug = debugCreator(`${enviroment.debug}controllers`);

export const userRegister = async (req: Request, res: Response) => {
  const { username, password, email } = req.body as RegisterData;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userToRegister = User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json(userToRegister);
  } catch {
    debug(chalk.red("An error ocurred creating your user! Try again later."));
    res.status(401).json({
      message: "An error ocurred creating your user! Try again later.",
    });
  }
};
