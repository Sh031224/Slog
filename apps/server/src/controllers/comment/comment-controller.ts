import type { Request, Response } from "express";

import ErrorHandler from "@/lib/error-handler";
import type CustomError from "@/models/error";
import CommentService from "@/services/comment-service";
import CommentValidator from "@/validator/comment-validator";

export default class AuthController {
  private commentValidator: CommentValidator;
  private commentService: CommentService;
  private errorHandler: ErrorHandler;

  constructor() {
    this.commentValidator = new CommentValidator();
    this.commentService = new CommentService();
    this.errorHandler = new ErrorHandler();
  }

  create = async (req: Request, res: Response) => {
    try {
      this.commentValidator.create(req);

      const comment = await this.commentService.create(req.body.name as string);

      return res.status(200).json({ comment });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  get = async (_req: Request, res: Response) => {
    try {
      const categories = await this.commentService.get();

      return res.status(200).json({ categories });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      this.commentValidator.update(req);

      const comment = await this.commentService.update(
        Number(req.params.idx),
        req.body.name as string
      );

      return res.status(200).json({ comment });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  updateOrderNumber = async (req: Request, res: Response) => {
    try {
      this.commentValidator.updateOrderNumber(req);

      this.commentService.updateOrderNumber(Number(req.params.idx), req.body.orderNumber);

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      this.commentValidator.delete(req);

      await this.commentService.delete(Number(req.params.idx));

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
