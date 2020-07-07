import { Request } from "express";

export default (req: Request, post_idx: number, fileName: string) => {
  return `${process.env.SERVER_URL}/public/${post_idx}/${fileName}`;
};
