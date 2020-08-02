import { Router } from "express";
import authMiddleWare from "../../../lib/middleware/auth";
import login from "./auth.ctrl/login";
import fcmToken from "./auth.ctrl/fcmToken";

const router = Router();

router.post("/login", login);
router.post("/fcm", authMiddleWare.user, fcmToken);

export default router;
