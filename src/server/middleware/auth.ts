import enviroment from "../../loadEnviroment.js";
import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { CustomRequest } from "../controllers/types.js";
import CustomError from "../customError/customError.js";
import type { UserTokenPayload } from "../controllers/types.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization") as string;
    if (!authorizationHeader) {
      const customError = new CustomError(
        "Invalid header",
        401,
        "Invalid header"
      );
      next(customError);
      return;
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
      const customError = new CustomError(
        "Missing Bearer",
        401,
        "Missing Bearer"
      );
      next(customError);
      return;
    }

    const token = authorizationHeader.replace(/^Bearer\s*/, "");

    const user = jwt.verify(token, enviroment.jwtSecretKey) as UserTokenPayload;

    req.userId = user.id;
  } catch {
    const customError = new CustomError("Missing token", 401, "Missing token");
    next(customError);
  }
};

export default auth;
