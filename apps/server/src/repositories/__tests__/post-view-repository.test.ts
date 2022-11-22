import Post from "@/models/entity/post";
import PostView from "@/models/entity/postView";

import PostViewRepository from "../post-view-repository";

const save = jest.fn((arg) => arg);
const findOne = jest.fn();
const create = jest.fn();
const count = jest.fn();

jest.mock("@/data-source", () => ({
  getRepository: jest.fn(() => ({ save, findOne, count, create }))
}));

describe("post-view-repository.ts", () => {
  const postViewRepository = new PostViewRepository();

  const postIdx = 3;
  const ip = "192.168.0.1";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("countByPostIdx", () => {
    it("return count of view by post idx", async () => {
      count.mockReturnValue(1);

      const result = await postViewRepository.countByPostIdx(postIdx);

      expect(count).toBeCalledWith({ where: { postIdx } });
      expect(result).toBe(1);
    });
  });

  describe("findByIpAndPostIdx", () => {
    it("return result of found by ip and postIdx", async () => {
      findOne.mockReturnValue("success");

      const result = await postViewRepository.findByIpAndPostIdx(ip, postIdx);

      expect(result).toBe("success");
      expect(findOne).toBeCalledWith({ where: { ip, postIdx }, order: { createdAt: "ASC" } });
    });
  });

  describe("save", () => {
    it("save postView", async () => {
      const postView = new PostView();

      await postViewRepository.save(postView);

      expect(save).toBeCalledWith(postView);
    });
  });

  describe("create", () => {
    it("create new entity", async () => {
      const post = new Post();

      await postViewRepository.create(ip, post);

      const postView = new PostView();
      postView.ip = ip;
      postView.postIdx = post.idx;

      expect(create).toBeCalledWith(postView);
    });
  });
});
