import { Router } from "express";
import createComment from "./comment.ctrl/createComment";
import authMiddleWare from "../../../lib/middleware/auth";
import getComments from "./comment.ctrl/getComments";
import modifyComment from "./comment.ctrl/modifyComment";
import deleteComment from "./comment.ctrl/deleteComment";

const router = Router();

router.post("/", authMiddleWare.user, createComment);
router.get("/", authMiddleWare.guest, getComments);
router.put("/:idx", authMiddleWare.user, modifyComment);
router.delete("/:idx", authMiddleWare.user, deleteComment);

export default router;
