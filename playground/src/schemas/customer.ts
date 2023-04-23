import Joi from "joi";

const id = Joi.number()
  .positive()
  .required()
  .messages({ "any.only": "Invalid id." });
const name = Joi.string().min(2).trim();
const lastName = Joi.string().min(2).trim();
const phone = Joi.string().min(10);
const createdAt = Joi.date().optional();

export const getCustomerSchema = Joi.object({
  id,
});

export const deleteCustomerSchema = Joi.object({
  id,
});

export const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  createdAt: createdAt,
});

export const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  createdAt,
});
