import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  owner: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Item = model("Item", itemSchema, "items");
