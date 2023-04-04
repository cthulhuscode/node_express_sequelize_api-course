import { Router } from "express";
import {
  getCategories,
  addCategory,
  putCategory,
  patchCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categories";

export const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", addCategory);
router.put("/:id", putCategory);
router.patch("/:id", patchCategory);
router.delete("/:id", deleteCategory);
