import { Router } from "express";
import authMiddleware from "../../../lib/middleware/auth";
import getProfile from "./profile.ctrl/getProfile";
import getMyProfile from "./profile.ctrl/getMyProfile";

const router = Router();

router.get("/my", authMiddleware.user, getMyProfile);
router.get("/:idx", getProfile);

export default router;
