import type { CommentDto, UpdateCommentDto } from "@slog/types/api/comment";
import type { Request, Response } from "express";

import ErrorHandler from "@/lib/error-handler";
import type CustomError from "@/models/error";
import CommentService from "@/services/comment-service";
import CommentValidator from "@/validator/comment-validator";

export default class CommentController {
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

      const body = req.body as CommentDto;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const comment = await this.commentService.create(req.user!, body);

      return res.status(200).json({ comment });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      this.commentValidator.get(req);

      const comment = await this.commentService.get(req.user, parseInt(req.params.idx));

      return res.status(200).json({ comment });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      this.commentValidator.update(req);

      const body = req.body as UpdateCommentDto;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const comment = await this.commentService.update(req.user!, parseInt(req.params.idx), body);

      return res.status(200).json({ comment });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      this.commentValidator.delete(req);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await this.commentService.delete(req.user!, parseInt(req.params.idx));

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
