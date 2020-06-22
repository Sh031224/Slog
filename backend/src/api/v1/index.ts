import { Router } from "express";
import category from "./category";
import auth from "./auth";

const router = Router();

router.use("/category", category);
router.use("/auth", auth);

export default router;
