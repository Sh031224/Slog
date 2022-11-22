import type { NextFunction, Request, Response } from "express";
import Multer from "multer";

export default class UploadMiddleware {
  private multer: Multer.Multer;

  constructor() {
    this.multer = Multer({
      storage: Multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
      }
    });
  }

  single = (req: Request, res: Response, next: NextFunction) => {
    const upload = this.multer.single("file");

    return upload(req, res, () => {
      next();
    });
  };
}
