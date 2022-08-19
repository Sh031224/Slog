import { Response, NextFunction, Request } from "express";
import ForbiddenError from "../models/error/forbidden-error";
import ErrorHandler from "./error-handler";
import TokenService from "../services/token-service";

export default class AuthMiddleware {
  private tokenService: TokenService;
  private errorHandler: ErrorHandler;

  constructor() {
    this.tokenService = new TokenService();
    this.errorHandler = new ErrorHandler();
  }

  async admin(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = await this.tokenService.refreshOrValidate(req, res);

      if (!user.isAdmin) throw new ForbiddenError("permission denied");

      req.user = user;

      next();
    } catch (err) {
      this.errorHandler.handle(res, err as Error);
    }
  }

  async user(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = await this.tokenService.refreshOrValidate(req, res);

      req.user = user;

      next();
    } catch (err) {
      this.errorHandler.handle(res, err as Error);
    }
  }
}
