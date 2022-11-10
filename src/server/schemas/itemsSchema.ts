import { Joi } from "express-validation";

const itemsValidation = {
  body: Joi.object({
    owner: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

export default itemsValidation;
