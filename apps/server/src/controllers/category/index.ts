import { Router } from "express";

import AuthMiddleware from "@/middlewares/auth-middleware";

import CategoryController from "./category-controller";

const router = Router();

const categoryController = new CategoryController();
const authMiddleware = new AuthMiddleware();

router.get("/", categoryController.get);
router.post("/", authMiddleware.admin, categoryController.create);
router.put("/:idx", authMiddleware.admin, categoryController.update);
router.put("/order/:idx", authMiddleware.admin, categoryController.updateOrderNumber);
router.delete("/:idx", authMiddleware.admin, categoryController.delete);

export default router;
