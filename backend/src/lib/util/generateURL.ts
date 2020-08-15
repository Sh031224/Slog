import { Request } from "express";

export default (req: Request, fileName: string) => {
  return `${process.env.SERVER_URL}/public/${fileName}`;
};
