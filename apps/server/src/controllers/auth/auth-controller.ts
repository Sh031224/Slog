import type { LoginDto, FcmDto } from "@slog/types/api/auth";
import type { Request, Response } from "express";

import ErrorHandler from "@/lib/error-handler";
import type CustomError from "@/models/error";
import AuthService from "@/services/auth-service";
import AuthValidator from "@/validator/auth-validator";

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

      const body = req.body as LoginDto;

      const user = await this.authService.login(res, body.fbToken);

      return res.status(200).json({ user });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };

  updateFcmToken = async (req: Request, res: Response) => {
    try {
      this.authValidator.updateFcmToken(req);

      const body = req.body as FcmDto;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.authService.updateFcmToken(req.user!, body.token);

      return res.status(200).end();
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
