import { Router } from "express";
import authMiddleware from "../../../lib/middleware/auth";
import createRss from "./rss.ctrl/createRss";

const router = Router();

router.post("/", authMiddleware.admin, createRss);

export default router;
