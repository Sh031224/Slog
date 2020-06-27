import { Router } from "express";
import getCategories from "./category.ctrl/getCategories";
import getCategory from "./category.ctrl/getCategory";
import addCategory from "./category.ctrl/addCategory";

const router = Router();

router.get("/", getCategories);
router.get("/:idx", getCategory);
router.post("/", addCategory);

export default router;
