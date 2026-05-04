import express from "express";
import {
  getProductsController,
  createProductController,
  updateProductController,
  deleteProductController
} from "../controllers/product.controller.js";

//import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProductsController);
router.post("/", createProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;