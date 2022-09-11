import { Router } from "express";
import auth from "./auth";
import upload from "./image";
import category from "./category";
import profile from "./profile";

const router = Router();

router.use("/auth", auth);
router.use("/image", upload);
router.use("/category", category);
router.use("/profile", profile);

export default router;
