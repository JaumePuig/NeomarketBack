import express from "express";
import {
  getProductsController,
  createProductController,
  updateProductController,
  deleteProductController,
  getProductByIdController,
  updateStockController
} from "../controllers/product.controller.js";

import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProductsController);

// ✅ AQUÍ USAS MULTER
router.post("/", upload.array("imagenes"), createProductController);

// (opcional pero recomendable también en update)
router.put("/:id", upload.array("imagenes"), updateProductController);

// ✅ PATCH para actualizar solo el stock (sin multer, acepta JSON)
router.patch("/:id/stock", updateStockController);

router.delete("/:id", deleteProductController);

router.get('/:id', getProductByIdController);

export default router;