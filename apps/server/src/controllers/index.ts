import { Router } from "express";

import auth from "./auth";
import category from "./category";
import upload from "./image";
import post from "./post";
import profile from "./profile";

const router = Router();

router.use("/auth", auth);
router.use("/image", upload);
router.use("/category", category);
router.use("/profile", profile);
router.use("/post", post);

export default router;
