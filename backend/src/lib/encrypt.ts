import "dotenv/config";
import * as crypto from "crypto";

export default (text: string): string => {
  const encrypted = crypto
    .createHmac("sha256", process.env.CRYPTO_SECRET)
    .update(text)
    .digest("hex");

  return encrypted;
};
