import UnauthorizedError from "@/models/error/unauthorized-error";

import ProfileService from "../profile-service";

describe("profile-service.ts", () => {
  const profileService = new ProfileService();

  describe("getProfile", () => {
    it("if req.user is undefined, throw error", async () => {
      await expect(profileService.get({ user: undefined } as any)).rejects.toThrowError(
        new UnauthorizedError("invalid token")
      );
    });

    it("if req.user is not undefined, return user", async () => {
      const user = "this is user";

      const result = await profileService.get({ user } as any);

      expect(result).toBe(user);
    });
  });
});
