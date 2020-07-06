import { Router } from "express";
import category from "./category";
import auth from "./auth";
import notice from "./notice";
import profile from "./profile";
import post from "./post";
import upload from "./upload";

const router = Router();

router.use("/category", category);
router.use("/auth", auth);
router.use("/notice", notice);
router.use("/profile", profile);
router.use("/post", post);
router.use("/upload", upload);

export default router;
