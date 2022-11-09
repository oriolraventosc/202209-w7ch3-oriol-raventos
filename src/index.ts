import enviroment from "./loadEnviroment.js";
import startServer from "./server/index.js";

const { port } = enviroment;

// eslint-disable-next-line no-implicit-coercion
await startServer(+port);
