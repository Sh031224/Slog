import Post from "../../models/entity/post";
import PostRepository from "../post-repository";

const save = jest.fn();
const findAndCount = jest.fn();
const findOne = jest.fn();
const create = jest.fn();
const _delete = jest.fn();

jest.mock("../../data-source", () => ({
  getRepository: jest.fn(() => ({ save, findAndCount, findOne, create, delete: _delete }))
}));

describe("post-repository.ts", () => {
  const postRepository = new PostRepository();

  const idx = 3;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("count", () => {
    const posts = [new Post()];
    const count = 1;

    it("return posts and count", async () => {
      findAndCount.mockReturnValue([posts, 1]);

      const [list, countOfList] = await postRepository.findAndCount({ where: {} });

      expect(findAndCount).toBeCalledWith({ where: {} });
      expect(list).toBe(posts);
      expect(countOfList).toBe(count);
    });
  });

  describe("findByIdx", () => {
    const post = new Post();
    post.idx = idx;

    it("return post by idx", async () => {
      findOne.mockReturnValue(post);

      const result = await postRepository.findByIdx(idx);

      expect(result).toBe(post);
      expect(findOne).toBeCalledWith({ where: { idx } });
    });
  });

  describe("save", () => {
    it("save post", async () => {
      const post = new Post();

      await postRepository.save(post);

      expect(save).toBeCalledWith(post);
    });
  });

  describe("delete", () => {
    it("delete that post entity", async () => {
      const post = new Post();

      await postRepository.delete(post);

      expect(_delete).toBeCalledWith(post.idx);
    });
  });

  describe("create", () => {
    it("create new post entity", async () => {
      const post = new Post();

      await postRepository.create(post);

      expect(create).toBeCalledWith(post);
    });
  });
});
