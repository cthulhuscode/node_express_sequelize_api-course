import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15).label("nombre").messages({
  "string.base": "'nombre' debe ser de tipo texto",
  "string.empty": "'nombre' no puede ser un campo vacío",
});
const description = Joi.string().min(3);
const price = Joi.number().integer().strict();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

export const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
  categoryId,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

export const deleteProductSchema = Joi.object({
  id: id.required(),
});
