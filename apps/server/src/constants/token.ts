import { Token } from "../types/jwt";

export const cookieName = {
  [Token.ACCESS]: "jwt",
  [Token.REFRESH]: "refresh"
};

export const cookieOptions = {
  [Token.ACCESS]: {
    expires: new Date(new Date().setTime(new Date().getTime() + 1000 * 60 * 60 * 3))
  },
  [Token.REFRESH]: {
    expires: new Date(new Date().setTime(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)),
    httpOnly: true
  }
};

export const expiresIn = {
  [Token.ACCESS]: "3h",
  [Token.REFRESH]: "30d"
};
