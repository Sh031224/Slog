import { Router } from "express";
import authMiddleware from "../../../lib/middleware/auth";
import createReply from "./reply.ctrl/createReply";
import getReplies from "./reply.ctrl/getReplies";
import modifyReply from "./reply.ctrl/modifyReply";
import deleteReply from "./reply.ctrl/deleteReply";

const router = Router();

router.post("/", authMiddleware.user, createReply);
router.get("/", authMiddleware.guest, getReplies);
router.put("/:idx", authMiddleware.user, modifyReply);
router.delete("/:idx", authMiddleware.user, deleteReply);

export default router;
