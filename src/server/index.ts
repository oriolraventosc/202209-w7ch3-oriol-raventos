import enviroment from "../loadEnviroment.js";
import app from "./app.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator(`${enviroment.debug}server`);

const startServer = async (port: number) => {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green("Server listening!"));
      resolve(server);
    });
    server.on("error", (error: Error) => {
      debug(chalk.red("Error connecting with the server!"));
      reject(error);
    });
  });
};

export default startServer;
