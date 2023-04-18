import { Router } from "express";
import {
  getCategories,
  addCategory,
  putCategory,
  patchCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categories";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../schemas/categories";
import { validatorHandler } from "../middlewares/validatorHandler";

export const router = Router();

router.get("/:id", validatorHandler(getCategorySchema, "params"), getCategory);
router.put("/:id", validatorHandler(updateCategorySchema, "body"), putCategory);
router.patch(
  "/:id",
  validatorHandler(updateCategorySchema, "body"),
  patchCategory
);
router.delete(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  deleteCategory
);

router.post("/", validatorHandler(createCategorySchema, "body"), addCategory);
router.get("/", getCategories);
