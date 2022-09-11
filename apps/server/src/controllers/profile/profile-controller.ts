import { Request, Response } from "express";

import ErrorHandler from "../../lib/error-handler";
import CustomError from "../../models/error";
import ProfileService from "../../services/profile-service";

export default class ProfileController {
  private profileService: ProfileService;
  private errorHandler: ErrorHandler;

  constructor() {
    this.profileService = new ProfileService();
    this.errorHandler = new ErrorHandler();
  }

  getProfile = async (req: Request, res: Response) => {
    try {
      const user = await this.profileService.getProfile(req);

      return res.status(200).json({ user });
    } catch (err) {
      this.errorHandler.handle(res, err as CustomError);
    }
  };
}
