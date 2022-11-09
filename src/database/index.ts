import enviroment from "../loadEnviroment.js";
import mongoose from "mongoose";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator(`${enviroment.debug}data Base`);

const connectToDatabase = async (url: string) => {
  try {
    await mongoose.connect(url);
    mongoose.set("debug", process.env.DEBUG === "true");
    mongoose.set("toJSON", {
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ret;
      },
    });
    debug(chalk.blueBright.bold("Connected to the data Base"));
  } catch {
    debug(chalk.red.bold("Error connecting to the data Base"));
  }
};

export default connectToDatabase;
