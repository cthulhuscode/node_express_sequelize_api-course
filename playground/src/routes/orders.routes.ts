import { Router } from "express";
import {
  getOrders,
  getOrder,
  addOrder,
  putOrder,
  patchOrder,
  deleteOrder,
} from "../controllers/orders.controller";
import {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
} from "../schemas/orders.schemas";
import { validatorHandler } from "../middlewares/validatorHandler";

export const router = Router();

router.get("/:id", validatorHandler(getOrderSchema, "params"), getOrder);
router.put("/:id", validatorHandler(updateOrderSchema, "body"), putOrder);
router.patch("/:id", validatorHandler(updateOrderSchema, "body"), patchOrder);
router.delete(
  "/:id",
  validatorHandler(deleteOrderSchema, "params"),
  deleteOrder
);

router.post("/", validatorHandler(createOrderSchema, "body"), addOrder);
router.get("/", getOrders);
