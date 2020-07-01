import { Router } from "express";
import login from "./auth.ctrl/login";

const router = Router();

router.post("/", login);

export default router;
