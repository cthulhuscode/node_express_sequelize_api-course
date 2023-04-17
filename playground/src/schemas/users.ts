import Joi from "joi";

const id = Joi.number()
  .positive()
  .required()
  .messages({ "any.only": "Invalid id." });
const email = Joi.string().email().trim().message("Invalid email.");
const password = Joi.string().min(4).trim();
const createdAt = Joi.date().optional();

export const getUserSchema = Joi.object({
  id,
});

export const deleteUserSchema = Joi.object({
  id,
});

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  createdAt: createdAt.optional(),
});

export const updateUserSchema = Joi.object({
  email: email,
  password: password,
});
