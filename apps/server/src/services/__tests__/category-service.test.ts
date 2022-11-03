import Category from "../../models/entity/category";
import BadRequestError from "../../models/error/bad-request-error";
import NotFoundError from "../../models/error/not-found-error";
import CategoryService from "../category-service";

const save = jest.fn();
const count = jest.fn();
const findByIdx = jest.fn();
const findByName = jest.fn();
const findAll = jest.fn();
const saveAll = jest.fn();
const delete_ = jest.fn();
const create = jest.fn();

jest.mock("../../repositories/category-repository.ts", () => {
  return function () {
    return { save, count, findByIdx, findAll, findByName, saveAll, delete: delete_, create };
  };
});

const getMockCategories = (orderNumber: number[]) => {
  return orderNumber.map((v, i) => {
    const category = new Category();

    category.idx = i;
    category.orderNumber = v;

    return category;
  });
};

describe("category-service.ts", () => {
  const categoryService = new CategoryService();

  const idx = 1;
  const name = "name";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("create category", async () => {
      await categoryService.create(name);

      expect(create).toBeCalledWith(name);
    });
  });

  describe("getAll", () => {
    it("get all categories", async () => {
      await categoryService.get();

      expect(findAll).toBeCalled();
    });
  });

  describe("update", () => {
    it("category update name success", async () => {
      const category = new Category();
      category.name = "test";
      category.idx = idx;

      findByIdx.mockReturnValue(category);

      await categoryService.update(idx, name);

      category.name = name;

      expect(findByIdx).toBeCalledWith(idx);
      expect(save).toBeCalledWith(category);
    });

    it("category update name failure, category is not found", async () => {
      findByIdx.mockReturnValue(null);

      await expect(categoryService.update(idx, name)).rejects.toThrowError(
        new NotFoundError(`${idx} is not found.`)
      );

      expect(findByIdx).toBeCalledWith(idx);
      expect(save).not.toBeCalled();
    });
  });

  describe("updateOrderNumber", () => {
    it("category update order number success plus", async () => {
      const prevCategories = getMockCategories([3, 2, 4, 1]);

      count.mockReturnValue(4);
      findAll.mockReturnValue(prevCategories);

      await categoryService.updateOrderNumber(idx, 4);

      expect(count).toBeCalled();
      expect(saveAll).toBeCalledWith(getMockCategories([3, 4, 2, 1]));
    });

    it("category update order number success minus", async () => {
      const prevCategories = getMockCategories([3, 2, 4, 1]);

      count.mockReturnValue(4);
      findAll.mockReturnValue(prevCategories);

      await categoryService.updateOrderNumber(idx, 3);

      expect(count).toBeCalled();
      expect(saveAll).toBeCalledWith(getMockCategories([2, 3, 4, 1]));
    });

    it("category update order failure, orderNumber must be less length", async () => {
      count.mockReturnValue(4);

      await expect(categoryService.updateOrderNumber(idx, 5)).rejects.toThrowError(
        new BadRequestError("orderNumber must be less than categories.length")
      );

      expect(count).toBeCalled();
      expect(saveAll).not.toBeCalled();
    });

    it("category update order failure, category is not found", async () => {
      const prevCategories = getMockCategories([3]);

      count.mockReturnValue(4);
      findAll.mockReturnValue(prevCategories);

      await expect(categoryService.updateOrderNumber(idx, 3)).rejects.toThrowError(
        new NotFoundError(`${idx} is not found.`)
      );

      expect(count).toBeCalled();
      expect(saveAll).not.toBeCalled();
    });
  });

  describe("delete", () => {
    it("delete category success", async () => {
      const category = new Category();
      category.name = name;
      category.idx = idx;

      findByIdx.mockReturnValue(category);

      await categoryService.delete(idx);

      expect(findByIdx).toBeCalledWith(idx);
      expect(delete_).toBeCalledWith(category);
    });

    it("delete category failure, category is not found", async () => {
      findByIdx.mockReturnValue(null);

      await expect(categoryService.delete(idx)).rejects.toThrowError(
        new NotFoundError(`${idx} is not found.`)
      );

      expect(findByIdx).toBeCalledWith(idx);
      expect(delete_).not.toBeCalled();
    });
  });
});
