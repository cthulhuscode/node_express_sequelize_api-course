import Joi from "joi";

const id = Joi.number().positive().message("Invalid id.");
const email = Joi.string().email().message("Invalid email.");
