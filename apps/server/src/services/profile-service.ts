import { Request } from "express";
import User from "../models/entity/user";
import UnauthorizedError from "../models/error/unauthorized-error";

export default class ProfileService {
  constructor() {}

  getProfile = async (req: Request): Promise<User> => {
    if (!req.user) throw new UnauthorizedError("invalid token");

    return req.user;
  };
}
