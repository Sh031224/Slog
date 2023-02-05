import type { CategoryDto, CategoryOrderDto } from "@slog/types/api/category";
import type { Request, Response } from "express";

import ErrorHandler from "@/lib/error-handler";
import type CustomError from "@/models/error";
import CategoryService from "@/services/category-service";
import CategoryValidator from "@/validator/category-validator";

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

      const body = req.body as CategoryDto;

      const category = await this.categoryService.create(body.name);

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

      const body = req.body as CategoryDto;

      const category = await this.categoryService.update(parseInt(req.params.idx), body.name);

      return res.status(200).json({ category });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  updateOrderNumber = async (req: Request, res: Response) => {
    try {
      this.categoryValidator.updateOrderNumber(req);

      const body = req.body as CategoryOrderDto;

      this.categoryService.updateOrderNumber(parseInt(req.params.idx), body.orderNumber);

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      this.categoryValidator.delete(req);

      await this.categoryService.delete(parseInt(req.params.idx));

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
