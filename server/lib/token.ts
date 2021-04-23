import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const createToken = async (id: string): Promise<string> => {
  const payload = {
    id
  };

  const options: SignOptions = {
    expiresIn: "30d"
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = async (token: string): Promise<any> =>
  jwt.verify(token, JWT_SECRET);
