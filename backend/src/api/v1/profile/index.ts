import { Router } from "express";
import authMiddleware from "../../../lib/middleware/auth";
import getProfile from "./profile.ctrl/getProfile";
import getMyProfile from "./profile.ctrl/getMyProfile";
import getAdminProfile from "./profile.ctrl/getAdminProfile";

const router = Router();

router.get("/my", authMiddleware.user, getMyProfile);
router.get("/admin", getAdminProfile);
router.get("/:idx", getProfile);

export default router;
