import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth-middleware";
import AuthController from "./auth-controller";

const router = Router();

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

router.post("/login", authController.login);
router.put("/fcmToken", authMiddleware.user, authController.updateFcmToken);

export default router;
