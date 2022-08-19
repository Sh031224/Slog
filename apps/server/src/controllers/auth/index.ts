import { Router } from "express";
import AuthMiddleware from "lib/auth-middleware";
import AuthController from "./auth-controller";

const router = Router();

const authController = new AuthController();
// const authMiddleware = new AuthMiddleware();

router.post("/login", authController.login.bind(authController));
router.put("/fcmToken", authController.updateFcmToken);

export default router;
