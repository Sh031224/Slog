import User from "../src/models/entity/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
