import { Response, NextFunction, Request } from "express";
import ForbiddenError from "../models/error/forbidden-error";
import ErrorHandler from "../lib/error-handler";
import TokenService from "../services/token-service";

export default class AuthMiddleware {
  private tokenService: TokenService;
  private errorHandler: ErrorHandler;

  constructor() {
    this.tokenService = new TokenService();
    this.errorHandler = new ErrorHandler();
  }

  admin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = await this.tokenService.refreshOrValidate(req, res);

      if (!user.isAdmin) throw new ForbiddenError("permission denied");

      req.user = user;

      next();
    } catch (err) {
      this.errorHandler.handle(res, err as Error);
    }
  };

  user = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = await this.tokenService.refreshOrValidate(req, res);

      req.user = user;

      next();
    } catch (err) {
      this.errorHandler.handle(res, err as Error);
    }
  };

  userWithoutThrow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = await this.tokenService.refreshOrValidate(req, res);

      req.user = user;

      next();
    } catch (err) {
      req.user = undefined;

      next();
    }
  };
}
