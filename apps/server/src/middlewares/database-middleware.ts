import type { NextFunction, Request, Response } from "express";

import AppDataSource from "@/data-source";

export default class DatabaseMiddleware {
  connect = async (_req: Request, _res: Response, next: NextFunction) => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    next();
  };
}
