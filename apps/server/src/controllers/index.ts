import { Router } from "express";
import auth from "./auth";

const router = Router();

router.use("/auth", auth);
router.get("/", (_, res) => res.json({}));

export default router;
