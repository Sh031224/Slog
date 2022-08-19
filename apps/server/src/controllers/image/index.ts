import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth-middleware";
import UploadMiddleware from "../../middlewares/upload-middleware";
import ImageController from "./image-controller";

const router = Router();

const imageController = new ImageController();
const uploadMiddleware = new UploadMiddleware();
const authMiddleware = new AuthMiddleware();

router.post("/", authMiddleware.admin, uploadMiddleware.single, imageController.upload);

export default router;
