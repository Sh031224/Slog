import { Router } from "express";
import auth from "./auth";

const router = Router();

router.use("/auth", auth);
router.get("/", () => "afds");

export default router;
