import type { GetPostsParams, PostDto } from "@slog/types";
import type { Request, Response } from "express";

import ErrorHandler from "@/lib/error-handler";
import type CustomError from "@/models/error";
import postService from "@/services/post-service";
import postValidator from "@/validator/post-validator";

export default class PostController {
  private postValidator: postValidator;
  private postService: postService;
  private errorHandler: ErrorHandler;

  constructor() {
    this.postValidator = new postValidator();
    this.postService = new postService();
    this.errorHandler = new ErrorHandler();
  }

  getPost = async (req: Request, res: Response) => {
    try {
      this.postValidator.getPost(req);

      const post = await this.postService.getPost(req, parseInt(req.params.idx));

      return res.status(200).json({ post });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  getPosts = async (req: Request, res: Response) => {
    try {
      this.postValidator.getPosts(req);

      const [posts, count] = await this.postService.getPosts(
        req.query as unknown as GetPostsParams
      );

      return res.status(200).json({ posts, count });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      this.postValidator.create(req);

      const body = req.body as PostDto;

      const post = await this.postService.create(body);

      return res.status(200).json({ post });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      this.postValidator.update(req);

      const body = req.body as PostDto;

      const post = await this.postService.update(parseInt(req.params.idx), body);

      return res.status(200).json({ post });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      this.postValidator.delete(req);

      await this.postService.delete(parseInt(req.params.idx));

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
