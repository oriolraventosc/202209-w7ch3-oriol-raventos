import type { JwtPayload } from "jsonwebtoken";

export interface Credentials {
  username: string;
  password: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export interface CustomRequest extends Request {
  userId: string;
}

export interface ItemStructure extends Request {
  owner: string;
  name: string;
}
