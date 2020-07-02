import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRESIN } = process.env;

export const createToken = async (
  id: string,
  name: string
): Promise<string> => {
  const payload = {
    id,
    name
  };

  const options: SignOptions = {
    expiresIn: JWT_EXPIRESIN
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = async (token: string): Promise<any> => {
  jwt.verify(token, JWT_SECRET);
};
