import type { Request, Response } from "express";

import { url } from "@/constants/image";
import ErrorHandler from "@/lib/error-handler";
import type CustomError from "@/models/error";
import ImageService from "@/services/image-service";

export default class AuthController {
  private imageService: ImageService;
  private errorHandler: ErrorHandler;

  constructor() {
    this.imageService = new ImageService();
    this.errorHandler = new ErrorHandler();
  }

  upload = async (req: Request, res: Response) => {
    try {
      const filename = await this.imageService.upload(req);

      return res.status(200).json({ file: `${url}/${filename}` });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
