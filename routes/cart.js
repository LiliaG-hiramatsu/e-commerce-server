import { Router } from "express";
import { getCart, addToCart, clearCart } from "../controllers/cart.js";

const router = Router();

router.get("/:userId", getCart);
router.post("/:userId/add", addToCart);
router.delete("/:userId/clear", clearCart);

export default router;
