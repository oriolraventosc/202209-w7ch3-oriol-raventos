import express from "express";
import morgan from "morgan";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

app.use("/users", usersRouter);

app.use();

export default app;
