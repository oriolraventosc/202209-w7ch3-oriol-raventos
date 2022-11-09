import dotenv from "dotenv";

dotenv.config();

const enviroment = {
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  mongodbUrl: process.env.MONGODB_URL,
};

export default enviroment;
