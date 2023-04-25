import Joi from "joi";

const id = Joi.number();
const name = Joi.string().min(3).max(15).label("nombre").messages({
  "string.base": "'nombre' debe ser de tipo texto",
  "string.empty": "'nombre' no puede ser un campo vacío",
});
const description = Joi.string().min(3);
const price = Joi.number().integer().strict();
const image = Joi.string().uri();

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
});

export const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

export const deleteProductSchema = Joi.object({
  id: id.required(),
});
