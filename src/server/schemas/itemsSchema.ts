import { Joi } from "express-validation";

const itemsValidation = {
  body: Joi.object({
    owner: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string(),
  }),
};

export default itemsValidation;
