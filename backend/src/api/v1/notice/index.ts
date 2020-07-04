import { Router } from "express";
import authMiddleware from "../../../lib/middleware/auth";
import createNotice from "./notice.ctrl/createNotice";
import deleteNotice from "./notice.ctrl/deleteNotice";
import modifyNotice from "./notice.ctrl/modifyNotice";
import getNotices from "./notice.ctrl/getNotices";

const router = Router();

router.get("/", getNotices);
router.post("/", authMiddleware.admin, createNotice);
router.put("/:idx", authMiddleware.admin, modifyNotice);
router.delete("/:idx", authMiddleware.admin, deleteNotice);

export default router;
