import BadRequestError from "@/models/error/bad-request-error";
import NotFoundError from "@/models/error/not-found-error";
import CategoryRepository from "@/repositories/category-repository";

export default class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  create = (name: string) => {
    return this.categoryRepository.create(name);
  };

  get = async () => {
    return this.categoryRepository.find();
  };

  update = async (idx: number, name: string) => {
    const category = await this.categoryRepository.findByIdx(idx);

    if (!category) throw new NotFoundError(`${idx} is not found.`);

    category.name = name;

    return this.categoryRepository.save(category);
  };

  updateOrderNumber = async (idx: number, orderNumber: number) => {
    const count = await this.categoryRepository.count();

    if (count < orderNumber)
      throw new BadRequestError("orderNumber must be less than categories.length");

    const categories = await this.categoryRepository.find();
    const updateCategory = categories.find((v) => v.idx === idx);

    if (!updateCategory) throw new NotFoundError(`${idx} is not found.`);

    // swap
    categories[categories.findIndex((v) => v.orderNumber === orderNumber)].orderNumber =
      updateCategory.orderNumber;
    categories[categories.findIndex((v) => v.idx === idx)].orderNumber = orderNumber;

    return this.categoryRepository.saveAll(categories);
  };

  delete = async (idx: number) => {
    const category = await this.categoryRepository.findByIdx(idx);

    if (!category) throw new NotFoundError(`${idx} is not found.`);

    return this.categoryRepository.delete(category);
  };
}
