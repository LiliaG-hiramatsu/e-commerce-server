import { Router } from "express";
import { getOrderById, createOrder, getOrders } from "../controllers/orders.js";

const router = Router();

router.get("/:id", getOrderById);
router.post("/", createOrder);
router.get("/", getOrders);

export default router;
