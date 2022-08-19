import { Request, Response } from "express";

import ErrorHandler from "../../lib/error-handler";
import CustomError from "../../models/error";
import AuthService from "../../services/auth-service";
import AuthValidator from "../../validator/auth-validator";

export default class AuthController {
  private authValidator: AuthValidator;
  private authService: AuthService;
  private errorHandler: ErrorHandler;

  constructor() {
    this.authValidator = new AuthValidator();
    this.authService = new AuthService();
    this.errorHandler = new ErrorHandler();
  }

  login = async (req: Request, res: Response) => {
    try {
      this.authValidator.login(req);

      const user = await this.authService.login(res, req.body.accessToken as string);

      return res.status(200).json({ user });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  updateFcmToken = async (req: Request, res: Response) => {
    try {
      this.authValidator.updateFcmToken(req);

      this.authService.updateFcmToken(req.user!, req.body.token as string);

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
