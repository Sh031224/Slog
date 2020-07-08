import { Router } from "express";
import authMiddleware from "../../../lib/middleware/auth";
import createPost from "./post.ctrl/createPost";
import getPosts from "./post.ctrl/getPosts";
import getPost from "./post.ctrl/getPost";
import searchPosts from "./post.ctrl/searchPosts";
import deletePost from "./post.ctrl/deletePost";
import modifyPost from "./post.ctrl/modifyPost";
import getTempPosts from "./post.ctrl/getTempPosts";
import createTempPost from "./post.ctrl/createTempPost";

const router = Router();

router.get("/temp", authMiddleware.admin, getTempPosts);
router.get("/search", searchPosts);
router.put("/:idx", authMiddleware.admin, modifyPost);

router.post("/temp", authMiddleware.admin, createTempPost);
router.post("/", authMiddleware.admin, createPost);
router.get("/", getPosts);
router.get("/:idx", authMiddleware.guest, getPost);

router.delete("/:idx", authMiddleware.admin, deletePost);

export default router;
