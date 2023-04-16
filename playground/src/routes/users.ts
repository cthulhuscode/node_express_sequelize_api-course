import { Router } from "express";
import { getUser, getUsers } from "../controllers/users";

export const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
