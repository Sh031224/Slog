import { Router } from "express";
import category from "./category";
import auth from "./auth";
import notice from "./notice";
import profile from "./profile";
import post from "./post";

const router = Router();

router.use("/category", category);
router.use("/auth", auth);
router.use("/notice", notice);
router.use("/profile", profile);
router.use("/post", post);

export default router;
