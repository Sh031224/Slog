import type { Response } from "express";

import FacebookLogin from "@/lib/facebook-login";
import type User from "@/models/entity/user";
import UserRepository from "@/repositories/user-repository";
import TokenService from "@/services/token-service";
import { Token } from "@/types";

export default class AuthService {
  private facebookLogin: FacebookLogin;
  private userRepository: UserRepository;
  private tokenService: TokenService;

  constructor() {
    this.facebookLogin = new FacebookLogin();
    this.userRepository = new UserRepository();
    this.tokenService = new TokenService();
  }

  login = async (res: Response, token: string) => {
    const { id, name } = await this.facebookLogin.getInfo(token);
    const user = await this.userRepository.findOrCreate(id, name);

    await Promise.all([
      this.tokenService.createToken(res, user.idx, user.facebookId, Token.ACCESS),
      this.tokenService.createToken(res, user.idx, user.facebookId, Token.REFRESH)
    ]);

    return user;
  };

  updateFcmToken = (user: User, token: string) => {
    user.fcmToken = token;
    return this.userRepository.save(user);
  };
}
