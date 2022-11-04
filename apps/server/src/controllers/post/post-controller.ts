import { Request, Response } from "express";
import { GetPostsParams, PostDTO } from "shared-types";

import ErrorHandler from "../../lib/error-handler";
import CustomError from "../../models/error";
import postService from "../../services/post-service";
import postValidator from "../../validator/post-validator";

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

      const post = await this.postService.getPost(req, Number(req.params.idx));

      return res.status(200).json({ post });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  getPosts = async (req: Request, res: Response) => {
    try {
      this.postValidator.getPosts(req);

      const [posts, count] = await this.postService.getPosts(
        req.params as unknown as GetPostsParams
      );

      return res.status(200).json({ posts, count });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      this.postValidator.create(req);

      const post = await this.postService.create(req.body as PostDTO);

      return res.status(200).json({ post });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      this.postValidator.update(req);

      const post = await this.postService.update(Number(req.params.idx), req.body as PostDTO);

      return res.status(200).json({ post });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      this.postValidator.delete(req);

      await this.postService.delete(Number(req.params.idx));

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
