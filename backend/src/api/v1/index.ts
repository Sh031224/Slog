import { Router } from "express";
import category from "./category";
import auth from "./auth";
import notice from "./notice";

const router = Router();

router.use("/category", category);
router.use("/auth", auth);
router.use("/notice", notice);

export default router;
