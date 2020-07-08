import { Router } from "express";
import authMiddleware from "../../../lib/middleware/auth";
import getCategories from "./category.ctrl/getCategories";
import getCategory from "./category.ctrl/getCategory";
import createCategory from "./category.ctrl/createCategory";
import deleteCategory from "./category.ctrl/deleteCategory";
import modifyCategory from "./category.ctrl/modifyCategory";
import modifyOrderCategory from "./category.ctrl/modifyOrderCategory";

const router = Router();

router.put("/order", authMiddleware.admin, modifyOrderCategory);

router.get("/:idx", getCategory);
router.get("/", getCategories);
router.post("/", authMiddleware.admin, createCategory);
router.put("/:idx", authMiddleware.admin, modifyCategory);
router.delete("/:idx", authMiddleware.admin, deleteCategory);

export default router;
