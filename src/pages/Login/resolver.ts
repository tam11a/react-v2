import Joi from "joi";

export const loginResolver = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required(),
  remember: Joi.boolean().default(false),
});
