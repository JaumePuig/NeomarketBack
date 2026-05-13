import express from "express";
import { registerController, loginController, updateController, updateWishlistController, updateCarteraController, deleteController, userInfoController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
export default router;

router.post("/register", registerController);
router.post("/login", loginController);
router.put('/:Email', updateController);
router.put('/:Email/wishlist', updateWishlistController);
router.put('/:Email/cartera', updateCarteraController);
router.delete('/:Email', deleteController);
router.get('/:Email', userInfoController);