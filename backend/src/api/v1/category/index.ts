import { Router } from "express";
import getCategories from "./category.ctrl/getCategories";
import getCategory from "./category.ctrl/getCategory";

const router = Router();

router.get("/", getCategories);
router.get("/:idx", getCategory);

export default router;
