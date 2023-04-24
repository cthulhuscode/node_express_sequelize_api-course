import Joi from "joi";

const id = Joi.number()
  .positive()
  .required()
  .messages({ "any.only": "Invalid id." });
const name = Joi.string().min(2).trim();
const lastName = Joi.string().min(2).trim();
const phone = Joi.string().min(10);
const createdAt = Joi.date().optional();
const userId = Joi.number().positive().messages({ "any.only": "Invalid id." });

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
  userId: userId.required(),
});

export const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  createdAt,
  userId,
});
