import express from "express";
import { userController, userControllerCreate, userControllerUpdate, userControllerDelete } from "../controllers/user.controller.js";
import { registerController, loginController, updateController, deleteController, userInfoController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
export default router;

router.post("/perfil", userController);
router.post("/crear", userControllerCreate);
router.put("/actualizar", userControllerUpdate);
router.delete("/eliminar", userControllerDelete);

router.post("/register", registerController);
router.post("/login", loginController);
router.put("/update", updateController);
router.delete("/delete", deleteController);
router.post("/info", authMiddleware, userInfoController);