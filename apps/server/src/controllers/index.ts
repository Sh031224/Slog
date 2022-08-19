import { Router } from "express";
import auth from "./auth";
import upload from "./image";

const router = Router();

router.use("/auth", auth);
router.use("/image", upload);
router.get("/", (_, res) => res.json({}));

export default router;
