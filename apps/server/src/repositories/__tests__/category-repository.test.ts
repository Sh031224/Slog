import Category from "@/models/entity/category";

import CategoryRepository from "../category-repository";

const save = jest.fn((arg) => arg);
const findOne = jest.fn();
const find = jest.fn();
const delete_ = jest.fn();
const count = jest.fn();

jest.mock("@/data-source", () => ({
  getRepository: jest.fn(() => ({ save, findOne, find, count, delete: delete_ }))
}));

describe("category-repository.ts", () => {
  const categoryRepository = new CategoryRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("count", () => {
    const number = 3;

    it("return count of categories", async () => {
      count.mockReturnValue(number);

      const result = await categoryRepository.count();

      expect(count).toBeCalled();
      expect(result).toBe(number);
    });
  });

  describe("find", () => {
    const list = [1];

    it("get all categories", async () => {
      find.mockReturnValue(list);

      const result = await categoryRepository.find();

      expect(result).toBe(list);
      expect(find).toBeCalledWith({ order: { orderNumber: "ASC" } });
    });
  });

  describe("findByIdx", () => {
    const idx = 3;

    it("find category by idx", async () => {
      findOne.mockReturnValue(idx);

      const result = await categoryRepository.findByIdx(idx);

      expect(result).toBe(idx);
      expect(findOne).toBeCalledWith({ where: { idx } });
    });
  });

  describe("save", () => {
    it("save in repository", async () => {
      const category = new Category();

      await categoryRepository.save(category);

      expect(save).toBeCalledWith(category);
    });
  });

  describe("save all", () => {
    it("save all categories in repository", async () => {
      const category = new Category();

      await categoryRepository.saveAll([category]);

      expect(save).toBeCalledWith([category]);
    });
  });

  describe("delete", () => {
    it("delete category", async () => {
      const category = new Category();

      await categoryRepository.delete(category);

      expect(delete_).toBeCalledWith(category);
    });
  });

  describe("create", () => {
    const name = "category";
    const orderNumber = 2;

    it("create category", async () => {
      count.mockReturnValue(orderNumber);

      await categoryRepository.create(name);

      const category = new Category();

      category.name = name;
      category.orderNumber = orderNumber + 1;

      expect(save).toBeCalledWith(category);
    });
  });
});
