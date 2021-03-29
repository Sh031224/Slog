import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import Category from "../../assets/api/Category";

@autobind
class CategoryStore {
  @observable categoryList = [];
  @observable totalPost = 0;

  @action
  handleCategoryList = async () => {
    const response = await Category.GetCategoryList();
    this.categoryList = response.data.categories;
    this.totalPost = response.data.total;

    return response;
  };

  @action
  modifyOrderCategory = async (category_idx: number, order_number: number) => {
    const response = await Category.ModifyOrderNumber(category_idx, order_number);

    return response;
  };

  @action
  modifyCategoryName = async (category_idx: number, name: string) => {
    const response = await Category.ModifyCategory(category_idx, name);

    return response;
  };

  @action
  deleteCategory = async (category_idx: number) => {
    const response = await Category.DeleteCategory(category_idx);

    return response;
  };

  @action
  createCategory = async (name: string) => {
    const response = await Category.CreateCategory(name);

    return response;
  };
}

export default CategoryStore;
