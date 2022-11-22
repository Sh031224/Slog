import BadRequestError from "@/models/error/bad-request-error";

import ImageService from "../image-service";

const upload = jest.fn();

jest.mock("@/lib/google-cloud.ts", () => {
  return function () {
    return { upload };
  };
});

describe("image-service.ts", () => {
  const imageService = new ImageService();

  describe("upload", () => {
    it("if req.file is undefined, throw error", async () => {
      await expect(imageService.upload({} as any)).rejects.toThrowError(
        new BadRequestError("image is required")
      );
    });

    it("if req.file is not undefined, upload google cloud", async () => {
      const file = "file";

      await imageService.upload({ file } as any);

      expect(upload).toBeCalledWith(file);
    });
  });
});
