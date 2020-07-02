import { Router } from "express";
import login from "./auth.ctrl/login";
import success from "./auth.ctrl/success";

const router = Router();

router.use("/login", login);
// router.get("/success", success);

export default router;
