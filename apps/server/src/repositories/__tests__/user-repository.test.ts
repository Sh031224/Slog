import User from "@/models/entity/user";
import NotFoundError from "@/models/error/not-found-error";

import UserRepository from "../user-repository";

const save = jest.fn((arg) => arg);
const findOne = jest.fn();

jest.mock("@/data-source", () => ({
  getRepository: jest.fn(() => ({ save, findOne }))
}));

describe("user-repository.ts", () => {
  const userRepository = new UserRepository();

  const ORIGINAL_ENV = process.env;
  const MOCK_ADMIN_FACEBOOK_ID = "123456";

  const facebookId = "id";

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV, ADMIN_FACEBOOK_ID: MOCK_ADMIN_FACEBOOK_ID };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
    jest.clearAllMocks();
  });

  describe("findOrCreate", () => {
    const name = "name";

    it("if find user, return user", async () => {
      const user = new User();
      user.name = name;
      user.facebookId = facebookId;

      findOne.mockReturnValueOnce(user);

      const result = await userRepository.findOrCreate(facebookId, name);

      expect(findOne).toBeCalledWith({ where: { facebookId, name, isDeleted: false } });
      expect(result.facebookId).toBe(facebookId);
      expect(result.name).toBe(name);
      expect(save).not.toBeCalled();
    });

    it("if cannot find user, create user", async () => {
      findOne.mockReturnValueOnce(null);

      const result = await userRepository.findOrCreate(facebookId, name);

      expect(findOne).toBeCalledWith({ where: { facebookId, name, isDeleted: false } });
      expect(result.isAdmin).toBe(undefined);
      expect(result.facebookId).toBe(facebookId);
      expect(result.name).toBe(name);
      expect(save).toBeCalled();
    });

    it("if cannot find user, create user and user is admin", async () => {
      findOne.mockReturnValueOnce(null);

      const result = await userRepository.findOrCreate(MOCK_ADMIN_FACEBOOK_ID, name);

      expect(findOne).toBeCalledWith({
        where: { facebookId: MOCK_ADMIN_FACEBOOK_ID, name, isDeleted: false }
      });
      expect(result.isAdmin).toBe(true);
      expect(result.facebookId).toBe(MOCK_ADMIN_FACEBOOK_ID);
      expect(result.name).toBe(name);
      expect(save).toBeCalled();
    });
  });

  describe("findOneByIdxAndFacebookId", () => {
    const idx = 1;

    it("if find user, return user", async () => {
      const user = new User();

      user.facebookId = facebookId;
      user.idx = idx;

      findOne.mockReturnValueOnce(user);

      const result = await userRepository.findOneByIdxAndFacebookId(idx, facebookId);

      expect(result.idx).toBe(idx);
      expect(result.facebookId).toBe(facebookId);
    });

    it("if cannot find user, throw error", async () => {
      findOne.mockReturnValueOnce(null);

      await expect(userRepository.findOneByIdxAndFacebookId(idx, facebookId)).rejects.toThrowError(
        new NotFoundError("user is not found")
      );
    });
  });

  describe("save", () => {
    it("save in repository", async () => {
      const user = new User();

      await userRepository.save(user);

      expect(save).toBeCalledWith(user);
    });
  });
});
