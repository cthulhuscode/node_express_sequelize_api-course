import Joi from "joi";

const id = Joi.number()
  .positive()
  .required()
  .messages({ "any.only": "Invalid id." });
const name = Joi.string().min(3).messages({
  "string.base": "'name' must of type text",
  "string.empty": "'name' can't be empty",
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

export const deleteProductSchema = Joi.object({
  id: id.required(),
});

export const createCategorySchema = Joi.object({
  name: name.required(),
});

export const updateCategorySchema = Joi.object({
  name: name.required(),
});
