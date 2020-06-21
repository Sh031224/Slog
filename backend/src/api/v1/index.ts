import { Router } from "express";
import category from "./category";

const router = Router();

router.use("/category", category);

export default router;
