import express from "express";
import {
  getProductsController,
  createProductController,
  updateProductController,
  deleteProductController
} from "../controllers/product.controller.js";

import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProductsController);

// ✅ AQUÍ USAS MULTER
router.post("/", upload.array("imagenes"), createProductController);

// (opcional pero recomendable también en update)
router.put("/:id", upload.array("imagenes"), updateProductController);

router.delete("/:id", deleteProductController);

export default router;