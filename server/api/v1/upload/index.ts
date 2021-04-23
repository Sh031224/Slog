import { Router, Request } from "express";
import upload from "./upload.ctrl/upload";
import multer from "multer";
import { Options } from "multer";
import { v4 as uuidv4 } from "uuid";
import authMiddleware from "../../../lib/middleware/auth";

const storage = multer.diskStorage({
  destination: (_req: Request, _file, cb: Function) => {
    cb(null, "./static/");
  },
  filename: (_req: Request, file, cb: Function) => {
    cb(null, `${file.fieldname}-${uuidv4()}-${file.originalname}`);
  }
});

const options: Options = {
  storage
};

const uploadMid = multer(options) as any;

const router = Router();

router.post("/", authMiddleware.admin, uploadMid.array("files"), upload);

export default router;
