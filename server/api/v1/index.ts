import { Router } from "express";
import category from "./category";
import auth from "./auth";
import notice from "./notice";
import profile from "./profile";
import post from "./post";
import upload from "./upload";
import reply from "./reply";
import comment from "./comment";
import rss from "./rss";

const router = Router();

router.use("/category", category);
router.use("/auth", auth);
router.use("/notice", notice);
router.use("/profile", profile);
router.use("/post", post);
router.use("/upload", upload);
router.use("/comment", comment);
router.use("/reply", reply);
router.use("/rss", rss);

export default router;
