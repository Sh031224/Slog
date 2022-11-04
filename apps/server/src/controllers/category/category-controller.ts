import { Request, Response } from "express";

import ErrorHandler from "../../lib/error-handler";
import CustomError from "../../models/error";
import CategoryService from "../../services/category-service";
import CategoryValidator from "../../validator/category-validator";

export default class AuthController {
  private categoryValidator: CategoryValidator;
  private categoryService: CategoryService;
  private errorHandler: ErrorHandler;

  constructor() {
    this.categoryValidator = new CategoryValidator();
    this.categoryService = new CategoryService();
    this.errorHandler = new ErrorHandler();
  }

  create = async (req: Request, res: Response) => {
    try {
      this.categoryValidator.create(req);

      const category = await this.categoryService.create(req.body.name as string);

      return res.status(200).json({ category });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  get = async (_req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.get();

      return res.status(200).json({ categories });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      this.categoryValidator.update(req);

      const category = await this.categoryService.update(
        Number(req.params.idx),
        req.body.name as string
      );

      return res.status(200).json({ category });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  updateOrderNumber = async (req: Request, res: Response) => {
    try {
      this.categoryValidator.updateOrderNumber(req);

      this.categoryService.updateOrderNumber(Number(req.params.idx), req.body.orderNumber);

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      this.categoryValidator.delete(req);

      await this.categoryService.delete(Number(req.params.idx));

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
