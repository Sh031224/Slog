import { Router } from "express";

import AuthMiddleware from "@/middlewares/auth-middleware";

import ProfileController from "./profile-controller";

const router = Router();

const profileController = new ProfileController();
const authMiddleware = new AuthMiddleware();

router.get("/", authMiddleware.user, profileController.get);

export default router;
