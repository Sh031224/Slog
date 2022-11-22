import type { Request } from "express";

import type User from "@/models/entity/user";
import UnauthorizedError from "@/models/error/unauthorized-error";

export default class ProfileService {
  getProfile = async (req: Request): Promise<User> => {
    if (!req.user) throw new UnauthorizedError("invalid token");

    return req.user;
  };
}
