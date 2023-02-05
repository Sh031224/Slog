import { Router } from "express";

import AuthMiddleware from "@/middlewares/auth-middleware";

import CommentController from "./comment-controller";

const router = Router();

const categoryController = new CommentController();
const authMiddleware = new AuthMiddleware();

router.get("/:idx", authMiddleware.userWithoutThrow, categoryController.get);
router.post("/", authMiddleware.user, categoryController.create);
router.put("/:idx", authMiddleware.user, categoryController.update);
router.delete("/:idx", authMiddleware.user, categoryController.delete);

export default router;
