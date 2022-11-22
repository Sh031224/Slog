import { Token } from "@/types";

import { DAY } from "./time";

export const cookieName = {
  [Token.ACCESS]: "jwt",
  [Token.REFRESH]: "refresh"
};

export const cookieOptions = {
  [Token.ACCESS]: {
    expires: new Date(new Date().setTime(new Date().getTime() + DAY)),
    httpOnly: true
  },
  [Token.REFRESH]: {
    expires: new Date(new Date().setTime(new Date().getTime() + DAY * 30)),
    httpOnly: true
  }
};

export const expiresIn = {
  [Token.ACCESS]: "3h",
  [Token.REFRESH]: "30d"
};
