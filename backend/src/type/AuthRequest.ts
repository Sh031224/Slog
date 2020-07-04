import User from "../entity/User";
import { Request } from "express";

export default interface AuthRequest extends Request {
  user: User;
}
