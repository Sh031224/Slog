import AuthService from "@auth-service";

import User from "@/models/entity/user";
import { getMockResponse } from "@/test-utils";

const createToken = jest.fn();

jest.mock("@token-service.ts", () => {
  return function () {
    return { createToken };
  };
});

const getInfo = jest.fn();

jest.mock("@/lib/facebook-login.ts", () => {
  return function () {
    return { getInfo };
  };
});

const save = jest.fn();
const findOrCreate = jest.fn();

jest.mock("@/repositories/user-repository.ts", () => {
  return function () {
    return { save, findOrCreate };
  };
});

describe("auth-service.ts", () => {
  const authService = new AuthService();
  const res = getMockResponse() as any;

  const facebookId = "123456";
  const name = "name";
  const token = "ehasdfiqjewlk";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    const idx = 1;

    const user = new User();

    user.idx = idx;
    user.facebookId = facebookId;

    it("login user and create token", async () => {
      getInfo.mockReturnValue({ id: facebookId, name });
      findOrCreate.mockReturnValue(user);

      await authService.login(res, token);

      expect(getInfo).toBeCalledWith(token);
      expect(findOrCreate).toBeCalledWith(facebookId, name);
      expect(createToken).toBeCalledTimes(2);
    });
  });

  describe("updateFcmToken", () => {
    it("save fcmToken in repository", async () => {
      const user = new User();

      await authService.updateFcmToken(user, token);

      expect(user).toHaveProperty("fcmToken", token);
      expect(save).toBeCalledWith(user);
    });
  });
});
