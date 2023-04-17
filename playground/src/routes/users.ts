import { Router } from "express";
import { getUser, getUsers } from "../controllers/users";
import { validatorHandler } from "../middlewares/validatorHandler";
import { getUserSchema } from "../schemas/users";

export const router = Router();

router.get("/:id", validatorHandler(getUserSchema, "params"), getUser);
router.get("/", getUsers);
