import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth-middleware";
import PostController from "./post-controller";

const router = Router();

const postController = new PostController();
const authMiddleware = new AuthMiddleware();

router.get("/", postController.getPosts);
router.get("/:idx", authMiddleware.userWithoutThrow, postController.getPost);
router.post("/", authMiddleware.admin, postController.create);
router.put("/:idx", authMiddleware.admin, postController.update);
router.delete("/:idx", authMiddleware.admin, postController.delete);

export default router;
