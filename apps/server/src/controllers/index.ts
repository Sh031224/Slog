import { Router } from "express";
import auth from "./auth";
import upload from "./image";
import category from "./category";
import profile from "./profile";
import post from "./post";

const router = Router();

router.use("/auth", auth);
router.use("/image", upload);
router.use("/category", category);
router.use("/profile", profile);
router.use("/post", post);

export default router;
