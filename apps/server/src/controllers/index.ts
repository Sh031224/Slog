import { Router } from "express";

import auth from "./auth";
import category from "./category";
import comment from "./comment";
import upload from "./image";
import post from "./post";
import profile from "./profile";

const router = Router();

router.use("/auth", auth);
router.use("/image", upload);
router.use("/category", category);
router.use("/profile", profile);
router.use("/post", post);
router.use("/comment", comment);

export default router;
